import { DEFAULT_PULL_REQUEST_NUMBER, DEFAULT_SHA } from "../../consts";

export const BASIC_PULL_REQUEST_OPENED_EVENT: Record<string, unknown> = {
  "action": "opened",
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
