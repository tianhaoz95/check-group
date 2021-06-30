/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Parses the pull request number from the context.
 *
 * @param context The pull request version of Probot context
 * @returns The pull request number of the pull request that
 * triggered the event.
 */
export const parsePullRequestNumberFromPullRequestContext = (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  context: Context<"pull_request">,
  /* eslint-enable @typescript-eslint/no-explicit-any */
): number => {
  if ("number" in context.payload) {
    return context.payload["number"] as number;
  } else {
    throw Error("Cannot find number in payload.");
  }
};

/* istanbul ignore next */
/**
 * Parses the numbers for all pull requests that are associated
 * with a check run.
 *
 * Since the function is currently not used in favor of the one
 * that extracts the pull number together with the sha, it is
 * ignored for coverage calculation for now.
 *
 * @param context The check run version of Probot context
 * @returns The pull request numbers that are associated with
 * the check run that triggered this event.
 */
export const parsePullRequestNumbersFromCheckRunContext = (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  context: Context<any>,
  /* eslint-enable @typescript-eslint/no-explicit-any */
): number[] => {
  if ("check_run" in context.payload) {
    const checkRun: Record<string, unknown> = context.payload["check_run"];
    if ("pull_requests" in checkRun) {
      const pullRequests: Record<string, unknown>[] = checkRun[
        "pull_requests"
      ] as Record<string, unknown>[];
      const pullRequestNumbers: number[] = [];
      pullRequests.forEach((pullRequest) => {
        if ("number" in pullRequest) {
          pullRequestNumbers.push(pullRequest["number"] as number);
        } else {
          throw Error("number not found in pull request");
        }
      });
      return pullRequestNumbers;
    } else {
      throw Error("pull_requests not found in check_run.");
    }
  } else {
    throw Error("check_run not found in payload.");
  }
};
