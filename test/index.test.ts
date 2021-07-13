import {
  BASIC_CHECK_RUN_CREATED_EVENT_MULTIPLE_PULL_REQUEST,
  BASIC_CHECK_RUN_CREATED_EVENT_SINGLE_PULL_REQUEST,
} from "./helpers/events/check_run/created";
import {
  BASIC_PULL_REQUEST_FILES,
  DEFAULT_PULL_REQUEST_NUMBER,
  DEFAULT_SECONDARY_PULL_REQUEST_NUMBER,
  DEFAULT_SECONDARY_SHA,
  DEFAULT_SHA,
} from "./helpers/consts";
import {
  expectStartingCheck,
  expectSuccessCheck,
  expectSuccessCheckWithCustomServiceName,
  setChecksForSha,
  setConfigToBasic,
  setConfigToNotFound,
  setPullRequestFiles,
} from "./helpers/mocked_apis";
import { BASIC_PULL_REQUEST_OPENED_EVENT } from "./helpers/events/pull_request/opened";
import { DefaultCheckId } from "../src/config";
import { getProbotApp } from "./helpers/init";
import nock from "nock";

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
    probot = getProbotApp();
  });

  test("pull request sanity check", async () => {
    setConfigToNotFound();
    setPullRequestFiles(BASIC_PULL_REQUEST_FILES, DEFAULT_PULL_REQUEST_NUMBER);
    setChecksForSha(
      [
        {
          conclusion: undefined,
          name: "check_0",
          status: "queued",
        },
      ],
      DEFAULT_SHA,
    );
    expectStartingCheck(DEFAULT_SHA);
    expectSuccessCheck(DEFAULT_SHA);
    await probot.receive({
      name: "pull_request",
      payload: BASIC_PULL_REQUEST_OPENED_EVENT,
    });
  });

  test("check run sanity check", async () => {
    setConfigToNotFound();
    setPullRequestFiles(BASIC_PULL_REQUEST_FILES, DEFAULT_PULL_REQUEST_NUMBER);
    setPullRequestFiles(
      BASIC_PULL_REQUEST_FILES,
      DEFAULT_SECONDARY_PULL_REQUEST_NUMBER,
    );
    setChecksForSha(
      [
        {
          conclusion: undefined,
          name: "check_0",
          status: "queued",
        },
      ],
      DEFAULT_SHA,
    );
    setChecksForSha(
      [
        {
          conclusion: undefined,
          name: "check_0",
          status: "queued",
        },
      ],
      DEFAULT_SECONDARY_SHA,
    );
    expectStartingCheck(DEFAULT_SHA);
    expectSuccessCheck(DEFAULT_SHA);
    expectStartingCheck(DEFAULT_SECONDARY_SHA);
    expectSuccessCheck(DEFAULT_SECONDARY_SHA);
    await probot.receive({
      name: "check_run",
      payload: BASIC_CHECK_RUN_CREATED_EVENT_MULTIPLE_PULL_REQUEST,
    });
  });

  test("check run pass correctly", async () => {
    setConfigToBasic("basic");
    setPullRequestFiles(BASIC_PULL_REQUEST_FILES, DEFAULT_PULL_REQUEST_NUMBER);
    setChecksForSha(
      [
        {
          conclusion: "success",
          name: "project_0_check",
          status: "completed",
        },
        {
          conclusion: "success",
          name: "common_check",
          status: "completed",
        },
        {
          conclusion: undefined,
          name: DefaultCheckId,
          status: "queued",
        },
      ],
      DEFAULT_SHA,
    );
    expectSuccessCheck(DEFAULT_SHA);
    await probot.receive({
      name: "check_run",
      payload: BASIC_CHECK_RUN_CREATED_EVENT_SINGLE_PULL_REQUEST,
    });
  });

  test("check run pass correctly", async () => {
    setConfigToBasic("custom_service_name");
    setPullRequestFiles(BASIC_PULL_REQUEST_FILES, DEFAULT_PULL_REQUEST_NUMBER);
    setChecksForSha(
      [
        {
          conclusion: "success",
          name: "project_0_check",
          status: "completed",
        },
        {
          conclusion: "success",
          name: "common_check",
          status: "completed",
        },
        {
          conclusion: undefined,
          name: DefaultCheckId,
          status: "queued",
        },
      ],
      DEFAULT_SHA,
    );
    const expectedServiceName = "awesome_name";
    expectSuccessCheckWithCustomServiceName(expectedServiceName);
    await probot.receive({
      name: "check_run",
      payload: BASIC_CHECK_RUN_CREATED_EVENT_SINGLE_PULL_REQUEST,
    });
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
