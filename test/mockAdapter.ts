import { Adapter } from '../src'

import { Collection, utils } from 'js-data'

const deepMixIn = utils.deepMixIn
const isUndefined = utils.isUndefined
const plainCopy = utils.plainCopy

const collections = {}
let currentId = 1

function getId () {
  currentId++
  return '' + currentId
}

function getCollection (mapper) {
  if (collections[mapper.name]) {
    return collections[mapper.name]
  }
  return collections[mapper.name] = new Collection([], { mapper: mapper })
}

function makeResult () {
  return { mock: true }
}

export default class MockAdapter extends Adapter {
  _count (mapper, query) {
    const collection = getCollection(mapper)
    const records = collection.filter(query || {})
    return [records.length, makeResult()]
  }

  _create (mapper, props) {
    props = plainCopy(props)
    if (isUndefined(props[mapper.idAttribute])) {
      props[mapper.idAttribute] = getId()
    }
    const created = JSON.parse(JSON.stringify(props))
    getCollection(mapper).add(created)
    return [created, makeResult()]
  }

  _createMany (mapper, props) {
    props = plainCopy(props)
    const created = []
    props.forEach((_props) => {
      if (isUndefined(_props[mapper.idAttribute])) {
        _props[mapper.idAttribute] = getId()
      }
      created.push(JSON.parse(JSON.stringify(_props)))
    })
    getCollection(mapper).add(created)
    return [created, makeResult()]
  }

  _destroy (mapper, id) {
    getCollection(mapper).remove(id)
    return [undefined, makeResult()]
  }

  _destroyAll (mapper, query) {
    const collection = getCollection(mapper)
    const records = collection.filter(query || {})
    records.forEach((record) => {
      collection.remove(record[mapper.idAttribute])
    })
    return [undefined, makeResult()]
  }

  _find (mapper, id) {
    return [getCollection(mapper).get(id), makeResult()]
  }

  _findAll (mapper, query) {
    return [getCollection(mapper).filter(query || {}), makeResult()]
  }

  _sum (mapper, field, query) {
    const collection = getCollection(mapper)
    const records = collection.filter(query || {})
    let sum = 0
    records.forEach((record) => {
      sum += record[field] || 0
    })

    return [sum, makeResult()]
  }

  _update (mapper, id, props) {
    props = plainCopy(props)
    const record = getCollection(mapper).get(id)
    if (record) {
      deepMixIn(record, props || {})
    } else {
      throw new Error('Not Found')
    }
    return [record, makeResult()]
  }

  _updateAll (mapper, props, query) {
    props = plainCopy(props)
    const records = getCollection(mapper).filter(query || {})
    records.forEach((record) => {
      deepMixIn(record, props || {})
    })
    return [records, makeResult()]
  }

  _updateMany (mapper, records) {
    const collection = getCollection(mapper)
    records || (records = [])
    records.forEach((record, i) => {
      records[i] = collection.add(record)
    })
    return [records, makeResult()]
  }
}
