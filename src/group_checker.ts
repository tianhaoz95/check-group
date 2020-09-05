/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CheckGroupConfig, SubProjConfig } from "./types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { ProbotOctokit } from "probot";
import minimatch from "minimatch";

export class GroupChecker {
  pullRequestNumber: number;
  config: CheckGroupConfig;
  filenames: string[];
  github: typeof ProbotOctokit;

  constructor(
    pullRequestNumber: number,
    config: CheckGroupConfig,
    github: typeof ProbotOctokit,
  ) {
    this.pullRequestNumber = pullRequestNumber;
    this.config = config;
    this.filenames = [];
    this.github = github;
  }

  async process(): Promise<void> {
    // TODO: process event
    await this.files();
  }

  /**
   * Checks if all the sub-project
   * requirements are satisfied.
   */
  satisfy(): boolean {
    const result = true;
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
  async finished(sha: string): Promise<string[]> {
    return [];
  }

  async files(): Promise<void> {
    // TODO: fetch a list of files from pull request
  }

  async pass(): Promise<void> {
    // TODO: post a passing status
  }

  async fail(): Promise<void> {
    // TODO: post a failing status
  }
}
