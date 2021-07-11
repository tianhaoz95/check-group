/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CheckGroupConfig,
  SubProjCheck,
  SubProjConfig,
  SubProjPath,
} from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */

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
    // TODO: make this a helper function since there are more
    // config options to parse.
    if ("subprojects" in configData) {
      const subProjectsData = configData["subprojects"] as Record<
        string,
        unknown
      >[];
      subProjectsData.forEach((subprojData) => {
        if (
          "id" in subprojData &&
          "paths" in subprojData &&
          "checks" in subprojData
        ) {
          const projPaths: SubProjPath[] = [];
          const locations: string[] = subprojData["paths"] as string[];
          locations.forEach((loc) => {
            projPaths.push({
              location: loc,
            });
          });
          const projChecks: SubProjCheck[] = [];
          const checksData: string[] = subprojData["checks"] as string[];
          checksData.forEach((checkId) => {
            projChecks.push({
              id: checkId,
            });
          });
          const subprojConfig: SubProjConfig = {
            checks: projChecks,
            id: subprojData["id"] as string,
            paths: projPaths,
          };
          config.subProjects.push(subprojConfig);
        } else {
          throw Error("id, paths, checks not all found in subproject");
        }
      });
    } else {
      throw Error("subprojects not found in the user configuration file");
    }
    // TODO: add another parser to get the custom ID
    return config;
  } catch {
    return defaultConfig;
  }
};
