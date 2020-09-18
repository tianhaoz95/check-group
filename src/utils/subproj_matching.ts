/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubProjConfig, SubProjPath } from "../types";
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
  const matchingSubProjs: SubProjConfig[] = [];
  subprojConfigs.forEach((subproj) => {
    let hasMatching = false;
    const updatedSubProj = subproj;
    const updatedPaths: SubProjPath[] = [];
    subproj.paths.forEach((path) => {
      const updatedPath = path;
      if (!updatedPath.matches) {
        updatedPath.matches = [];
      }
      filenames.forEach((filename) => {
        if (minimatch(filename, path.location)) {
          hasMatching = true;
          updatedPath.hit = true;
          if (updatedPath.matches) {
            updatedPath.matches.push(filename);
          }
        }
      });
      updatedPaths.push(updatedPath);
    });
    if (hasMatching) {
      updatedSubProj.paths = updatedPaths;
      matchingSubProjs.push(updatedSubProj);
    }
  });
  return matchingSubProjs;
};
