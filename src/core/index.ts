import {
  extractShaFromCheckRunContext,
  extractShaFromPullRequestContext,
} from "./sha_getter";
import {
  generateProgressDetails,
  generateProgressSummary,
  generateProgressTitle,
} from "../utils/generate_progress";
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
import { extractPullRequestsFromCheckRunContext } from "./pull_getter";
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
    try {
      const filenames = await this.files();
      this.context.log.info(`Files are: ${JSON.stringify(filenames)}`);
      const subprojs = matchFilenamesToSubprojects(
        filenames,
        this.config.subProjects,
      );
      /**
       * This is for debugging purposes only
       */
      const expectedChecks = collectExpectedChecks(subprojs);
      this.context.log.info(
        `Expected checks are: ${JSON.stringify(expectedChecks)}`,
      );
      /**
       * Debugging only code ends
       */
      const postedChecks = await this.getPostedChecks(this.sha);
      this.context.log.info(
        `Posted checks are: ${JSON.stringify(postedChecks)}`,
      );
      const conclusion = satisfyExpectedChecks(subprojs, postedChecks);
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
        await this.postUpdatingCheck(
          generateProgressTitle(),
          generateProgressSummary(),
          generateProgressDetails(subprojs, postedChecks),
        );
      }
    } catch {
      this.context.log.info("The app crashed.");
      await this.postFailingCheck();
    }
  }

  /**
   * Fetches a list of already finished
   * checks.
   *
   * @param sha The sha of the commit to check
   */
  async getPostedChecks(sha: string): Promise<Record<string, string>> {
    this.context.log.info(`Fetch posted check runs for ${sha}`);
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
      this.sha,
    );
    /* eslint-enable */
  }

  async postUpdatingCheck(
    title: string,
    summary: string,
    details: string,
  ): Promise<void> {
    /* eslint-disable */
    await createStatus(
      this.context,
      undefined,
      "in_progress",
      title,
      summary,
      details,
      this.startTime,
      this.sha,
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
      this.sha,
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
      this.sha,
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
  extractPullRequestsFromCheckRunContext,
};
