import { getDefaultConfig } from "./default_config";

describe("Default config generator tests", () => {
  test("Sanity check", () => {
    expect(() => {
      const config = getDefaultConfig();
      expect(config).toBeTruthy();
    }).not.toThrow();
  });
});
