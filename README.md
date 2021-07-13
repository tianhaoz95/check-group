![logo banner](https://github.com/tianhaoz95/check-group/raw/master/docs/assets/logo/banner_rounded.png)

Groups CI checks based on the sub-projects for monorepo projects.

## Motivation

For example, a monorepo project can define that changes checked into documentation (e.g. files in `docs/**.md`) should pass a set of checks (e.g. `markdown lint` and `github_pages_build`), and changes checked into mobile app source code (e.g. files in `clients/app/**.dart`) should pass another set of checks (e.g. `app_unit_tests` and `app_integration_test`) before being merged. It's also possible that there is a set of checks to make sure related sub-projects are compatible (e.g. `compatibility_check`).

For the situation above, there is no easy way to guard the main branch with protected branch schema. The project has to either only define a subset of full CI checks as requirement leaving the main branch less secure or define and run a full list of CI checks for every pull request slowing down merging process.

With **Check Group**, we can add one more CI check that is a combination of CI checks based on sub-projects of interests. The protected branch rule can depend only on the combined check.

To fit the example above into the usecase, we can use the following configuration to tell Check Group how to collect required checks:

```yml
subprojects:
  - id: documentation
    paths:
      - "docs/**.md"
    checks:
      - "markdown_lint"
      - "github_pages_build"
  - id: mobile_app
    paths:
      - "clients/app/**"
    checks:
      - "app_static_analysis"
      - "app_unit_tests"
      - "compatibility_check"
  - id: cli_app
    paths:
      - "clients/cli/**"
    checks:
      - "cli_unit_tests"
      - "compatibility_check"
```

With the configuration above, Check Group collects the requirements that will secure the main branch and only LGTM if they all pass.

Here is an example of how it works in the [pull request](https://github.com/tianhaoz95/check-group-demo/pull/1):

![screenshot of the pr checks](https://github.com/tianhaoz95/check-group/raw/master/docs/assets/screenshot/example_pr_checks.png)

A list of requirements and current fulfillment status is available in the "Details":

![screenshot of the details view](https://github.com/tianhaoz95/check-group/raw/master/docs/assets/screenshot/check_details.png)

Note: since Check Group converts all required checks into a single check to make protected branch happy, the repository only needs to run the affected checks for pull requests. There are many ways to do on every CI/CD platform. Here's an example with GitHub Actions for the usecase above (for more details, check out the [example project](https://github.com/tianhaoz95/check-group-demo)):

```yml
name: app checks
on:
  pull_request:
    branches:
      - "master"
    paths:
      - "clients/app/**"
jobs:
  app_static_analysis: ...
  app_unit_tests: ...
```

## Getting started

### GitHub

The app is available on the GitHub Marketplace.

The app can be configured with `.github/checkgroup.yml`.

Here's an example configuration for a monorepo project consist of a documentation site and a mobile app client:

<!--
  TODO(@tianhaoz95): add more comments into this configuration file and
  make it like a instruction so that I can save some time on writing
  documentation for the configuration options.
-->

```yml
# This field can customize the name this app shows up in the pull request
# checks list. This is requested in #457 since the name "Check Group" is not
# necessarily informative enough for engineers who knows less about this
# workflow. Something like "Integration tests" or "Required tests" might be
# better in some cases.
custom_service_name: your_awesome_name # default to "Check Group"
subprojects:
  - id: documentation
    paths:
      - "docs/**.md"
    checks:
      - "markdown_lint"
      - "github_pages_build"
  - id: mobile_app
    paths:
      - "clients/app/**"
    checks:
      - "app_static_analysis"
      - "app_unit_tests"
```

### GitHub Enterprise

The following commands runs Check Group in self-host server for GitHub Enterprise:

```bash
# This is the GitHub Enterprise endpoint. You will
# need to replace it with your host.
export GHE_HOST=github.example.com

# The following command builds the TypeScript source code
npm run build

# The following command starts the server
npm run start
```

Note: since I don't use GitHub Enterprise, the steps above might not fully reflect the setup process. Please open an issue [here](https://github.com/tianhaoz95/check-group/issues) if there is any problem while setting it up.

## Quick links

- [Repository for testing](https://github.com/tianhaoz95/check-group-test)

## License

[ISC](LICENSE) © 2020 Tianhao Zhou [tianhaoz@umich.edu](mailto:tianhaoz@umich.edu)
