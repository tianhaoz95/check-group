/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubProjConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import minimatch from "minimatch";

/**
 * Returns a list of sub-projects inferred from the files in
 * pull requests.
 *
 * @param filenames The list of files listed in pull requests.
 */
export const matchFilenamesToSubprojects = (
  filenames: string[],
  subprojConfigs: SubProjConfig[],
): SubProjConfig[] => {
  const subprojs: SubProjConfig[] = [];
  const subprojLookup: Record<string, number> = {};
  filenames.forEach((filename) => {
    subprojConfigs.forEach((subproj) => {
      subproj.paths.forEach((path) => {
        if (minimatch(filename, path.location)) {
          if (subproj.id in subprojLookup) {
            subprojLookup[subproj.id] += 1;
          } else {
            subprojLookup[subproj.id] = 0;
            subprojs.push(subproj);
          }
        }
      });
    });
  });
  return subprojs;
};
