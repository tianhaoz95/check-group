// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createNodeMiddleware, createProbot } = require("probot");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const app = require("../../lib/index");
const probot = createProbot();

module.exports = createNodeMiddleware(app, { probot, webhooksPath: "/api/github/webhooks" });
