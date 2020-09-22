# Check Group

Groups CI checks based on the sub-projects a pull request touches for monorepo projects.

## Getting started

### GitHub

The app is available on the GitHub Marketplace.

The app can be configured with `.github/checkgroup.yml`. Here's an example:

```yml
subprojects:
  - id: generic
    paths:
      - "**"
    checks:
      - "generic_checks"
  - id: documentation
    paths:
      - "docs/**"
    checks:
      - "markdown_linter"
      - "github_page"
```

The configuration above tells the app to look for check with name `generic_check` for all files (alternatively, global checks can be listed as protected branch requirements depending on preference) and checks with name `markdown_linter` and `github_page` if any file located in `docs` are modified.

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
