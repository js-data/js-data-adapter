import * as chai from 'chai'
import MockAdapter from './mockAdapter'
import { Container, DataStore, utils } from 'js-data'
import AssertStatic = Chai.AssertStatic

const assert: AssertStatic | any = chai.assert

assert.equalObjects = function (a, b, m) {
  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || (JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b)))
}

assert.objectsEqual = function (a, b, m) {
  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || (JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b)))
}

let debug = false

const options: any = {}
debug = !!options.debug

assert.debug = function (...args) {
  if (debug) {
    args.forEach((arg, i) => {
      args[i] = JSON.stringify(arg, null, 2)
    })
    console.log('DEBUG (TEST):', ...args)
  }
}

options.hasMethod = method => {
  options.methods || (options.methods = 'all')
  options.xmethods || (options.xmethods = [])
  return (options.methods === 'all' || options.methods.indexOf(method) !== -1) && options.xmethods.indexOf(method) === -1
}

options.xfeatures = [
  'findAllLikeOp',
  'filterOnRelations',
  'findAllOpNotFound'
]

options.hasFeature = function (feature) {
  options.features || (options.features = 'all')
  options.xfeatures || (options.xfeatures = [])
  return (options.features === 'all' || options.features.indexOf(feature) !== -1) && options.xfeatures.indexOf(feature) === -1
}

export { assert, options }

beforeEach(function () {
  this.$$adapter = new MockAdapter()
  this.$$container = new Container(options.containerConfig || {
    mapperDefaults: {
      debug: false
    }
  })
  this.$$store = new DataStore(options.storeConfig || {
    mapperDefaults: {
      debug: false
    }
  })
  this.$$container.registerAdapter('adapter', this.$$adapter, { default: true })
  this.$$store.registerAdapter('adapter', this.$$adapter, { default: true })
  const userOptions = {
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
  const organizationOptions = {
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
  const postOptions = {
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
  const commentOptions = {
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
  const tagOptions = {
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
  this.$$User = this.$$container.defineMapper('user', utils.copy(userOptions))
  this.$$store.defineMapper('user', utils.copy(userOptions))
  this.$$Organization = this.$$container.defineMapper('organization', utils.copy(organizationOptions))
  this.$$store.defineMapper('organization', utils.copy(organizationOptions))
  this.$$Profile = this.$$container.defineMapper('profile')
  this.$$store.defineMapper('profile')
  this.$$Address = this.$$container.defineMapper('address')
  this.$$store.defineMapper('address')
  this.$$Post = this.$$container.defineMapper('post', utils.copy(postOptions))
  this.$$store.defineMapper('post', utils.copy(postOptions))
  this.$$Comment = this.$$container.defineMapper('comment', utils.copy(commentOptions))
  this.$$store.defineMapper('comment', utils.copy(commentOptions))
  this.$$Tag = this.$$container.defineMapper('tag', utils.copy(tagOptions))
  this.$$store.defineMapper('tag', utils.copy(tagOptions))
  this.toClear = ['User']
})

afterEach(async function () {
  const toClear = []
  if (this.toClear.indexOf('Tag') !== -1) {
    toClear.push('Tag')
  }
  if (this.toClear.indexOf('Comment') !== -1) {
    toClear.push('Comment')
  }
  if (this.toClear.indexOf('Post') !== -1) {
    toClear.push('Post')
  }
  if (this.toClear.indexOf('Profile') !== -1) {
    toClear.push('Profile')
  }
  if (this.toClear.indexOf('User') !== -1) {
    toClear.push('User')
  }
  if (this.toClear.indexOf('Address') !== -1) {
    toClear.push('Address')
  }
  let promise = Promise.resolve()
  toClear.forEach((Mapper) => {
    promise = promise.then(() => {
      return this.$$adapter.destroyAll(this[`$$${Mapper}`])
    })
  })
  await promise
})
