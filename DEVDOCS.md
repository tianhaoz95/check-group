# Dev Docs

TODO(@tianhaoz95): finalize the sections on this page.

## Overview

TODO(@tianhaoz95): add the overall structure of the app.

## Environment

The recommended way of developing the app is with the Visual Studio Code remote
container.

TODO(@tianhaoz95): add detailed instructions.

## Testing

### Unit tests and integration tests

Both unit tests and integration tests run with the following command:

```bash
npm test
```

#### Unit tests

Unit tests only applies to the implementations within `src/utils` which does not
rely on mocked GitHub API response for testing.

Since setting up `nock` for GitHub APIs is a complicated process and there is
not many benefits in testing those utility functions with a mocked endpoint, a
cut was made to test those implementations separately.

The unit tests locate with the files that they are testing, for example, the
unit tests for `src/utils/generate_progress.ts` will be in
`src/utils/generate_progress.test.ts`.

#### Integration tests

The integration tests will mock the end to end flow with mocked triggering
GitHub events and mocked GitHub API responses.

The integration tests are close to the actual behavior of the app except that it
will not be able to test how robust the app is when the GitHub API is flaky or
what happens when there is too much traffic.

The integrations tests are in the top level `test` folder.

### E2E testing

For now, the best way to do end to end testing is to create a testing repository
and a test GitHub app which will be installed into the testing repository.

TODO(@tianhaoz95): add detailed instructions on how to create the testing setup.

## Deployment

TODO(@tianhaoz95): add details on how deployment works.
