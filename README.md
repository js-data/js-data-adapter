<img src="https://raw.githubusercontent.com/js-data/js-data/master/js-data.png" alt="js-data logo" title="js-data" align="right" width="96" height="96" />

# js-data-adapter

[![Slack Status][sl_b]][sl_l]
[![npm version][npm_b]][npm_l]
[![npm downloads][dn_b]][dn_l]
[![build][circle_b]][circle_l]
[![coverage][cov_b]][cov_l]

Base adapter class that all other JSData adapters extend.

Refer to the various JSData adapter repositories to see how they extend `Adapter`.

## Usage

##### Browser-based adapter
```
npm i --save js-data js-data-adapter
```

##### Node.js based adapter
```
npm i --save js-data js-data-adapter
```

Now extend the adapter:

```js
import {Adapter} from 'js-data-adapter'
// ES6
class MyAdapter extends Adapter {}
```

```js
var Adapter = require('js-data-adapter').Adapter
// Use Adapter.extend
var MyAdapter = Adapter.extend()
```

```js
var Adapter = require('js-data-adapter').Adapter

// Manually extend
function MyAdapter (opts) {
  Adapter.call(this, opts)
}

// Setup prototype inheritance from Adapter
MyAdapter.prototype = Object.create(Adapter.prototype, {
  constructor: {
    value: MyAdapter,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

Object.defineProperty(MyAdapter, '__super__', {
  configurable: true,
  value: Adapter
})
```

## Links

* [Guides and Tutorials](http://www.js-data.io/v3.0/docs/home) - Learn how to use JSData
* [API Reference Docs](http://api.js-data.io) - Explore components, methods, options, etc.
* [Community & Support](http://js-data.io/docs/community) - Find solutions and chat with the community
* [General Contributing Guide](http://js-data.io/docs/contributing) - Give back and move the project forward
  * [Contributing to js-data-adapter](https://github.com/js-data/js-data-adapter/blob/master/.github/CONTRIBUTING.md)

## License

The MIT License (MIT)

Copyright (c) 2016 js-data-adapter project authors

* [LICENSE](https://github.com/js-data/js-data-adapter/blob/master/LICENSE)
* [AUTHORS](https://github.com/js-data/js-data-adapter/blob/master/AUTHORS)
* [CONTRIBUTORS](https://github.com/js-data/js-data-adapter/blob/master/CONTRIBUTORS)

[sl_b]: http://slack.js-data.io/badge.svg
[sl_l]: http://slack.js-data.io
[npm_b]: https://img.shields.io/npm/v/js-data-adapter.svg?style=flat
[npm_l]: https://www.npmjs.org/package/js-data-adapter
[dn_b]: https://img.shields.io/npm/dm/js-data-adapter.svg?style=flat
[dn_l]: https://www.npmjs.org/package/js-data-adapter
[circle_b]: https://img.shields.io/circleci/project/js-data/js-data-adapter.svg?style=flat
[circle_l]: https://circleci.com/gh/js-data/js-data-adapter
[cov_b]: https://img.shields.io/codecov/c/github/js-data/js-data-adapter.svg?style=flat
[cov_l]: https://codecov.io/gh/js-data/js-data-adapter
