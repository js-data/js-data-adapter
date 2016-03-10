/*global assert:true */
'use strict'

// prepare environment for js-data-adapter-tests
require('babel-polyfill')

var JSData = require('js-data')
var JSDataAdapterTests = require('js-data-adapter-tests')
var MockAdapter = require('./test/mockAdapter')

global.assert = JSDataAdapterTests.assert
global.sinon = JSDataAdapterTests.sinon

JSDataAdapterTests.init({
  debug: false,
  JSData: JSData,
  Adapter: MockAdapter,
  adapterConfig: {},
  // Mock adapter does not support these features
  xfeatures: [
    'findAllLikeOp',
    'filterOnRelations',
    'findAllOpNotFound'
  ]
})
