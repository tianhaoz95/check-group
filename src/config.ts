/**
 * The default name that will be display on the list
 * on the pull request page.
 */
export const DefaultCheckId = "Check Group";

/**
 * The default path to find the configuration file.
 * This is not customizable for now, but might be in
 * the future upon request.
 */
export const ConfigPath = "checkgroup.yml";

/**
 * The message that will be displayed in the pull request
 * checks list when the service is started but no other
 * checks have reported anything yet.
 */
export const StartCheckTitle = "Started";

/**
 * The message that will be displayed as the summary when the
 * service status is "started". The user will see this after
 * clicking on the detail button next to the check.
 */
export const StartCheckSummary = "The service has started gathering required statuses";

/**
 * The message that will be displayed as the details when the
 * service status is "started" to inform the user what the app
 * is currently doing and why there is no status yet to hopefully
 * report confusion.
 */
export const StartCheckDetails = `
  The service has started watching available check statues, but other
  checks have not reported statuses yet.
`;

/**
 * The title message that will be displayed to the user when an
 * error is encountered while the app is running.
 */
export const ErrorCheckTitle = "Error";

/**
 * The summary message that will be displayed to the user when an
 * error happened during the app run.
 */
export const ErrorCheckSummary = "Whoops, the app encountered an error";

export const ErrorCheckDetails = `
  Something went wrong, please file a issue
  [here](https://github.com/tianhaoz95/check-group/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D).
  Thanks!
`;
