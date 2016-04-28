# Contributing to js-data-adapter

[Read the general Contributing Guide](http://js-data.io/docs/contributing).

## Project structure

* `dist/` - Contains final build files for distribution
* `src/` - Project source code
* `test/` - Project tests

## Clone, build & test

1. `clone git@github.com:js-data/js-data-adapter.git`
1. `cd js-data-adapter`
1. `npm i && npm i js-data@beta`
1. `npm test` (Build and test)

## To cut a release

1. Checkout master
1. Bump version in `package.json` appropriately
1. Run `npm run release`
1. Update `CHANGELOG.md` appropriately
1. Commit and push changes
1. Checkout `release`, merge `master` into `release`
1. Commit and push changes
1. Make a GitHub release
  - tag from `release` branch
  - set tag name to version
  - set release name to version
  - set release body to changelog entry for the version
  - upload the files in the `dist/` folder
1. `npm publish .`
1. checkout `master`

See also [Community & Support](http://js-data.io/docs/community).
