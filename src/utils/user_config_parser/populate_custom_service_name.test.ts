import { CheckGroupConfig } from "../../types";
import { populateCustomServiceName } from "./populate_custom_service_name";

describe("Populate custom service name helper tests", () => {
  test("Sanity check", () => {
    const configData: Record<string, unknown> = {
      "custom_service_name": "test_service",
      "subprojects": [],
    };
    const config: CheckGroupConfig = {
      subProjects: [],
    };
    populateCustomServiceName(configData, config);
    const expectedServiceName = "test_service";
    expect(configData.custom_service_name).toMatch(expectedServiceName);
  });

  test("Ignore if not present", () => {
    const configData: Record<string, unknown> = {
      "subprojects": [],
    };
    const config: CheckGroupConfig = {
      subProjects: [],
    };
    expect(() => {
      populateCustomServiceName(configData, config);
    }).not.toThrow();
    expect(config.customServiceName).toBeUndefined();
  });
});
