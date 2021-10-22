import {
  CheckGroup,
  extractPullRequestsFromCheckRunContext,
  extractShaFromPullRequestContext,
  fetchConfig,
  parsePullRequestNumberFromPullRequestContext,
} from "./core";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PullRequestData } from "./types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { isTriggeredBySelf } from "./core/trigger_filter";

export const pullRequestEventHandler = async (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  context: Context<"pull_request">,
  /* eslint-enable @typescript-eslint/no-explicit-any */
): Promise<void> => {
  context.log.info("Pull request open/reopen event detected");
  const startTime = new Date().toISOString();
  const sha = extractShaFromPullRequestContext(context);
  const config = await fetchConfig(context);
  const pullRequestNumber =
    parsePullRequestNumberFromPullRequestContext(context);
  const core = new CheckGroup(
    pullRequestNumber,
    config,
    context,
    sha,
    startTime,
  );
  await core.run();
};

export const checkRunEventHandler = async (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  context: Context<"check_run">,
  /* eslint-enable @typescript-eslint/no-explicit-any */
): Promise<void> => {
  const config = await fetchConfig(context);
  context.log.info(
    `Check run event detected with ID ${config.customServiceName}`,
  );
  if (isTriggeredBySelf(context, config)) {
    return;
  }
  const pullRequests: PullRequestData[] =
    extractPullRequestsFromCheckRunContext(context);
  const startTime = new Date().toISOString();
  for (const pullRequest of pullRequests) {
    context.log.info(
      `Check pull request #${pullRequest.number} and sha ${pullRequest.sha}.`,
    );
    const core = new CheckGroup(
      pullRequest.number,
      config,
      context,
      pullRequest.sha,
      startTime,
    );
    await core.run();
  }
};
