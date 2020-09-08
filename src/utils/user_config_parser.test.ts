import { parseUserConfig } from "./user_config_parser";

describe("user config parser tests", () => {
  test("sanity check", () => {
    expect(() => {
      parseUserConfig({});
    }).not.toThrow();
  });

  test("invalid config returns default config", () => {
    /* eslint-disable no-magic-numbers */
    expect(parseUserConfig({}).subProjects.length).toEqual(0);
    /* eslint-enable no-magic-numbers */
  });

  test("missing fields returns default config", () => {
    /* eslint-disable no-magic-numbers */
    expect(
      parseUserConfig({
        "subprojects": [
          {
            "id": "partially_broken_project",
          },
        ],
      }).subProjects.length,
    ).toEqual(0);
    /* eslint-enable no-magic-numbers */
  });

  test("parse correct config", () => {
    const config = parseUserConfig({
      "subprojects": [
        {
          "checks": ["project_0_check_0", "project_0_check_1"],
          "id": "project_0",
          "paths": ["projects/project_0/**"],
        },
        {
          "checks": ["project_1_check_0", "project_1_check_1"],
          "id": "project_1",
          "paths": ["projects/project_1/**"],
        },
      ],
    });
    /* eslint-disable no-magic-numbers */
    expect(config.subProjects.length).toEqual(2);
    expect(config.subProjects[0].id).toMatch("project_0");
    expect(config.subProjects[1].paths[0]).toMatch("projects/project_1/**");
    /* eslint-enable no-magic-numbers */
  });
});
