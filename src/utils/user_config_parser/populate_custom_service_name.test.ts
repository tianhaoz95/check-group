import { CheckGroupConfig } from "../../types";
import { DefaultCheckId } from "../../config";
import { getDefaultConfig } from "./default_config";
import { populateCustomServiceName } from "./populate_custom_service_name";

describe("Populate custom service name helper tests", () => {
  test("Sanity check", () => {
    const configData: Record<string, unknown> = {
      "custom_service_name": "test_service",
      "subprojects": [],
    };
    const config: CheckGroupConfig = getDefaultConfig();
    populateCustomServiceName(configData, config);
    const expectedServiceName = "test_service";
    expect(configData.custom_service_name).toMatch(expectedServiceName);
  });

  test("Ignore if not present", () => {
    const configData: Record<string, unknown> = {
      "subprojects": [],
    };
    const config: CheckGroupConfig = getDefaultConfig();
    expect(() => {
      populateCustomServiceName(configData, config);
    }).not.toThrow();
    expect(config.customServiceName).toMatch(DefaultCheckId);
  });
});
