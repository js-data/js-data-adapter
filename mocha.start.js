/*global assert:true */
'use strict'

// prepare environment for js-data-adapter-tests
import 'babel-polyfill'

import * as JSData from 'js-data'
import JSDataAdapterTests from './test/index'
import MockAdapter from './test/mockAdapter'

global.assert = JSDataAdapterTests.assert
global.sinon = JSDataAdapterTests.sinon

console.log(`Testing with JSData v${JSData.version.full}`)

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
