/**
 * Utilities that does not rely on Octokit request.
 * 
 * The utilities are separated for the purpose of testing. Writing tests for the
 * utilities is much easier than core functions, so this should encourage a more
 * robust code development.
 * 
 * @module Utils
 */

import {
  generateFailingTitle,
  generateProgressDetails,
  generateProgressSummary,
  generateProgressTitle,
  generateSuccessTitle,
} from "./generate_progress";
import { collectExpectedChecks } from "./collect_expected_checks";
import { matchFilenamesToSubprojects } from "./subproj_matching";
import { parseUserConfig } from "./user_config_parser";
import { satisfyExpectedChecks } from "./satisfy_expected_checks";

export {
  collectExpectedChecks,
  generateFailingTitle,
  generateProgressDetails,
  generateProgressSummary,
  generateProgressTitle,
  generateSuccessTitle,
  matchFilenamesToSubprojects,
  parseUserConfig,
  satisfyExpectedChecks,
};
