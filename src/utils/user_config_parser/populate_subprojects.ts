import { CheckGroupConfig, SubProjCheck, SubProjConfig, SubProjPath } from "../../types";

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
        // TODO: make the debugging message more details (e.g., show what is missing).
        config.debugInfo = {
          configError: true,
          configErrorMsg: "Essential fields missing from config.",
        };
        throw Error("id, paths, checks not all found in subproject");
      }
    });
  } else {
    throw Error("subprojects not found in the user configuration file");
  }
}
