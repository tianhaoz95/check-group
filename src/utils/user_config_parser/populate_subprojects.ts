import { CheckGroupConfig, SubProjCheck, SubProjConfig, SubProjPath } from "../../types";

function parseProjectId(subprojData: Record<string, unknown>, subprojConfig: SubProjConfig, config: CheckGroupConfig): void {
  if ("id" in subprojData) {
    subprojConfig.id = subprojData["id"] as string;
  } else {
    config.debugInfo.push({
      configError: true,
      configErrorMsg: "Essential fields missing from config.",
    });
  }
}

function parseProjectPaths(subprojData: Record<string, unknown>, subprojConfig: SubProjConfig, config: CheckGroupConfig): void {
  if ("paths" in subprojData) {
    const projPaths: SubProjPath[] = [];
    const locations: string[] = subprojData["paths"] as string[];
    locations.forEach((loc) => {
      projPaths.push({
        location: loc,
      });
    });
    subprojConfig.paths = projPaths;
  } else {
    config.debugInfo.push({
      configError: true,
      configErrorMsg: "Essential fields missing from config.",
    });
  }
}

function parseProjectChecks(subprojData: Record<string, unknown>, subprojConfig: SubProjConfig, config: CheckGroupConfig): void {
  if ("checks" in subprojData) {
    const projChecks: SubProjCheck[] = [];
    const checksData: string[] = subprojData["checks"] as string[];
    checksData.forEach((checkId) => {
      projChecks.push({
        id: checkId,
      });
    });
    subprojConfig.checks = projChecks;
  } else {
    config.debugInfo.push({
      configError: true,
      configErrorMsg: "Essential fields missing from config.",
    });
  }
}

/**
 * Parse user config file and populate subprojects
 * @param {Record<string, unknown>} configData
 * @param {CheckGroupConfig} config
 **/
export function populateSubprojects(configData: Record<string, unknown>, config: CheckGroupConfig): void {
  if ("subprojects" in configData) {
    const subProjectsData = configData["subprojects"] as Record<
            string,
            unknown
        >[];
    subProjectsData.forEach((subprojData) => {
      const subprojConfig: SubProjConfig = {
        checks: [],
        id: "Unknown",
        paths: [],
      };
      parseProjectId(subprojData, subprojConfig, config);
      parseProjectPaths(subprojData, subprojConfig, config);
      parseProjectChecks(subprojData, subprojConfig, config);
      config.subProjects.push(subprojConfig);
    });
  } else {
    throw Error("subprojects not found in the user configuration file");
  }
}
