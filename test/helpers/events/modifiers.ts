export const setAction = (
  event: Record<string, unknown>,
  action: string,
): Record<string, unknown> => {
  const copy = { ...event };
  copy["action"] = action;
  return copy;
};

export const removePull = (
  event: Record<string, unknown>,
): Record<string, unknown> => {
  const copy = { ...event };
  copy["pull_request"] = undefined;
  return copy;
};

export const removeCheckRun = (
  event: Record<string, unknown>,
): Record<string, unknown> => {
  const copy = { ...event };
  copy["check_run"] = undefined;
  return copy;
};
