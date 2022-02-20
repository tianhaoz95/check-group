/**
 * The entrypoint for the Probot app.
 * @module
 */
import * as Sentry from "@sentry/node";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, Probot } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { checkRunEventHandler, pullRequestEventHandler } from "./handlers";
import dotenv from "dotenv";
import prettyjson from "prettyjson";

// TODO(@tianhaoz95): consolidate this into a location called
// third_party to indicate that we are not in control of whether
// this works or not.
// For setup details, see:
// https://docs.sentry.io/platforms/node
dotenv.config();
Sentry.init({
  dsn: process.env["SENTRY_DSN"],
  tracesSampleRate: 1.0,
});

/**
 * Top level Probot app.
 */
const checkGroupApp = (app: Probot): void => {
  app.on("pull_request", async (context: Context<"pull_request">) => {
    try {
      await pullRequestEventHandler(context);
    } catch (err) {
      context.log.error(prettyjson.render(err));
      Sentry.captureException(err);
    }
  });

  app.on("check_run", async (context: Context<"check_run">) => {
    try {
      await checkRunEventHandler(context);
    } catch (err) {
      context.log.error(prettyjson.render(err));
      Sentry.captureException(err);
    }
  });
};

export default checkGroupApp;
