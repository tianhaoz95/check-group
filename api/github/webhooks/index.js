// For more details on the suggested way to deploy to Vercel:
//  https://probot.github.io/docs/deployment/#vercel
import { createNodeMiddleware, createProbot } from "probot";
import app from "../../../lib";

module.exports = createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: "/api/github/webhooks",
});
