import { CheckGroupConfig } from "../../types";
import { populateSubprojects } from "./populate_subprojects";

describe("Populate subprojects helper tests", () => {
  test("Sanity check with empty config", () => {
    const configData: Record<string, unknown> = {
      "subprojects": [],
    };
    const config: CheckGroupConfig = {
      subProjects: [],
    };
    populateSubprojects(configData, config);
    const expectedSubprojectCnt = 0;
    expect(config.subProjects.length).toEqual(expectedSubprojectCnt);
  });

  test("Sanity check with a few subprojects", () => {
    const configData: Record<string, unknown> = {
      "subprojects": [
        {
          "checks": [
            "test-check-1",
            "test-check-2",
          ],
          "id": "test-proj",
          "paths": [
            "/example/path/1",
            "/example/path/2",
          ],
        },
      ],
    };
    const config: CheckGroupConfig = {
      subProjects: [],
    };
    populateSubprojects(configData, config);
    const expectedSubprojectCnt = 1;
    const availableIndex = 0;
    const expectedProjectChecksCnt = 2;
    const expectedProjectPathsCnt = 2;
    expect(config.subProjects.length).toEqual(expectedSubprojectCnt);
    // eslint-disable-next-line security/detect-object-injection
    expect(config.subProjects[availableIndex].checks.length).toEqual(expectedProjectChecksCnt);
    // eslint-disable-next-line security/detect-object-injection
    expect(config.subProjects[availableIndex].paths.length).toEqual(expectedProjectPathsCnt);
  });
});
