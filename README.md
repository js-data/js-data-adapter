<img src="https://raw.githubusercontent.com/js-data/js-data/master/js-data.png" alt="js-data logo" title="js-data" align="right" width="96" height="96" />

# js-data-adapter

[![Slack Status][sl_b]][sl_l]
[![npm version][npm_b]][npm_l]
[![npm downloads][dn_b]][dn_l]

Base adapter class that all other js-data adapters extend.

Refer to the various js-data adapter repositories to see how they extend
`Adapter`.

## Table of contents

* [Quick start](#quick-start)
* [Community](#community)
* [Support](#support)
* [Contributing](#contributing)
* [License](#license)

## Quick Start

##### Browser-based adapter
```
npm i --save js-data
npm i --save-dev js-data-adapter
```

##### Node.js based adapter
```
npm i --save js-data js-data-adapter
```

Now extend the adapter:

```js
// ES6
class MyAdapter extends Adapter {}
```

```js
// Use Adapter.extend
var MyAdapter = Adapter.extend()
```

```js
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


## Community

[Explore the Community](http://js-data.io/docs/community).

## Support

[Find out how to Get Support](http://js-data.io/docs/support).

## Contributing

[Read the Contributing Guide](http://js-data.io/docs/contributing).

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
