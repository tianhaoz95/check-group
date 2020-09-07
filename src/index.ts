import {
  CheckGroup,
  extractShaFromCheckRunContext,
  extractShaFromPullRequestContext,
  fetchConfig,
  parsePullRequestNumberFromPullRequestContext,
  parsePullRequestNumbersFromCheckRunContext,
} from "./core";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */

export = (app: Application): void => {
  app.on("pull_request", async (context) => {
    context.log.info("Pull request open/reopen event detected");
    const startTime = new Date().toISOString();
    const sha = extractShaFromPullRequestContext(context);
    const config = await fetchConfig(context);
    const pullRequestNumber = parsePullRequestNumberFromPullRequestContext(
      context,
    );
    const core = new CheckGroup(
      pullRequestNumber,
      config,
      context,
      sha,
      startTime,
    );
    await core.run();
  });

  app.on("check_run", async (context) => {
    context.log.info("Check completion event detected.");
    const sha = extractShaFromCheckRunContext(context);
    const pullRequestNumbers: number[] = parsePullRequestNumbersFromCheckRunContext(
      context,
    );
    const config = await fetchConfig(context);
    const startTime = new Date().toISOString();
    for (const pullRequestNumber of pullRequestNumbers) {
      context.log.info(`Check pull request #${pullRequestNumber}.`);
      const core = new CheckGroup(
        pullRequestNumber,
        config,
        context,
        sha,
        startTime,
      );
      await core.run();
    }
  });
};
