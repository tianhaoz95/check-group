/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */

export = (app: Application): void => {
  app.on("pull_request.opened", async (context) => {
    context.log.info("Event received");
  });
};
