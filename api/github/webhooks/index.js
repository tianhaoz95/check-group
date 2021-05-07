// This is used for Vercel deployment

import { createNodeMiddleware, createProbot } from "probot";

import app from "../../../lib/index";

const probot = createProbot({
  defaults: {
    webhookPath: "/api/github/webhooks",
  },
});

export default createNodeMiddleware(app, { probot });
