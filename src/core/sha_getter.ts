/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventPayloads, WebhookEvent } from "@octokit/webhooks";
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Exrtacts the head sha from the pull request event payload.
 *
 * @param context The pull request version of Probot context.
 * @returns The string sha that correspond to the head commit
 * of the pull request.
 */
export const extractShaFromPullRequestContext = (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  context: WebhookEvent<EventPayloads.WebhookPayloadPullRequest> & Context<any>,
  /* eslint-enable @typescript-eslint/no-explicit-any */
): string => {
  const payload = context.payload;
  if ("pull_request" in payload) {
    const pullRequest = payload["pull_request"];
    if ("head" in pullRequest) {
      const head = pullRequest["head"];
      if ("sha" in head) {
        return head["sha"];
      } else {
        throw Error("sha not found in the head attibute");
      }
    } else {
      throw Error("head field not found in the pull requets object");
    }
  } else {
    throw Error("pull_request not found in context payload");
  }
};

/**
 * Parses the SHA the check run is associated with from the
 * context. For more details, please see:
 * https://developer.github.com/webhooks/event-payloads/#check_run
 *
 * @param context The check run version of Probot context.
 * @returns The SHA that the check run is associated with.
 */
export const extractShaFromCheckRunContext = (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  context: WebhookEvent<EventPayloads.WebhookPayloadCheckRun> & Context<any>,
  /* eslint-enable @typescript-eslint/no-explicit-any */
): string => {
  if ("check_run" in context.payload) {
    const checkRun: Record<string, unknown> = context.payload["check_run"];
    if ("head_sha" in checkRun) {
      return checkRun["head_sha"] as string;
    } else {
      throw Error("head_sha not found in check_run.");
    }
  } else {
    throw Error("check_run not found in payload.");
  }
};
