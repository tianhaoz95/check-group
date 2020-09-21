/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProgressReport, SubProjConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */

export const generateProgressReport = (
  subprojects: SubProjConfig[],
  checksStatusLookup: Record<string, string>,
): ProgressReport => {
  const report: ProgressReport = {
    completed: [],
    expected: [],
    failed: [],
    missing: [],
    needAction: [],
    running: [],
    succeeded: [],
  };
  const lookup: Record<string, boolean> = {};
  subprojects.forEach((proj) => {
    proj.checks.forEach((check) => {
      /* eslint-disable security/detect-object-injection */
      if (!(check.id in lookup)) {
        lookup[check.id] = true;
        report.expected?.push(check.id);
        if (check.id in checksStatusLookup) {
          const status = checksStatusLookup[check.id];
          if (status === "success") {
            report.completed?.push(check.id);
            report.succeeded?.push(check.id);
          }
          if (status === "failure") {
            report.completed?.push(check.id);
            report.failed?.push(check.id);
          }
          if (status === "pending") {
            report.running?.push(check.id);
          }
        }
      }
      /* eslint-enable security/detect-object-injection */
    });
  });
  return report;
};

/**
 * Generate the title for the status check.
 */
export const generateProgressTitle = (
  subprojects: SubProjConfig[],
  checksStatusLookup: Record<string, string>,
): string => {
  const report = generateProgressReport(subprojects, checksStatusLookup);
  const message = `Pending (${report.completed?.length}/${report.expected?.length})`;
  return message;
};

export const generateProgressSummary = (
  subprojects: SubProjConfig[],
  checksStatusLookup: Record<string, string>,
): string => {
  const report = generateProgressReport(subprojects, checksStatusLookup);
  const message = `Progress: ${report.completed?.length} completed, ${report.running?.length} pending`;
  return message;
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
    progress += `Summary for sub-project ${subproject.id}\n\n`;
    subproject.checks.forEach((check) => {
      let mark = " ";
      /* eslint-disable security/detect-object-injection */
      if (
        check.id in checksStatusLookup &&
        checksStatusLookup[check.id] == "success"
      ) {
        mark = "x";
      }
      progress += `- [${mark}] ${check.id} with status ${
        checksStatusLookup[check.id]
      }\n`;
      /* eslint-enable security/detect-object-injection */
    });
    progress += "\n";
  });
  progress += "Currently received checks are:\n\n";
  /* eslint-disable security/detect-object-injection */
  for (const avaiableCheck in checksStatusLookup) {
    progress += `- ${avaiableCheck} with status ${checksStatusLookup[avaiableCheck]}\n`;
  }
  progress += "\n";
  /* eslint-enable security/detect-object-injection */
  return progress;
};
