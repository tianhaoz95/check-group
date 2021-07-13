import { DefaultCheckId } from "../../config";
import { parseUserConfig } from ".";

describe("user config parser tests", () => {
  test("sanity check", () => {
    expect(() => {
      parseUserConfig({});
    }).not.toThrow();
  });

  test("invalid config returns default config", () => {
    const expectedSubprojectCnt = 0;
    expect(parseUserConfig({}).subProjects.length).toEqual(expectedSubprojectCnt);
  });

  test("missing fields returns default config", () => {
    const expectedSubprojectCnt = 0;
    expect(
      parseUserConfig({
        "subprojects": [
          {
            "id": "partially_broken_project",
          },
        ],
      }).subProjects.length,
    ).toEqual(expectedSubprojectCnt);
  });

  test("use default service name", () => {
    const config = parseUserConfig({
      "subprojects": [],
    });
    expect(config.customServiceName).toEqual(DefaultCheckId);
  });

  test("parse correct config", () => {
    const config = parseUserConfig({
      "custom_service_name": "custom_name",
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
    const expectedSubprojectCnt = 2;
    const projectIndexForIdVerification = 0;
    const projectIndexForPathVerification = 1;
    const pathIndexForVerification = 0;
    const expectedProjectName = "project_0";
    const expectedProjectPath = "projects/project_1/**";
    const expectedServiceName = "custom_name";
    expect(config.subProjects.length).toEqual(expectedSubprojectCnt);
    // eslint-disable-next-line security/detect-object-injection
    expect(config.subProjects[projectIndexForIdVerification].id).toMatch(expectedProjectName);
    expect(
      // eslint-disable-next-line security/detect-object-injection
      config.subProjects[projectIndexForPathVerification].paths[pathIndexForVerification].location,
    ).toMatch(
      expectedProjectPath,
    );
    expect(config.customServiceName).toMatch(expectedServiceName);
  });
});
