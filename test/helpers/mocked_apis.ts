/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckRunData } from "../../src/types";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import fs from "fs";
import nock from "nock";
import path from "path";

export const setConfigToBasic = (configId: string): void => {
  const configFileLocation = path.join(
    __dirname,
    "..",
    "files",
    "configs",
    `${configId}.yml`,
  );
  /* eslint-disable security/detect-non-literal-fs-filename */
  const rawContent = fs.readFileSync(configFileLocation);
  /* eslint-enable security/detect-non-literal-fs-filename */
  const contentBuf = Buffer.from(rawContent);
  const encodedContent = contentBuf.toString("base64");
  nock("https://api.github.com")
    .get(
      "/repos/tianhaoz95/check-group-test/contents/.github%2F.github%2Fcheckgroup.yml",
    )
    .reply(StatusCodes.OK, {
      content: encodedContent,
      encoding: "base64",
      name: "checkgroup.yml",
      path: ".github/contents/.github/checkgroup.yml",
      size: encodedContent.length,
      type: "file",
    });
  nock("https://api.github.com")
    .get(
      "/repos/tianhaoz95/.github/contents/.github%2F.github%2Fcheckgroup.yml",
    )
    .reply(StatusCodes.NOT_FOUND);
};

export const setConfigToNotFound = (): void => {
  nock("https://api.github.com")
    .get(
      "/repos/tianhaoz95/.github/contents/.github%2F.github%2Fcheckgroup.yml",
    )
    .reply(StatusCodes.NOT_FOUND);
  nock("https://api.github.com")
    .get(
      "/repos/tianhaoz95/check-group-test/contents/.github%2F.github%2Fcheckgroup.yml",
    )
    .reply(StatusCodes.NOT_FOUND);
};

export const setPullRequestFiles = (
  filenames: string[],
  pullRequestNumber: number,
): void => {
  const filesResponse: Record<string, string>[] = [];
  filenames.forEach((filename) => {
    filesResponse.push({
      "filename": filename,
    });
  });
  nock("https://api.github.com")
    .get(`/repos/tianhaoz95/check-group-test/pulls/${pullRequestNumber}/files`)
    .reply(StatusCodes.OK, filesResponse);
};

export const setChecksForSha = (checks: CheckRunData[], ref: string): void => {
  const checksResponse: Record<string, unknown> = {};
  const checkRuns: Record<string, unknown>[] = [];
  checks.forEach((check) => {
    const checkRun: Record<string, unknown> = {
      "name": check.name,
    };
    checkRun["conclusion"] = check.conclusion;
    checkRun["status"] = check.status;
    checkRuns.push(checkRun);
  });
  checksResponse["total_count"] = checks.length;
  checksResponse["check_runs"] = checkRuns;
  nock("https://api.github.com")
    .get(`/repos/tianhaoz95/check-group-test/commits/${ref}/check-runs`)
    .reply(StatusCodes.OK, checksResponse);
};

export const expectStartingCheck = (sha: string): void => {
  nock("https://api.github.com")
    .post(
      "/repos/tianhaoz95/check-group-test/check-runs",
      (body: Record<string, unknown>) => {
        expect(body["status"]).toMatch("queued");
        expect(body["head_sha"]).toMatch(sha);
        return true;
      },
    )
    .reply(StatusCodes.CREATED);
};

export const expectUpdatingCheck = (sha: string): void => {
  nock("https://api.github.com")
    .post(
      "/repos/tianhaoz95/check-group-test/check-runs",
      (body: Record<string, unknown>) => {
        expect(body["status"]).toMatch("in_progress");
        expect(body["head_sha"]).toMatch(sha);
        return true;
      },
    )
    .reply(StatusCodes.CREATED);
};

export const expectSuccessCheck = (sha: string): void => {
  nock("https://api.github.com")
    .post(
      "/repos/tianhaoz95/check-group-test/check-runs",
      (body: Record<string, unknown>) => {
        expect(body["status"]).toMatch("completed");
        expect(body["conclusion"]).toMatch("success");
        expect(body["head_sha"]).toMatch(sha);
        return true;
      },
    )
    .reply(StatusCodes.CREATED);
};

export const expectFailureCheck = (sha: string): void => {
  nock("https://api.github.com")
    .post(
      "/repos/tianhaoz95/check-group-test/check-runs",
      (body: Record<string, unknown>) => {
        expect(body["status"]).toMatch("completed");
        expect(body["conclusion"]).toMatch("failure");
        expect(body["head_sha"]).toMatch(sha);
        return true;
      },
    )
    .reply(StatusCodes.CREATED);
};
