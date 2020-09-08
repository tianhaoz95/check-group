/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckResult } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Checks if all the sub-project requirements are satisfied.
 *
 * @param expectedChecks The checks that are expected, most
 * likely for a certain pull requets.
 *
 * @param checksStatusLookup The checks that has already
 * posted progesses. The key is the check ID and the value
 * is the current check status.
 *
 * @returns The current status of checks fulfillment.
 * * "all_passing" means all required checks post
 *   success conclusion.
 * * "has_failure" means at least one of the required
 *   checks failed.
 * * "pending" means there is no failure but some
 *   checks are pending or missing.
 */
export const satisfyExpectedChecks = (
  expectedChecks: string[],
  checksStatusLookup: Record<string, string>,
): CheckResult => {
  let result: CheckResult = "all_passing";
  expectedChecks.forEach((checkName) => {
    /* eslint-disable security/detect-object-injection */
    if (
      checkName in checksStatusLookup &&
      checksStatusLookup[checkName] !== "success" &&
      checksStatusLookup[checkName] !== "pending"
    ) {
      result = "has_failure";
    }
    if (
      (!(checkName in checksStatusLookup) ||
        checksStatusLookup[checkName] === "pending") &&
      result !== "has_failure"
    ) {
      result = "pending";
    }
    /* eslint-enable security/detect-object-injection */
  });
  return result;
};
