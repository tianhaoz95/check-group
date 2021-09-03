import { createNodeMiddleware, createProbot } from "probot";
import app from "../../lib/index";

module.exports = createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: "/api/github/webhooks",
});
