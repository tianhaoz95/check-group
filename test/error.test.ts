import { removeCheckRun, removePull } from "./helpers/events/modifiers";
import { BASIC_PULL_REQUEST_OPENED_EVENT } from "./helpers/events/pull_request/opened";
import { getProbotApp } from "./helpers/init";
import nock from "nock";

describe("error handling tests", () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /**
   * The Probot infra. It is of any type here because constructing
   * an uninitialized Probot object can cause crash in some versions.
   */
  let probot: any;
  /* eslint-disable @typescript-eslint/no-explicit-any */

  beforeEach(() => {
    nock.disableNetConnect();
    probot = getProbotApp();
  });

  test("missing pull request field", async () => {
    expect(async () => {
      await probot.receive({
        name: "pull_request",
        payload: removePull(BASIC_PULL_REQUEST_OPENED_EVENT),
      });
    }).not.toThrow();
  });

  test("missing check run field", async () => {
    expect(async () => {
      await probot.receive({
        name: "pull_request",
        payload: removeCheckRun(BASIC_PULL_REQUEST_OPENED_EVENT),
      });
    }).not.toThrow();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
