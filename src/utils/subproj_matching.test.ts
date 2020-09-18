/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubProjConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { matchFilenamesToSubprojects } from "./subproj_matching";

describe("subproject matching tests", () => {
  test("sanity check", () => {
    const matchingConfigs = matchFilenamesToSubprojects([], []);
    expect(matchingConfigs).toBeDefined();
  });

  test("matches correct filenames", () => {
    const filenames: string[] = [
      "projects/project_1/main.cc",
      "projects/project_1/main.py",
      "projects/project_3/index.js",
    ];
    const subprojConfigs: SubProjConfig[] = [
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
        checks: ["project_5_check"],
        id: "project5",
        paths: [
          {
            location: "projects/project_5/**",
          },
        ],
      },
    ];
    const matchingConfigs = matchFilenamesToSubprojects(
      filenames,
      subprojConfigs,
    );
    /* eslint-disable no-magic-numbers */
    expect(matchingConfigs.length).toEqual(1);
    expect(matchingConfigs[0]).toMatchObject({
      checks: ["project_1_check"],
      id: "project1",
      paths: [
        {
          location: "projects/project_1/**",
        },
      ],
    });
    /* eslint-enable no-magic-numbers */
  });
});
