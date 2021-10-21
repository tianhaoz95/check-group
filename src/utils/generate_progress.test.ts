/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckGroupConfig, SubProjConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import {
  generateFailingTitle,
  generateProgressDetails,
  generateProgressTitle,
  generateSuccessTitle,
} from "./generate_progress";

describe("generate progress tests", () => {
  const subprojects: SubProjConfig[] = [
    {
      checks: [{ id: "p1_check", satisfied: true }],
      id: "proj1",
      paths: [
        {
          location: "projects/p1/**",
        },
      ],
    },
    {
      checks: [{ id: "p2_check", satisfied: false }],
      id: "proj2",
      paths: [
        {
          location: "projects/p2/**",
        },
      ],
    },
  ];

  const config: CheckGroupConfig = {
    customServiceName: "awesome_name",
    debugInfo: [],
    subProjects: subprojects,
  };

  const checksStatusLookup: Record<string, string> = {
    "p1_check": "success",
    "p2_check": "success",
  };

  test("sanity check", () => {
    expect(() => {
      generateProgressDetails(config.subProjects, checksStatusLookup, config);
    }).not.toThrow();
  });

  test("should include correct checks", () => {
    const progress = generateProgressDetails(
      config.subProjects,
      checksStatusLookup,
      config,
    );
    expect(progress).toContain("p1_check");
    expect(progress).toContain("p2_check");
  });

  test("in progress title content", () => {
    const progress = generateProgressTitle(subprojects, checksStatusLookup);
    expect(progress).toContain("Pending");
  });

  test("success title content", () => {
    const progress = generateFailingTitle(subprojects, checksStatusLookup);
    expect(progress).toContain("Failed");
  });

  test("failing title content", () => {
    const progress = generateSuccessTitle(subprojects, checksStatusLookup);
    expect(progress).toContain("Completed");
  });

  test("should include project names", () => {
    const progress = generateProgressDetails(
      config.subProjects,
      checksStatusLookup,
      config,
    );
    expect(progress).toContain("proj2");
    expect(progress).toContain("proj1");
  });

  test("should include available checks", () => {
    const progress = generateProgressDetails(
      config.subProjects,
      checksStatusLookup,
      config,
    );
    expect(progress).toContain("Currently received checks");
  });

  test("should include marks", () => {
    const progress = generateProgressDetails(
      config.subProjects,
      checksStatusLookup,
      config,
    );
    expect(progress).toContain(":heavy_check_mark:");
  });

  test("should include correct marks", () => {
    const checksStatusLookupWithFailure: Record<string, string> = {
      "p1_check": "success",
      "p2_check": "failure",
    };
    const progress = generateProgressDetails(
      config.subProjects,
      checksStatusLookupWithFailure,
      config,
    );
    expect(progress).toContain(":heavy_check_mark:");
    expect(progress).toContain(":x:");
  });

  test("should treat undefined as not finished", () => {
    const checksStatusLookupWithMissing: Record<string, string> = {
      "p1_check": "success",
    };
    const progress = generateProgressDetails(
      config.subProjects,
      checksStatusLookupWithMissing,
      config,
    );
    expect(progress).toContain(":heavy_check_mark:");
    expect(progress).toContain(":hourglass:");
  });

  test("title generation should not crash", () => {
    expect(() => {
      generateProgressTitle(subprojects, checksStatusLookup);
    }).not.toThrow();
  });

  test("title should have correct amount", () => {
    const checksStatusLookupWithMissing: Record<string, string> = {
      "p1_check": "success",
    };
    expect(
      generateProgressTitle(subprojects, checksStatusLookupWithMissing),
    ).toMatch("Pending (1/2)");
  });
});
