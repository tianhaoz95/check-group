/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CheckGroupConfig, SubProjConfig } from "./types";
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */
import minimatch from "minimatch";

export class CheckGroup {
  pullRequestNumber: number;
  config: CheckGroupConfig;
  context: Context;
  sha: string;

  constructor(
    pullRequestNumber: number,
    config: CheckGroupConfig,
    context: Context,
    sha: string,
  ) {
    this.pullRequestNumber = pullRequestNumber;
    this.config = config;
    this.context = context;
    this.sha = sha;
  }

  async process(): Promise<void> {
    const filenames = await this.files();
    const subprojs = this.subprojects(filenames);
    const expected = this.checks(subprojs);
    const finished = await this.finished(this.sha);
    if (this.satisfy(expected, finished)) {
      await this.pass();
    } else {
      await this.fail();
    }
  }

  /**
   * Checks if all the sub-project
   * requirements are satisfied.
   */
  satisfy(expected: string[], finished: Record<string, string>): boolean {
    let result = true;
    expected.forEach((checkName) => {
      /* eslint-disable security/detect-object-injection */
      if (!finished[checkName]) {
        result = false;
      }
      /* eslint-enable security/detect-object-injection */
    });
    return result;
  }

  /**
   * Returns a list of sub-projects
   * inferred from the files in pull
   * requests.
   *
   * @param filenames The list of files
   *  listed in pull requests.
   */
  subprojects(filenames: string[]): SubProjConfig[] {
    const subprojs: SubProjConfig[] = [];
    filenames.forEach((filename) => {
      this.config.subProjects.forEach((subproj) => {
        subproj.paths.forEach((path) => {
          if (minimatch(filename, path)) {
            subprojs.push(subproj);
          }
        });
      });
    });
    return subprojs;
  }

  /**
   * Returns a list of expected passing
   * checks given a list of sub-project
   * configs.
   *
   * @param configs A list of sub-project
   *  configurations.
   */
  checks(configs: SubProjConfig[]): string[] {
    const requiredChecks: string[] = [];
    configs.forEach((config) => {
      requiredChecks.concat(config.checks);
    });
    return requiredChecks;
  }

  /**
   * Fetches a list of already finished
   * checks.
   *
   * @param sha The sha of the commit to check
   */
  async finished(sha: string): Promise<Record<string, string>> {
    const response = await this.context.github.checks.listForRef(
      this.context.repo({
        ref: sha,
      }),
    );
    const checkNames: Record<string, string> = {};
    response.data.check_runs.forEach((checkRun) => {
      checkNames[checkRun.name] = checkRun.conclusion;
    });
    return checkNames;
  }

  /**
   * Gets a list of files that are modified in
   * a pull request.
   */
  async files(): Promise<string[]> {
    const response = await this.context.github.pulls.listFiles(
      this.context.repo({
        "pull_number": this.pullRequestNumber,
      }),
    );
    const filenames: string[] = [];
    response.data.forEach((pullRequestFile) => {
      filenames.push(pullRequestFile.filename);
    });
    return filenames;
  }

  async pass(): Promise<void> {
    // TODO: post a passing status
  }

  async fail(): Promise<void> {
    // TODO: post a failing status
  }
}
