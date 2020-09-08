/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckResult } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { satisfyExpectedChecks } from "./satisfy_expected_checks";

describe("satisfy expected checks tests", () => {
  test("sanity check", () => {
    expect(() => {
      satisfyExpectedChecks([], {});
    }).not.toThrow();
  });

  test("all matching", () => {
    const expectedChecks: string[] = ["check_0", "check_1"];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "success",
    };
    expect(satisfyExpectedChecks(expectedChecks, checksStatusLookup)).toBe(
      "all_passing" as CheckResult,
    );
  });

  test("has pending", () => {
    const expectedChecks: string[] = ["check_0", "check_1"];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "pending",
    };
    expect(satisfyExpectedChecks(expectedChecks, checksStatusLookup)).toBe(
      "pending" as CheckResult,
    );
  });

  test("has failure", () => {
    const expectedChecks: string[] = ["check_0", "check_1"];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "failure",
    };
    expect(satisfyExpectedChecks(expectedChecks, checksStatusLookup)).toBe(
      "has_failure" as CheckResult,
    );
  });

  test("failure should override pending", () => {
    const expectedChecks: string[] = ["check_0", "check_1", "check_2"];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "failure",
      "check_2": "pending",
    };
    expect(satisfyExpectedChecks(expectedChecks, checksStatusLookup)).toBe(
      "has_failure" as CheckResult,
    );
  });

  test("missing checks", () => {
    const expectedChecks: string[] = ["check_0", "check_1", "check_2"];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "success",
    };
    expect(satisfyExpectedChecks(expectedChecks, checksStatusLookup)).toBe(
      "pending" as CheckResult,
    );
  });

  test("failure should override missing checks", () => {
    const expectedChecks: string[] = ["check_0", "check_1", "check_2"];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "failure",
    };
    expect(satisfyExpectedChecks(expectedChecks, checksStatusLookup)).toBe(
      "has_failure" as CheckResult,
    );
  });
});
