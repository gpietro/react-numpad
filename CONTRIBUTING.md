# Contributing

Thanks for your interest in React-NumPad. All forms of contribution are
welcome, from issue reports to PRs and documentation / write-ups.

Before you open a PR:

* If you're planning to add or change a major feature in a PR, please ensure
the change is aligned with the project roadmap by opening an issue first,
especially if you're going to spend a lot of time on it.
* In development, run `npm start` and `npm run storybook`to build (+watch) the project source, and run
the [development server](http://localhost:6006).
* Please ensure all the examples work correctly after your change. If you're
adding a major new use-case, add a new example demonstrating its use.
* Please **do not** commit the build files. Make sure **only** your changes to
`/src/`, `/less/` and `/examples/src` are included in your PR.
* Be careful to follow the code style of the project. Run `npm run lint` after
your changes and ensure you do not introduce any new errors or warnings.

* Ensure that your effort is aligned with the project's roadmap by talking to
the maintainers, especially if you are going to spend a lot of time on it.
* Make sure there's an issue open for any work you take on and intend to submit
as a pull request - it helps core members review your concept and direction
early and is a good way to discuss what you're planning to do.
* If you open an issue and are interested in working on a fix, please let us
know. We'll help you get started, rather than adding it to the queue.
* Make sure you do not add regressions by running `npm test`.
* Where possible, include tests with your changes, either that demonstrates the
bug, or tests the new functionality. If you're not sure how to test your
changes, feel free to ping @bruderstein
* All new features and changes need documentation.

* _Make sure you revert your build before submitting a PR_ to reduce the chance
of conflicts. `npm run build` is run after PRs are merged and before any
releases are made.