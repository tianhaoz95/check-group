# Check Group
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## :warning: Sunset Notice :warning:

TODO(@tianhaoz95): add future plans and migration guide.

What are not going to change:

* The  project can still be self-hosted.
* I will still maintain the project health including getting dependencies
up-to-date and merging code contributions.

What are changing:

* There will not be hosted services.
* There won't be new features planned.

---

> :warning: ~~**Check Group is now hosted on paid service to ensure better up time**: Check out the details [here](https://github.com/tianhaoz95/check-group/issues/769) and please consider [sponsoring the project](https://www.buymeacoffee.com/jacksonzhou666)!~~

![logo banner](https://github.com/tianhaoz95/check-group/raw/master/docs/assets/logo/banner_rounded.png)

Groups CI checks based on the sub-projects for monorepo projects.

## Motivation

For example, a monorepo project can define that changes checked into documentation (e.g. files in `docs/**.md`) should pass a set of checks (e.g. `markdown lint` and `github_pages_build`), and changes checked into mobile app source code (e.g. files in `clients/app/**.dart`) should pass another set of checks (e.g. `app_unit_tests` and `app_integration_test`) before being merged. It's also possible that there is a set of checks to make sure related sub-projects are compatible (e.g. `compatibility_check`).

For the situation above, there is no easy way to guard the main branch with protected branch schema. The project has to either only define a subset of full CI checks as requirement leaving the main branch less secure or define and run a full list of CI checks for every pull request slowing down merging process.

With **Check Group**, we can add one more CI check that is a combination of CI checks based on sub-projects of interests. The protected branch rule can depend only on the combined check.

To fit the example above into the use case, we can use the following configuration to tell Check Group how to collect required checks:

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
- [Documentation for Developers](https://githubsuperpower.github.io/check-group-dev-doc)
- [WIP tasks](https://github.com/tianhaoz95/check-group/issues?q=is%3Aopen+is%3Aissue+label%3A%22work+in+progress%22)

## Help us host the service

To make sure that the service is reliable, I will need to host it on a paid service.

You can help us out by sponsoring the service at [Buy Me a Coffee](https://www.buymeacoffee.com/jacksonzhou666). Really appreciate your support!

## License

[ISC](LICENSE) © 2020 Tianhao Zhou [tianhaoz@umich.edu](mailto:tianhaoz@umich.edu)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://tianhaoz95.github.io"><img src="https://avatars.githubusercontent.com/u/16887772?v=4?s=100" width="100px;" alt="Tianhao Zhou"/><br /><sub><b>Tianhao Zhou</b></sub></a><br /><a href="https://github.com/tianhaoz95/check-group/commits?author=tianhaoz95" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/jtbeach"><img src="https://avatars.githubusercontent.com/u/12853460?v=4?s=100" width="100px;" alt="Joel Beach"/><br /><sub><b>Joel Beach</b></sub></a><br /><a href="https://github.com/tianhaoz95/check-group/commits?author=jtbeach" title="Code">💻</a> <a href="#ideas-jtbeach" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/kevinheins"><img src="https://avatars.githubusercontent.com/u/6421447?v=4?s=100" width="100px;" alt="Kevin Heins"/><br /><sub><b>Kevin Heins</b></sub></a><br /><a href="#ideas-kevinheins" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://www.linkedin.com/in/paul-jones-b61011143/"><img src="https://avatars.githubusercontent.com/u/30155889?v=4?s=100" width="100px;" alt="Paul Jones"/><br /><sub><b>Paul Jones</b></sub></a><br /><a href="https://github.com/tianhaoz95/check-group/issues?q=author%3Apaulijones" title="Bug reports">🐛</a> <a href="#ideas-paulijones" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="http://thatkookooguy.kibibit.io"><img src="https://avatars.githubusercontent.com/u/10427304?v=4?s=100" width="100px;" alt="Neil Kalman"/><br /><sub><b>Neil Kalman</b></sub></a><br /><a href="https://github.com/tianhaoz95/check-group/issues?q=author%3AThatkookooguy" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://www.linkedin.com/in/christian-theilemann-58339351/"><img src="https://avatars.githubusercontent.com/u/1221897?v=4?s=100" width="100px;" alt="Christian Theilemann"/><br /><sub><b>Christian Theilemann</b></sub></a><br /><a href="https://github.com/tianhaoz95/check-group/commits?author=geekflyer" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!