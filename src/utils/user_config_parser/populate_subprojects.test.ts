import { CheckGroupConfig, SubProjConfig } from "../../types";
import { parseProjectId, populateSubprojects } from "./populate_subprojects";
import { getDefaultConfig } from "./default_config";

describe("Populate subprojects helper tests", () => {
  test("Missing ID should fail", () => {
    const rawConfig: Record<string, unknown> = {
      "checks": [],
      "paths": [],
    };
    const config: SubProjConfig = {
      checks: [],
      id: "Unknown",
      paths: [],
    };
    expect(() => parseProjectId(rawConfig, config)).toThrow();
  });

  test("Correctly parse project ID", () => {
    const rawConfig: Record<string, unknown> = {
      "checks": [],
      "id": "foo",
      "paths": [],
    };
    const config: SubProjConfig = {
      checks: [],
      id: "Unknown",
      paths: [],
    };
    parseProjectId(rawConfig, config);
    expect(config.id).toMatch("foo");
  });

  test("Sanity check with empty config", () => {
    const configData: Record<string, unknown> = {
      "subprojects": [],
    };
    const config: CheckGroupConfig = getDefaultConfig();
    populateSubprojects(configData, config);
    const expectedSubprojectCnt = 0;
    expect(config.subProjects.length).toEqual(expectedSubprojectCnt);
  });

  test("Sanity check with a few subprojects", () => {
    const configData: Record<string, unknown> = {
      "subprojects": [
        {
          "checks": ["test-check-1", "test-check-2"],
          "id": "test-proj",
          "paths": ["/example/path/1", "/example/path/2"],
        },
      ],
    };
    const config: CheckGroupConfig = getDefaultConfig();
    populateSubprojects(configData, config);
    const expectedSubprojectCnt = 1;
    const availableIndex = 0;
    const expectedProjectChecksCnt = 2;
    const expectedProjectPathsCnt = 2;
    expect(config.subProjects.length).toEqual(expectedSubprojectCnt);
    // eslint-disable-next-line security/detect-object-injection
    expect(config.subProjects[availableIndex].checks.length).toEqual(
      expectedProjectChecksCnt,
    );
    // eslint-disable-next-line security/detect-object-injection
    expect(config.subProjects[availableIndex].paths.length).toEqual(
      expectedProjectPathsCnt,
    );
  });

  test("Misconfigured project missing checks should emit warnings", () => {
    const configData: Record<string, unknown> = {
      "subprojects": [
        {
          "id": "test-proj",
          "paths": ["/example/path/1", "/example/path/2"],
        },
      ],
    };
    const config: CheckGroupConfig = getDefaultConfig();
    populateSubprojects(configData, config);
    const expectedSubprojectCnt = 1;
    const expectedWarningCnt = 1;
    expect(config.subProjects.length).toEqual(expectedSubprojectCnt);
    expect(config.debugInfo.length).toEqual(expectedWarningCnt);
  });
});
