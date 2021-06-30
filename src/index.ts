/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, Probot } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { checkRunEventHandler, pullRequestEventHandler } from "./handlers";
import prettyjson from "prettyjson";

export = (app: Probot): void => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  app.on("pull_request", async (context: Context<"pull_request">) => {
    try {
      await pullRequestEventHandler(context);
    } catch (err) {
      context.log.error(prettyjson.render(err));
    }
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */

  /* eslint-disable @typescript-eslint/no-explicit-any */
  app.on("check_run", async (context: Context<"check_run">) => {
    try {
      await checkRunEventHandler(context);
    } catch (err) {
      context.log.error(prettyjson.render(err));
    }
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */
};
