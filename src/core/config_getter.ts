/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckGroupConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigPath } from "../config";
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { parseUserConfig } from "../utils";

/**
 * Fetches the app configuration from the user's repository.
 *
 * @param context The base Probot context which is even independent.
 * @returns The configuration or default configuration if non exists.
 */
export const fetchConfig = async (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  context: Context<"check_run"> | Context<"pull_request">,
  /* eslint-enable @typescript-eslint/no-explicit-any */
): Promise<CheckGroupConfig> => {
  const configData: Record<string, unknown> = (await context.config(
    ConfigPath,
  )) as Record<string, unknown>;
  return parseUserConfig(configData);
};
