# Contributing
Thanks for your interest in contributing to the Emerald Framework! :tada:

Please read this doc before starting to use this repo. We have a set of guidelines that should be followed.  

Feel free to propose changes to this document using a pull request.

## Contributing Etiquette

Please see our [Contributor Code of Conduct](https://github.com/stone-payments/emerald-web-framework/blob/master/CODE_OF_CONDUCT.md) for information on our rules of conduct.

## Setup

1. Fork the repo.
2. Clone your fork.
3. Change from `master` to `develop` branch.
3. Make a branch for your change.
4. Run `npm install` (make sure you have [node](https://nodejs.org/en/) and [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm) installed first)

### Modifying Components

1. Make any changes to the component.
2. Modify the tests in the `Component.test.js` file in the same directory, if possible. If the test does not exist and it is possible to show the change, please create a new test file.

### Viewing Changes

1. Run `npm start my-emerald-component` on the root of the project
2. A browser should open at `http://localhost:8080/`. From here you can see the changes. This page have auto-reload feature, so you can see any modification in real time.
4. If your changes look good, you're ready to [commit](#committing)!

See on the [Wiki](https://github.com/stone-payments/emerald-web-framework/wiki/Available-Scripts) all the available scripts that you can use for developing a component.

## Git Workflow
### Committing
We have very precise rules on how our git commit messages should be formatted. This leads to readable messages that are easy to follow when looking through the project history. We also use the git commit messages to generate our changelog and releases.

We use [conventional commits](https://conventionalcommits.org/) as a guideline for merging commits. A typical commit message looks like this:
`type: subject` or `type(scope): subject`

#### Type

Must be one of the following:

- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation only changes
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **perf:** A code change that improves performance
- **test:** Adding missing tests
- **chore:** Changes to the build process or auxiliary tools and libraries such as documentation generation
- **BREAKING CHANGE:** a commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with MAJOR in semantic versioning). A breaking change can be part of commits of any type. e.g., a fix:, feat: & chore: types would all be valid, in addition to any other type.

#### Scope
A scope may be provided to a commit’s type, to provide additional contextual information and is contained within parenthesis, e.g., feat(parser): add ability to parse arrays.

Commit clear messages, in **english**, to describe every single change in your branch. We also recommend using [Commitizen CLI](http://commitizen.github.io/cz-cli/) for write better commits.

### Branching

We use [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/) when naming your branches. As a *tl;dr*, do this:

- ```feature/feature-name``` to new features.  
- ```fix/bug-name``` to fix bugs.  
- ```improvement/improvement-name``` to improvement code.  

## Creating an Issue

* If you have a question about using the framework, please read all your docs and wiki before opening an issue.

* It is required that you clearly describe the steps necessary to reproduce the issue you are running into. Although we would love to help our users as much as possible, diagnosing issues without clear reproduction steps is extremely time-consuming and simply not sustainable.

* The issue list of this repository is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately.

* Issues with no clear steps to reproduce will not be triggered. If an issue is labeled with "needs reply" and receives no further replies from the author of the issue for more than 5 days, it will be closed.

* If you think you have found a bug, or have a new feature idea, please start by making sure it hasn't already been [reported](https://github.com/stone-payments/emerald-web-framework/issues?utf8=%E2%9C%93&q=is%3Aissue). You can search through existing issues to see if there is a similar one reported. Include closed issues as it may have been closed with a solution.

* Next, [create a new issue](https://github.com/stone-payments/emerald-web-framework/issues/new) that thoroughly explains the problem. Please fill out the populated issue form before submitting the issue.

## Creating a Pull Request
* We appreciate you taking the time to contribute! Before submitting a pull request, we ask that you please [create an issue](#creating-an-issue) that explains the bug or feature request and let us know that you plan on creating a pull request for it. If an issue already exists, please comment on that issue letting us know you would like to submit a pull request for it. This helps us to keep track of the pull request and make sure there isn't duplicated effort.

* All pull requests must be made to the `develop` branch. Never on the `master`. We only change the `master` branch when a release is made.

* After you make a pull request, your CI will run over your code. Make sure that evereyhing passes and change your code if needed.

* Looking for an issue to fix? Make sure to look through our issues with the [help wanted](https://github.com/stone-payments/emerald-web-framework/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) label!

## License
By contributing your code to the `stone-payments/emerald-web-framework` GitHub Repository, you agree to license your contribution under the Apache License 2.0.
