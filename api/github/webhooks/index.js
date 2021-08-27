// api/github/webhooks/index.js
// For more details on the suggested way to deploy to Vercel:
//  https://probot.github.io/docs/deployment/#vercel
const { createNodeMiddleware, createProbot } = require("probot");

const app = require("../../lib/index");
const probot = createProbot({
  defaults: {
    webhookPath: "/api/github/webhooks",
  },
});

module.exports = createNodeMiddleware(app, { probot });
