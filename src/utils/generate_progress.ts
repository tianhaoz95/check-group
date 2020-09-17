/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubProjConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Generate the title for the status check.
 */
export const generateProgressTitle = (): string => {
  return "Pending";
};

export const generateProgressSummary = (): string => {
  return "Some checks are pending";
};

/**
 * Generates a progress report for currently finished checks
 * which will be posted in the status check report.
 *
 * @param subprojects The subprojects that the PR matches.
 * @param checksStatusLookup The lookup table for checks status.
 */
export const generateProgressDetails = (
  subprojects: SubProjConfig[],
  checksStatusLookup: Record<string, string>,
): string => {
  let progress = "";
  subprojects.forEach((subproject) => {
    progress += `Summary for sub-project ${subproject.id}\n`;
    subproject.checks.forEach((check) => {
      let mark = " ";
      /* eslint-disable security/detect-object-injection */
      if (
        check in checksStatusLookup &&
        checksStatusLookup[check] == "success"
      ) {
        mark = "x";
      }
      progress += `- [${mark}] ${check} with status ${checksStatusLookup[check]}\n`;
      /* eslint-enable security/detect-object-injection */
    });
  });
  return progress;
};
