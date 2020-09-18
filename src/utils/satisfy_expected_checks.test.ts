/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckResult, SubProjConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { satisfyExpectedChecks } from "./satisfy_expected_checks";

describe("satisfy expected checks tests", () => {
  test("sanity check", () => {
    expect(() => {
      satisfyExpectedChecks([], {});
    }).not.toThrow();
  });

  test("all matching", () => {
    const subProjs: SubProjConfig[] = [
      {
        checks: [
          {
            id: "check_0",
          },
        ],
        id: "proj0",
        paths: [],
      },
      {
        checks: [
          {
            id: "check_1",
          },
        ],
        id: "proj1",
        paths: [],
      },
    ];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "success",
    };
    expect(satisfyExpectedChecks(subProjs, checksStatusLookup)).toBe(
      "all_passing" as CheckResult,
    );
  });

  test("has pending", () => {
    const subProjs: SubProjConfig[] = [
      {
        checks: [
          {
            id: "check_0",
          },
        ],
        id: "proj0",
        paths: [],
      },
      {
        checks: [
          {
            id: "check_1",
          },
        ],
        id: "proj1",
        paths: [],
      },
    ];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "pending",
    };
    expect(satisfyExpectedChecks(subProjs, checksStatusLookup)).toBe(
      "pending" as CheckResult,
    );
  });

  test("has failure", () => {
    const subProjs: SubProjConfig[] = [
      {
        checks: [
          {
            id: "check_0",
          },
        ],
        id: "proj0",
        paths: [],
      },
      {
        checks: [
          {
            id: "check_1",
          },
        ],
        id: "proj1",
        paths: [],
      },
    ];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "failure",
    };
    expect(satisfyExpectedChecks(subProjs, checksStatusLookup)).toBe(
      "has_failure" as CheckResult,
    );
  });

  test("failure should override pending", () => {
    const subProjs: SubProjConfig[] = [
      {
        checks: [
          {
            id: "check_0",
          },
        ],
        id: "proj0",
        paths: [],
      },
      {
        checks: [
          {
            id: "check_1",
          },
        ],
        id: "proj1",
        paths: [],
      },
      {
        checks: [
          {
            id: "check_2",
          },
        ],
        id: "proj2",
        paths: [],
      },
    ];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "failure",
      "check_2": "pending",
    };
    expect(satisfyExpectedChecks(subProjs, checksStatusLookup)).toBe(
      "has_failure" as CheckResult,
    );
  });

  test("missing checks", () => {
    const subProjs: SubProjConfig[] = [
      {
        checks: [
          {
            id: "check_0",
          },
        ],
        id: "proj0",
        paths: [],
      },
      {
        checks: [
          {
            id: "check_1",
          },
        ],
        id: "proj1",
        paths: [],
      },
      {
        checks: [
          {
            id: "check_2",
          },
        ],
        id: "proj2",
        paths: [],
      },
    ];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "success",
    };
    expect(satisfyExpectedChecks(subProjs, checksStatusLookup)).toBe(
      "pending" as CheckResult,
    );
  });

  test("failure should override missing checks", () => {
    const subProjs: SubProjConfig[] = [
      {
        checks: [
          {
            id: "check_0",
          },
        ],
        id: "proj0",
        paths: [],
      },
      {
        checks: [
          {
            id: "check_1",
          },
        ],
        id: "proj1",
        paths: [],
      },
      {
        checks: [
          {
            id: "check_2",
          },
        ],
        id: "proj2",
        paths: [],
      },
    ];
    const checksStatusLookup: Record<string, string> = {
      "check_0": "success",
      "check_1": "failure",
    };
    expect(satisfyExpectedChecks(subProjs, checksStatusLookup)).toBe(
      "has_failure" as CheckResult,
    );
  });
});
