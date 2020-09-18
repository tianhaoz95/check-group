export interface SubProjPath {
  location?: string;
  hit?: boolean;
}

export interface SubProjConfig {
  /**
   * The ID for the sub-project
   */
  id: string;
  /**
   * The paths that defines
   * this sub-project within
   * the repository.
   */
  paths: SubProjPath[];
  /**
   * A list of check IDs that
   * are expected to pass for
   * the sub-project.
   */
  checks: string[];
}

export interface CheckGroupConfig {
  /**
   * The sub-project configurations.
   */
  subProjects: SubProjConfig[];
}

/**
 * The result of the processing pipeline.
 */
export type CheckResult = "all_passing" | "has_failure" | "pending";

/**
 * Abstract the pull request information that
 * are needed for this app.
 */
export interface PullRequestData {
  number: number;
  sha: string;
}

export interface CheckRunData {
  name: string;
  status: string;
  conclusion: string | undefined;
}
