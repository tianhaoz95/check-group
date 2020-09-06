import { Probot, ProbotOctokit } from "probot";
import fs from "fs";
import myProbotApp from "../src";
import nock from "nock";
import path from "path";
import payload from "./fixtures/pull_request.opened.json";

/* eslint-disable security/detect-non-literal-fs-filename */
const privateKey = fs.readFileSync(
  path.join(__dirname, "fixtures/mock-cert.pem"),
  "utf-8",
);
/* eslint-enable security/detect-non-literal-fs-filename */

describe("My Probot app", () => {
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
      // disable request throttling and retries for testing
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),

      id: 123,

      privateKey,
    });
    probot.load(myProbotApp);
  });

  test("creates a comment when an issue is opened", async () => {
    await probot.receive({ name: "pull_request", payload });
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
