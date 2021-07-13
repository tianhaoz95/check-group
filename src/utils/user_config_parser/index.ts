/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckGroupConfig } from "../../types";
/* eslint-enable @typescript-eslint/no-unused-vars */
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
  const defaultConfig: CheckGroupConfig = {
    subProjects: [],
  };
  try {
    const config = defaultConfig;
    populateSubprojects(configData, config);
    // TODO: add another parser to get the custom ID
    return config;
  } catch {
    return defaultConfig;
  }
};
