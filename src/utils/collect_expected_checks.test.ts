/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubProjConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { collectExpectedChecks } from "./collect_expected_checks";

describe("collect expected checks tests", () => {
  test("sanity check", () => {
    const checks = collectExpectedChecks([]);
    expect(checks).toBeDefined();
  });

  test("collect checks", () => {
    const configs: SubProjConfig[] = [
      {
        checks: ["project_1_check"],
        id: "project1",
        paths: [
          {
            location: "projects/project_1/**",
          },
        ],
      },
      {
        checks: ["project_2_check"],
        id: "project2",
        paths: [
          {
            location: "projects/project_2/**",
          },
        ],
      },
    ];
    const checks = collectExpectedChecks(configs);
    /* eslint-disable no-magic-numbers */
    expect(checks.length).toEqual(2);
    /* eslint-enable no-magic-numbers */
    expect(checks).toContain("project_1_check");
    expect(checks).toContain("project_2_check");
  });

  test("should remove dup", () => {
    const configs: SubProjConfig[] = [
      {
        checks: ["project_1_check", "common_check"],
        id: "project1",
        paths: [
          {
            location: "projects/project_1/**",
          },
        ],
      },
      {
        checks: ["project_2_check", "common_check"],
        id: "project2",
        paths: [
          {
            location: "projects/project_2/**",
          },
        ],
      },
    ];
    const checks = collectExpectedChecks(configs);
    /* eslint-disable no-magic-numbers */
    expect(checks.length).toEqual(3);
    /* eslint-enable no-magic-numbers */
    expect(checks).toContain("project_1_check");
    expect(checks).toContain("project_2_check");
    expect(checks).toContain("common_check");
  });
});
