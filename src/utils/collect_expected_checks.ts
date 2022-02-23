/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubProjConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Collect a list of expected passing checks given a
 * list of sub-project configs.
 *
 * It is responsible for de-dup the checks since multiple
 * subprojects can request the same check.
 *
 * @param configs A list of sub-project configurations.
 * @returns A list of check IDs.
 */
export const collectExpectedChecks = (configs: SubProjConfig[]): string[] => {
  const requiredChecks: string[] = [];
  const checksLookup: Record<string, number> = {};
  configs.forEach((config) => {
    config.checks.forEach((check) => {
      /* eslint-disable security/detect-object-injection */
      if (check.id in checksLookup) {
        checksLookup[check.id] += 1;
      } else {
        checksLookup[check.id] = 0;
        requiredChecks.push(check.id);
      }
      /* eslint-enable security/detect-object-injection */
    });
  });
  return requiredChecks;
};
