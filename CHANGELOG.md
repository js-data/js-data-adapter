##### 1.0.0 - 02 July 2017

**1.0.0 stable release, now depending on js-data@3.0.0**

##### 0.8.5 - 01 July 2017

- Upgrade build process

##### 0.8.4 - 01 July 2017

- Upgraded dependencies
- [#10](https://github.com/js-data/js-data-adapter/pull/10) - fix(adapter): moves loadRelationsFor logic into separate method

##### 0.8.3 - 07 November 2016

- Upgraded dependencies

##### 0.8.2 - 15 August 2016

###### Bug fixes
- #6 - Remove references to mock by @nvahalik

##### 0.8.1 - 13 August 2016

###### Bug fixes
- Options weren't being passed to the `Component` constructor

##### 0.8.0 - 10 August 2016

###### Breaking changes
- Requiring latest rc of js-data

###### Backwards compatible changes
- Updated dependencies

###### Bug fixes
- #4, #5 response metadata not getting passed to findAll by @nickescallon

##### 0.7.4 - 07 July 2016

###### Backwards compatible changes
- Updated dependencies

##### 0.7.3 - 25 May 2016

###### Bug fixes
- Relations specified by `opts.with` weren't being passed through

##### 0.7.2 - 17 May 2016

###### Bug fixes
- Improve findAllGroupedWhere test

###### Other
- Tweak deps

##### 0.7.1 - 16 May 2016

###### Bug fixes
- Fix for findAll tests

##### 0.7.0 - 16 May 2016

###### Breaking changes
- Added tests for grouped "where" clauses. Flag: `findAllGroupedWhere`

###### Other
- Moved general adapter tests into this project

##### 0.6.2 - 13 May 2016

###### Bug fixes
- Fixed typo in js-data-adapter.d.ts

##### 0.6.1 - 30 April 2016

- Fixed missing uses of `withoutRelations(...)`

##### 0.6.0 - 29 April 2016

- Fixed some comments
- Updated some dependencies

##### 0.5.0 - 27 April 2016

###### Breaking changes
- `dist/js-data-adapter.d.ts` is now is ES6 module format

###### Backwards compatible changes
- Added `typings` field to `package.json`
- Added `typings.json`

##### 0.4.0 - 27 April 2016

- Added Typescript definitions
- Moved dist files to another branch

##### 0.3.0 - 17 April 2016

Updated for js-data v3 beta

##### 0.2.4 - 17 March 2016

Re-worked use of js-data utils

##### 0.2.3 - 17 March 2016

Added count and sum methods

##### 0.2.2 - 12 March 2016

Added support for filtering on "with" sub queries

##### 0.2.1 - 10 March 2016

Fix for localKeys

##### 0.2.0 - 10 March 2016

Pulled a lot more common adapter functionality into js-data-adapter.

##### 0.1.4 - 09 March 2016

Fix for loadHasMany

##### 0.1.3 - 08 March 2016

Fix for Response class

##### 0.1.2 - 06 March 2016

Added makeHasManyForeignKeys

##### 0.1.1 - 06 March 2016

Fixed a comment. Upgraded js-data-repo-tools.

##### 0.1.0 - 06 March 2016

Initial release
