import { StatusCodes } from "http-status-codes";
import nock from "nock";

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

export const setChecksForSha = (checks: string[], ref: string): void => {
  const checksResponse: Record<string, unknown> = {};
  const checkRuns: Record<string, unknown>[] = [];
  checks.forEach((check) => {
    const checkRun: Record<string, unknown> = {
      "name": check,
    };
    checkRuns.push(checkRun);
  });
  checksResponse["total_count"] = checks.length;
  checksResponse["check_runs"] = checkRuns;
  nock("https://api.github.com")
    .get(`/repos/tianhaoz95/check-group-test/commits/${ref}/check-runs`)
    .reply(StatusCodes.OK, checksResponse);
};

export const expectStartingCheck = (): void => {
  nock("https://api.github.com")
    .post(
      "/repos/tianhaoz95/check-group-test/check-runs",
      (body: Record<string, unknown>) => {
        expect(body["status"]).toMatch("queued");
        return true;
      },
    )
    .reply(StatusCodes.CREATED);
};

export const expectUpdatingCheck = (): void => {
  nock("https://api.github.com")
    .post(
      "/repos/tianhaoz95/check-group-test/check-runs",
      (body: Record<string, unknown>) => {
        expect(body["status"]).toMatch("in_progress");
        return true;
      },
    )
    .reply(StatusCodes.CREATED);
};

export const expectSuccessCheck = (): void => {
  nock("https://api.github.com")
    .post(
      "/repos/tianhaoz95/check-group-test/check-runs",
      (body: Record<string, unknown>) => {
        expect(body["status"]).toMatch("completed");
        expect(body["conclusion"]).toMatch("success");
        return true;
      },
    )
    .reply(StatusCodes.CREATED);
};

export const expectFailureCheck = (): void => {
  nock("https://api.github.com")
    .post(
      "/repos/tianhaoz95/check-group-test/check-runs",
      (body: Record<string, unknown>) => {
        expect(body["status"]).toMatch("completed");
        expect(body["conclusion"]).toMatch("failure");
        return true;
      },
    )
    .reply(StatusCodes.CREATED);
};
