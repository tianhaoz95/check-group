import { createNodeMiddleware, createProbot } from "probot";
import app from "../../lib";

module.exports = createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: "/api/github/webhooks",
});
