import afterCreateTest from './afterCreate.test'
import afterUpdateTest from './afterUpdate.test'
import beforeCreateTest from './beforeCreate.test'
import beforeUpdateTest from './beforeUpdate.test'
import countTest from './count.test'
import createTest from './create.test'
import createManyTest from './createMany.test'
import destroyTest from './destroy.test'
import destroyAllTest from './destroyAll.test'
import extendTest from './extend.test'
import findTest from './find.test'
import findAllTest from './findAll.test'
import sumTest from './sum.test'
import updateTest from './update.test'
import updateAllTest from './updateAll.test'
import updateManyTest from './updateMany.test'

import {assert} from 'chai'
import sinon from 'sinon'

assert.equalObjects = function (a, b, m) {
  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || (JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b)))
}

assert.objectsEqual = function (a, b, m) {
  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || (JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b)))
}

let debug = false

assert.debug = function (...args) {
  if (debug) {
    args.forEach(function (arg, i) {
      args[i] = JSON.stringify(arg, null, 2)
    })
    console.log('DEBUG (TEST):', ...args)
  }
}

var prefix = 'TestRunner.init(options): options'

export default {
  init: function (options) {
    options = options || {}
    debug = !!options.debug
    options.hasMethod = function (method) {
      options.methods || (options.methods = 'all')
      options.xmethods || (options.xmethods = [])
      return (options.methods === 'all' || options.methods.indexOf(method) !== -1) && options.xmethods.indexOf(method) === -1
    }
    options.hasFeature = function (feature) {
      options.features || (options.features = 'all')
      options.xfeatures || (options.xfeatures = [])
      return (options.features === 'all' || options.features.indexOf(feature) !== -1) && options.xfeatures.indexOf(feature) === -1
    }
    if (!options.Adapter || typeof options.Adapter !== 'function') {
      throw new Error(prefix + '.Adapter: Expected function, Actual: ' + typeof options.Adapter)
    }
    beforeEach(function () {
      this.$$adapter = new options.Adapter(options.adapterConfig)
      this.$$container = new options.JSData.Container(options.containerConfig || {
        mapperDefaults: {
          debug: false
        }
      })
      this.$$store = new options.JSData.DataStore(options.storeConfig || {
        mapperDefaults: {
          debug: false
        }
      })
      this.$$container.registerAdapter('adapter', this.$$adapter, { 'default': true })
      this.$$store.registerAdapter('adapter', this.$$adapter, { 'default': true })
      var userOptions = {
        name: 'user',
        relations: {
          hasMany: {
            post: {
              localField: 'posts',
              foreignKey: 'userId'
            }
          },
          hasOne: {
            profile: {
              localField: 'profile',
              foreignKey: 'userId'
            },
            address: {
              localField: 'address',
              foreignKey: 'userId'
            }
          },
          belongsTo: {
            organization: {
              localField: 'organization',
              foreignKey: 'organizationId'
            }
          }
        }
      }
      var organizationOptions = {
        name: 'organization',
        relations: {
          hasMany: {
            user: {
              localField: 'users',
              foreignKey: 'organizationId'
            }
          }
        }
      }
      var postOptions = {
        name: 'post',
        relations: {
          belongsTo: {
            user: {
              localField: 'user',
              foreignKey: 'userId'
            }
          },
          hasMany: {
            comment: {
              localField: 'comments',
              foreignKey: 'postId'
            },
            tag: {
              localField: 'tags',
              localKeys: 'tagIds'
            }
          }
        }
      }
      var commentOptions = {
        name: 'comment',
        relations: {
          belongsTo: {
            post: {
              localField: 'post',
              foreignKey: 'postId'
            },
            user: {
              localField: 'user',
              foreignKey: 'userId'
            }
          }
        }
      }
      var tagOptions = {
        name: 'tag',
        relations: {
          hasMany: {
            post: {
              localField: 'posts',
              foreignKeys: 'tagIds'
            }
          }
        }
      }
      this.$$User = this.$$container.defineMapper('user', options.userConfig || options.JSData.utils.copy(userOptions))
      this.$$store.defineMapper('user', options.userConfig || options.JSData.utils.copy(userOptions))
      this.$$Organization = this.$$container.defineMapper('organization', options.organizationConfig || options.JSData.utils.copy(organizationOptions))
      this.$$store.defineMapper('organization', options.organizationConfig || options.JSData.utils.copy(organizationOptions))
      this.$$Profile = this.$$container.defineMapper('profile', options.profileConfig || {})
      this.$$store.defineMapper('profile', options.profileConfig || {})
      this.$$Address = this.$$container.defineMapper('address', options.addressConfig || {})
      this.$$store.defineMapper('address', options.addressConfig || {})
      this.$$Post = this.$$container.defineMapper('post', options.postConfig || options.JSData.utils.copy(postOptions))
      this.$$store.defineMapper('post', options.postConfig || options.JSData.utils.copy(postOptions))
      this.$$Comment = this.$$container.defineMapper('comment', options.commentConfig || options.JSData.utils.copy(commentOptions))
      this.$$store.defineMapper('comment', options.commentConfig || options.JSData.utils.copy(commentOptions))
      this.$$Tag = this.$$container.defineMapper('tag', options.tagConfig || options.JSData.utils.copy(tagOptions))
      this.$$store.defineMapper('tag', options.tagConfig || options.JSData.utils.copy(tagOptions))
      this.toClear = ['User']
    })

    describe('js-data-adapter-tests', function () {
      if (options.hasMethod('beforeCreate')) {
        beforeCreateTest(options)
      }
      if (options.hasMethod('count')) {
        countTest(options)
      }
      if (options.hasMethod('create')) {
        createTest(options)
      }
      if (options.hasMethod('afterCreate')) {
        afterCreateTest(options)
      }
      if (options.hasMethod('createMany')) {
        createManyTest(options)
      }
      if (options.hasMethod('extend')) {
        extendTest(options)
      }
      if (options.hasMethod('find')) {
        findTest(options)
      }
      if (options.hasMethod('findAll')) {
        findAllTest(options)
      }
      if (options.hasMethod('destroy')) {
        destroyTest(options)
      }
      if (options.hasMethod('destroyAll')) {
        destroyAllTest(options)
      }
      if (options.hasMethod('beforeUpdate')) {
        beforeUpdateTest(options)
      }
      if (options.hasMethod('sum')) {
        sumTest(options)
      }
      if (options.hasMethod('update')) {
        updateTest(options)
      }
      if (options.hasMethod('afterUpdate')) {
        afterUpdateTest(options)
      }
      if (options.hasMethod('updateAll')) {
        updateAllTest(options)
      }
      if (options.hasMethod('updateMany')) {
        updateManyTest(options)
      }
    })

    afterEach(async function () {
      const Test = this
      const toClear = []
      if (Test.toClear.indexOf('Tag') !== -1) {
        toClear.push('Tag')
      }
      if (Test.toClear.indexOf('Comment') !== -1) {
        toClear.push('Comment')
      }
      if (Test.toClear.indexOf('Post') !== -1) {
        toClear.push('Post')
      }
      if (Test.toClear.indexOf('Profile') !== -1) {
        toClear.push('Profile')
      }
      if (Test.toClear.indexOf('User') !== -1) {
        toClear.push('User')
      }
      if (Test.toClear.indexOf('Address') !== -1) {
        toClear.push('Address')
      }
      let promise = Promise.resolve()
      toClear.forEach(function (Mapper) {
        promise = promise.then(function () {
          return Test.$$adapter.destroyAll(Test['$$' + Mapper])
        })
      })
      await promise
    })
  },
  assert,
  sinon,
  fail: function (msg) {
    assert.equal('should not reach this!: ' + msg, 'failure')
  },
  TYPES_EXCEPT_STRING: [123, 123.123, null, undefined, {}, [], true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_ARRAY: [123, 123.123, null, undefined, {}, true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_NUMBER: [null, undefined, {}, [], true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_OBJECT: [123, 123.123, null, undefined, [], true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_NUMBER_OBJECT: [null, undefined, [], true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_ARRAY_OR_NUMBER: [null, undefined, {}, true, false, function () {
  }],
  TYPES_EXCEPT_NUMBER: ['string', null, undefined, {}, [], true, false, function () {
  }],
  TYPES_EXCEPT_OBJECT: ['string', 123, 123.123, null, undefined, true, false, function () {
  }],
  TYPES_EXCEPT_BOOLEAN: ['string', 123, 123.123, null, undefined, {}, [], function () {
  }],
  TYPES_EXCEPT_FUNCTION: ['string', 123, 123.123, null, undefined, {}, [], true, false]
}
