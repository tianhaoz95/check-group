import { DefaultCheckId, DefaultDevCheckId } from "../config";
import { CheckGroupConfig } from "../types";
import { Context } from "probot";

/**
 * Checks if the run is triggered by the check status posted
 * by the check itself.
 * For example, when the app bundles the checks snapshot at
 * a given moment, it will post a new check status to indicate
 * the bundled status of other checks, which will then trigger
 * a new run since it is a check status change as well. To
 * prevent a infinite triggering loop, we should bail if we find
 * that the check status is changed by the app itself.
 * @param {Context<"check_run">} context
 * @param {CheckGroupConfig} config
 **/
export const isTriggeredBySelf = (
  context: Context<"check_run">,
  config: CheckGroupConfig,
): boolean => {
  context.log.info(`
    Compare check name ${context.payload["check_run"]["name"]}
    and self service name ${config.customServiceName}.
  `);
  if (
    context.payload["check_run"]["name"] == config.customServiceName ||
    // TODO(@tianhaoz95): remove this check once there is a better approach.
    // This is needed for now because in the test repository at
    // https://github.com/tianhaoz95/check-group-test
    // both the dev version and the prod version exist, and they
    // might support different type of name customization meaning
    // that they might post different names for the check. For now,
    // this will prevent them from triggering each other infinitely,
    // but for future name changes, this might now work. Need to come
    // up with a more systematic approach to prevent cross triggering.
    context.payload["check_run"]["name"] == DefaultCheckId ||
    context.payload["check_run"]["name"] == DefaultDevCheckId
  ) {
    context.log.info("Self triggering detected. Skip.");
    return true;
  }
  return false;
};
