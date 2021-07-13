import { CheckGroupConfig } from "../types";
import { Context } from "probot";

/**
 * Checks if the run is triggered by the check status posted
 * by the check itself.
 * For example, when the app bundles the checks snapshot at
 * a givem moment, it will post a new check status to indicate
 * the bundled status of other checks, which will then trigger
 * a new run since it is a check status change as well. To
 * prevent a infinite triggering loop, we should bail if we find
 * that the check status is changed by the app itself.
 * @param {Context<"check_run">} context
 * @param {CheckGroupConfig} config
 **/
export const isTriggeredBySelf = (context: Context<"check_run">, config: CheckGroupConfig): boolean => {
  if (context.payload["check_run"]["name"] == config.customServiceName) {
    return true;
  }
  return false;
};
