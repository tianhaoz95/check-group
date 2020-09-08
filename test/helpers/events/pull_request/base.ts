import { DEFAULT_PULL_REQUEST_NUMBER, DEFAULT_SHA } from "../../consts";

export const BASE_PULL_REQUEST_EVENT: Record<string, unknown> = {
  "number": DEFAULT_PULL_REQUEST_NUMBER,
  "pull_request": {
    "head": {
      "sha": DEFAULT_SHA,
    },
    "number": DEFAULT_PULL_REQUEST_NUMBER,
    "user": {
      "login": "tianhaoz95",
    },
  },
  "repository": {
    "name": "check-group-test",
    "owner": {
      "login": "tianhaoz95",
    },
  },
};
