// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createNodeMiddleware, createProbot } = require("probot");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const app = require("../../../lib/index");
const probot = createProbot();

const middleware = createNodeMiddleware(app, { probot, webhooksPath: "/api/github/webhooks" });

module.exports = (request, response) => {
  if (request.method !== "POST") {
    response.redirect("/");
  }

  middleware(request, response);
};
