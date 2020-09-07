import {
  extractShaFromCheckRunContext,
  extractShaFromPullRequestContext,
} from "./sha_getter";
import {
  parsePullRequestNumberFromPullRequestContext,
  parsePullRequestNumbersFromCheckRunContext,
} from "./pull_number_getter";
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CheckGroupConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { CheckId } from "../config";
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Context } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { collectExpectedChecks } from "../utils/collect_expected_checks";
import { createStatus } from "./create_status";
import { fetchConfig } from "./config_getter";
import { matchFilenamesToSubprojects } from "../utils/subproj_matching";
import { satisfyExpectedChecks } from "../utils/satisfy_expected_checks";

/**
 * The orchestration class.
 */
export class CheckGroup {
  pullRequestNumber: number;
  config: CheckGroupConfig;
  context: Context;
  sha: string;
  startTime: string;

  constructor(
    pullRequestNumber: number,
    config: CheckGroupConfig,
    context: Context,
    sha: string,
    startTime: string,
  ) {
    this.pullRequestNumber = pullRequestNumber;
    this.config = config;
    this.context = context;
    this.sha = sha;
    this.startTime = startTime;
  }

  async run(): Promise<void> {
    const filenames = await this.files();
    this.context.log.info(`Files are: ${JSON.stringify(filenames)}`);
    const subprojs = matchFilenamesToSubprojects(
      filenames,
      this.config.subProjects,
    );
    const expectedChecks = collectExpectedChecks(subprojs);
    this.context.log.info(
      `Expected checks are: ${JSON.stringify(expectedChecks)}`,
    );
    const postedChecks = await this.getPostedChecks(this.sha);
    this.context.log.info(`Posted checks are: ${JSON.stringify(postedChecks)}`);
    const conclusion = satisfyExpectedChecks(expectedChecks, postedChecks);
    if (!(CheckId in postedChecks)) {
      this.context.log.info("First time run. Post starting check.");
      await this.postStartingCheck();
    }
    if (conclusion === "all_passing") {
      this.context.log.info("All expected checks passed.");
      await this.postPassingCheck();
    } else if (conclusion === "has_failure") {
      this.context.log.info("Some of the expected checks failed.");
      await this.postFailingCheck();
    } else {
      this.context.log.info("Expected checks are still pending.");
      await this.postUpdatingCheck();
    }
  }

  /**
   * Fetches a list of already finished
   * checks.
   *
   * @param sha The sha of the commit to check
   */
  async getPostedChecks(sha: string): Promise<Record<string, string>> {
    const response = await this.context.github.checks.listForRef(
      this.context.repo({
        ref: sha,
      }),
    );
    const checkNames: Record<string, string> = {};
    response.data.check_runs.forEach((checkRun) => {
      const conclusion = checkRun.conclusion ? checkRun.conclusion : "pending";
      checkNames[checkRun.name] = conclusion;
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

  /**
   * Post a starting check
   */
  async postStartingCheck(): Promise<void> {
    /* eslint-disable */
    await createStatus(
      this.context,
      undefined,
      "queued",
      "test",
      "test",
      "test",
      this.startTime,
    );
    /* eslint-enable */
  }

  async postUpdatingCheck(): Promise<void> {
    /* eslint-disable */
    await createStatus(
      this.context,
      undefined,
      "in_progress",
      "test",
      "test",
      "test",
      this.startTime,
    );
    /* eslint-enable */
  }

  async postPassingCheck(): Promise<void> {
    /* eslint-disable */
    await createStatus(
      this.context,
      "success",
      "completed",
      "test",
      "test",
      "test",
      this.startTime,
    );
    /* eslint-enable */
  }

  async postFailingCheck(): Promise<void> {
    /* eslint-disable */
    await createStatus(
      this.context,
      "failure",
      "completed",
      "test",
      "test",
      "test",
      this.startTime,
    );
    /* eslint-enable */
  }
}

export {
  fetchConfig,
  extractShaFromPullRequestContext,
  parsePullRequestNumberFromPullRequestContext,
  parsePullRequestNumbersFromCheckRunContext,
  extractShaFromCheckRunContext,
};
