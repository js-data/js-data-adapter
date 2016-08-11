var Adapter = require('../src/index').Adapter
var JSData = require('js-data')
var Collection = JSData.Collection
var utils = JSData.utils
var extend = utils.extend
var addHiddenPropsToTarget = utils.addHiddenPropsToTarget
var deepMixIn = utils.deepMixIn
var isUndefined = utils.isUndefined
var plainCopy = utils.plainCopy

export default function MockAdapter (opts) {
  Adapter.call(this, opts)
}

// Setup prototype inheritance from Adapter
MockAdapter.prototype = Object.create(Adapter.prototype, {
  constructor: {
    value: MockAdapter,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

Object.defineProperty(MockAdapter, '__super__', {
  configurable: true,
  value: Adapter
})

MockAdapter.extend = extend

var collections = {}
var currentId = 1

function getId () {
  currentId++
  return '' + currentId
}

function getCollection (mapper) {
  if (collections[mapper.name]) {
    return collections[mapper.name]
  }
  var collection = collections[mapper.name] = new Collection([], { mapper: mapper })
  return collection
}

function makeResult () {
  return { mock: true }
}

addHiddenPropsToTarget(MockAdapter.prototype, {
  _count: function (mapper, query) {
    var collection = getCollection(mapper)
    var records = collection.filter(query || {})
    return [records.length, makeResult()]
  },
  _create: function (mapper, props) {
    props = plainCopy(props)
    if (isUndefined(props[mapper.idAttribute])) {
      props[mapper.idAttribute] = getId()
    }
    var created = JSON.parse(JSON.stringify(props))
    getCollection(mapper).add(created)
    return [created, makeResult()]
  },
  _createMany: function (mapper, props) {
    props = plainCopy(props)
    var created = []
    props.forEach(function (_props) {
      if (isUndefined(_props[mapper.idAttribute])) {
        _props[mapper.idAttribute] = getId()
      }
      created.push(JSON.parse(JSON.stringify(_props)))
    })
    getCollection(mapper).add(created)
    return [created, makeResult()]
  },
  _destroy: function (mapper, id) {
    getCollection(mapper).remove(id)
    return [undefined, makeResult()]
  },
  _destroyAll: function (mapper, query) {
    var collection = getCollection(mapper)
    var records = collection.filter(query || {})
    records.forEach(function (record) {
      collection.remove(record[mapper.idAttribute])
    })
    return [undefined, makeResult()]
  },
  _find: function (mapper, id) {
    return [getCollection(mapper).get(id), makeResult()]
  },
  _findAll: function (mapper, query) {
    return [getCollection(mapper).filter(query || {}), makeResult()]
  },
  _sum: function (mapper, field, query) {
    var collection = getCollection(mapper)
    var records = collection.filter(query || {})
    var sum = 0
    records.forEach(function (record) {
      sum += record[field] || 0
    })

    return [sum, makeResult()]
  },
  _update: function (mapper, id, props) {
    props = plainCopy(props)
    var record = getCollection(mapper).get(id)
    if (record) {
      deepMixIn(record, props || {})
    } else {
      throw new Error('Not Found')
    }
    return [record, makeResult()]
  },
  _updateAll: function (mapper, props, query) {
    props = plainCopy(props)
    var records = getCollection(mapper).filter(query || {})
    records.forEach(function (record) {
      deepMixIn(record, props || {})
    })
    return [records, makeResult()]
  },
  _updateMany: function (mapper, records) {
    var collection = getCollection(mapper)
    records || (records = [])
    records.forEach(function (record, i) {
      records[i] = collection.add(record)
    })
    return [records, makeResult()]
  }
})
