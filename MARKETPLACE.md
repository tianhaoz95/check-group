# Marketplace

This file is for keeping an record of the information I filled for the GitHub Marketplace listing.

## Introductory description

**Check Group** groups CI checks based on the sub-projects (in monorepo projects) and converts all required checks into one for simplicity (and to work with protected branch).

## Detailed description

For example, a monorepo project can define that changes checked into documentation (e.g. files in `docs/**.md`) should pass a set of checks (e.g. `markdown lint`, `github_pages_build`), and changes checked into mobile app source (e.g. files in `clients/app/**.dart`) should pass another set of checks (e.g. `app_unit_tests`, `app_integration_test`) before merging. It's also possible to have a set of checks to check sub-projects' compatiblity (e.g. `compatibility_check`).

The example above can use the following to combine all requirements into a single check:

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
