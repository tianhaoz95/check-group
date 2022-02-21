/**
 * The user config parser utilities
 * @module UserConfigParserUtils
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckGroupConfig } from "../../types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { getDefaultConfig } from "./default_config";
import { populateCustomServiceName } from "./populate_custom_service_name";
import { populateSubprojects } from "./populate_subprojects";

/**
 * Parses the typed configuration from the raw
 * configuration object read from the yaml file
 * in the user repository.
 *
 * @param configData The raw configuration data.
 * @returns The typed configuration.
 */
export const parseUserConfig = (
  configData: Record<string, unknown>,
): CheckGroupConfig => {
  const defaultConfig: CheckGroupConfig = getDefaultConfig();
  try {
    const config = defaultConfig;
    populateSubprojects(configData, config);
    populateCustomServiceName(configData, config);
    return config;
  } catch {
    return defaultConfig;
  }
};
