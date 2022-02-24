/**
 * @module DefaultConfigGetter
 */

import { CheckGroupConfig } from "../../types";

/**
 * Generates a default configuration for the user config as a placeholder.
 **/
export const getDefaultConfig = (): CheckGroupConfig => {
  return {
    customServiceName: "",
    debugInfo: [],
    subProjects: [],
  };
};
