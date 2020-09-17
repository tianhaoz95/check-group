/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubProjConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { generateProgressDetails } from "./generate_progress";

describe("generate progress tests", () => {
  const subprojects: SubProjConfig[] = [
    {
      checks: ["p1_check"],
      id: "proj1",
      paths: ["projects/p1/**"],
    },
    {
      checks: ["p2_check"],
      id: "proj2",
      paths: ["projects/p2/**"],
    },
  ];

  const checksStatusLookup: Record<string, string> = {
    "p1_check": "success",
    "p2_check": "success",
  };

  test("sanity check", () => {
    expect(() => {
      generateProgressDetails(subprojects, checksStatusLookup);
    }).not.toThrow();
  });

  test("should include correct checks", () => {
    const progress = generateProgressDetails(subprojects, checksStatusLookup);
    expect(progress).toContain("p1_check");
    expect(progress).toContain("p2_check");
  });

  test("should include project names", () => {
    const progress = generateProgressDetails(subprojects, checksStatusLookup);
    expect(progress).toContain("proj2");
    expect(progress).toContain("proj1");
  });

  test("should include avaialbe checks", () => {
    const progress = generateProgressDetails(subprojects, checksStatusLookup);
    expect(progress).toContain("received checks are");
    expect(progress).toContain("with status");
  });

  test("should include marks", () => {
    const progress = generateProgressDetails(subprojects, checksStatusLookup);
    expect(progress).toContain("- [x] ");
  });

  test("should include correct marks", () => {
    const checksStatusLookupWithFailure: Record<string, string> = {
      "p1_check": "success",
      "p2_check": "failure",
    };
    const progress = generateProgressDetails(
      subprojects,
      checksStatusLookupWithFailure,
    );
    expect(progress).toContain("- [x] ");
    expect(progress).toContain("- [ ] ");
  });

  test("should treat undefined as not finished", () => {
    const checksStatusLookupWithFailure: Record<string, string> = {
      "p1_check": "success",
    };
    const progress = generateProgressDetails(
      subprojects,
      checksStatusLookupWithFailure,
    );
    expect(progress).toContain("- [x] ");
    expect(progress).toContain("- [ ] ");
  });
});
