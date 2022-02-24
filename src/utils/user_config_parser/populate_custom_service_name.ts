/**
 * @module PopulateCustomServiceName
 */

import { CheckGroupConfig } from "../../types";
import { DefaultCheckId } from "../../config";

/**
 * Parse the custom service name from the user
 * configuration if present.
 * @param {Record<string, unknown>} configData
 * @param {CheckGroupConfig} config
 **/
export function populateCustomServiceName(
  configData: Record<string, unknown>,
  config: CheckGroupConfig,
): void {
  if ("custom_service_name" in configData) {
    config.customServiceName = configData["custom_service_name"] as string;
  } else {
    config.customServiceName = DefaultCheckId;
  }
}
