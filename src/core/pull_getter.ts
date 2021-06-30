/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PullRequestData } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 *
 * @param context The check run version of the Probot context
 * @returns A list of pull request data.
 */
export const extractPullRequestsFromCheckRunContext = (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  context: Context<"check_run">,
  /* eslint-enable @typescript-eslint/no-explicit-any */
): PullRequestData[] => {
  if ("check_run" in context.payload) {
    const checkRun: Record<string, unknown> = context.payload["check_run"];
    if ("pull_requests" in checkRun) {
      const pullRequests: Record<string, unknown>[] = checkRun[
        "pull_requests"
      ] as Record<string, unknown>[];
      const pullRequestsData: PullRequestData[] = [];
      pullRequests.forEach((pullRequest) => {
        if ("number" in pullRequest && "head" in pullRequest) {
          const head: Record<string, unknown> = pullRequest["head"] as Record<
            string,
            unknown
          >;
          if ("sha" in head) {
            pullRequestsData.push({
              number: pullRequest["number"] as number,
              sha: head["sha"] as string,
            });
          } else {
            throw Error("sha not found in pull request head field.");
          }
        } else {
          throw Error("number or head not found in pull request");
        }
      });
      return pullRequestsData;
    } else {
      throw Error("pull_requests not found in check_run.");
    }
  } else {
    throw Error("check_run not found in payload.");
  }
};
