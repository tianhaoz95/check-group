import {
  DEFAULT_PULL_REQUEST_NUMBER,
  DEFAULT_SECONDARY_PULL_REQUEST_NUMBER,
  DEFAULT_SECONDARY_SHA,
  DEFAULT_SHA,
} from "../../consts";

const SINGLE_PULL_REQUEST_IN_CHECK_RUN: Record<string, unknown>[] = [
  {
    "head": {
      "sha": DEFAULT_SHA,
    },
    "number": DEFAULT_PULL_REQUEST_NUMBER,
  },
];

const MULTIPLE_PULL_REQUESTS_IN_CHECK_RUN: Record<string, unknown>[] = [
  {
    "head": {
      "sha": DEFAULT_SHA,
    },
    "number": DEFAULT_PULL_REQUEST_NUMBER,
  },
  {
    "head": {
      "sha": DEFAULT_SECONDARY_SHA,
    },
    "number": DEFAULT_SECONDARY_PULL_REQUEST_NUMBER,
  },
];

const BASE_CHECK_RUN_EVENT_MULTIPLE_PULL_REQUEST: Record<string, unknown> = {
  "check_run": {
    "head_sha": DEFAULT_SHA,
    "pull_requests": MULTIPLE_PULL_REQUESTS_IN_CHECK_RUN,
  },
  "repository": {
    "name": "check-group-test",
    "owner": {
      "login": "tianhaoz95",
    },
  },
};

const BASE_CHECK_RUN_EVENT_SINGLE_PULL_REQUEST: Record<string, unknown> = {
  "check_run": {
    "head_sha": DEFAULT_SHA,
    "pull_requests": SINGLE_PULL_REQUEST_IN_CHECK_RUN,
  },
  "repository": {
    "name": "check-group-test",
    "owner": {
      "login": "tianhaoz95",
    },
  },
};

export {
  BASE_CHECK_RUN_EVENT_MULTIPLE_PULL_REQUEST,
  BASE_CHECK_RUN_EVENT_SINGLE_PULL_REQUEST,
};
