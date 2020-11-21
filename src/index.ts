import { checkRunEventHandler, pullRequestEventHandler } from "./handlers";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */
import prettyjson from "prettyjson";

export = (
  /* eslint-disable */
  opt: any,
  /* eslint-enable */
): void => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  opt.app.on("pull_request", async (context: Context<any>) => {
    try {
      await pullRequestEventHandler(context);
    } catch (err) {
      context.log.error(prettyjson.render(err));
    }
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */

  /* eslint-disable @typescript-eslint/no-explicit-any */
  opt.app.on("check_run", async (context: Context<any>) => {
    try {
      await checkRunEventHandler(context);
    } catch (err) {
      context.log.error(prettyjson.render(err));
    }
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */
};
