import {
  BASIC_PULL_REQUEST_FILES,
  DEFAULT_PULL_REQUEST_NUMBER,
  DEFAULT_SHA,
} from "./helpers/consts";
import { Probot, ProbotOctokit } from "probot";
import {
  expectStartingCheck,
  expectSuccessCheck,
  setChecksForSha,
  setConfigToNotFound,
  setPullRequestFiles,
} from "./helpers/mocked_apis";
import { BASIC_PULL_REQUEST_OPENED_EVENT } from "./helpers/events/pull_request/opened";
import fs from "fs";
import myProbotApp from "../src";
import nock from "nock";
import path from "path";

/* eslint-disable security/detect-non-literal-fs-filename */
const privateKey = fs.readFileSync(
  path.join(__dirname, "./mock-cert.pem"),
  "utf-8",
);
/* eslint-enable security/detect-non-literal-fs-filename */

describe("integration tests", () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /**
   * The Probot infra. It is of any type here because constructing
   * an uninitialized Probot object can cause crash in some versions.
   */
  let probot: any;
  /* eslint-disable @typescript-eslint/no-explicit-any */

  beforeEach(() => {
    nock.disableNetConnect();
    probot = new Probot({
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
      githubToken: "test_github_token",
      id: 123,
      privateKey,
    });
    probot.load(myProbotApp);
  });

  test("empty subproject should succeed", async () => {
    setConfigToNotFound();
    setPullRequestFiles(BASIC_PULL_REQUEST_FILES, DEFAULT_PULL_REQUEST_NUMBER);
    setChecksForSha(["check_0"], DEFAULT_SHA);
    expectStartingCheck();
    expectSuccessCheck();
    await probot.receive({
      name: "pull_request",
      payload: BASIC_PULL_REQUEST_OPENED_EVENT,
    });
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
