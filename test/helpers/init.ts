import { Probot, ProbotOctokit } from "probot";
import CheckGroupApp from "../../src";
import fs from "fs";
import path from "path";

export const loadMockedCertificate = (): string => {
  /* eslint-disable security/detect-non-literal-fs-filename */
  const privateKey = fs.readFileSync(
    path.join(__dirname, "../files/cert/mock-cert.pem"),
    "utf-8",
  );
  /* eslint-enable security/detect-non-literal-fs-filename */
  return privateKey;
};

export const getProbotApp = (): Probot => {
  const probot = new Probot({
    Octokit: ProbotOctokit.defaults({
      retry: { enabled: false },
      throttle: { enabled: false },
    }),
    githubToken: "test_github_token",
    id: 123,
    privateKey: loadMockedCertificate(),
  });
  probot.load(CheckGroupApp);
  return probot;
};
