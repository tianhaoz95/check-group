import { checkRunEventHandler, pullRequestEventHandler } from "./handlers";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */
import prettyjson from "prettyjson";

export = (app: Application): void => {
  app.on("pull_request", async (context) => {
    try {
      await pullRequestEventHandler(context);
    } catch (err) {
      context.log.error(prettyjson.render(err));
    }
  });

  app.on("check_run", async (context) => {
    try {
      await checkRunEventHandler(context);
    } catch (err) {
      context.log.error(prettyjson.render(err));
    }
  });
};
