import { BASE_PULL_REQUEST_EVENT } from "./base";
import { setAction } from "../modifiers";

const action = "opened";

const BASIC_PULL_REQUEST_OPENED_EVENT = setAction(
  BASE_PULL_REQUEST_EVENT,
  action,
);

export { BASIC_PULL_REQUEST_OPENED_EVENT };
