import {utils} from 'js-data'

const {
  addHiddenPropsToTarget,
  extend,
  fillIn,
  get,
  isArray,
  isObject,
  isUndefined,
  plainCopy,
  resolve
} = utils

export const reserved = [
  'orderBy',
  'sort',
  'limit',
  'offset',
  'skip',
  'where'
]

const noop = function (...args) {
  const self = this
  const opts = args[args.length - 1]
  self.dbg(opts.op, ...args)
  return resolve()
}

const noop2 = function (...args) {
  const self = this
  const opts = args[args.length - 2]
  self.dbg(opts.op, ...args)
  return resolve()
}

const DEFAULTS = {
  /**
   * Whether to log debugging information.
   *
   * @name Adapter#debug
   * @type {boolean}
   * @default false
   */
  debug: false,

  /**
   * Whether to return a more detailed response object.
   *
   * @name Adapter#raw
   * @type {boolean}
   * @default false
   */
  raw: false
}

/**
 * Response object used when `raw` is `true`. May contain other fields in
 * addition to `data`.
 *
 * @typedef {Object} Response
 * @property {Object} data Response data.
 * @property {string} op The operation for which the response was created.
 */

export function Response (data, meta, op) {
  const self = this
  meta || (meta = {})
  self.data = data
  fillIn(self, meta)
  self.op = op
}

/**
 * Abstract class meant to be extended by adapters.
 *
 * @class Adapter
 * @abstract
 * @param {Object} [opts] Configuration opts.
 * @param {boolean} [opts.debug=false] Whether to log debugging information.
 * @param {boolean} [opts.raw=false] Whether to return a more detailed response
 * object.
 */
export default function Adapter (opts) {
  const self = this
  opts || (opts = {})
  fillIn(opts, DEFAULTS)
  fillIn(self, opts)
}

/**
 * Alternative to ES6 class syntax for extending `Adapter`.
 *
 * @name Adapter.extend
 * @method
 * @param {Object} [instanceProps] Properties that will be added to the
 * prototype of the subclass.
 * @param {Object} [classProps] Properties that will be added as static
 * properties to the subclass itself.
 * @return {Object} Subclass of `Adapter`.
 */
Adapter.extend = extend

addHiddenPropsToTarget(Adapter.prototype, {
  /**
   * Lifecycle method method called by <a href="#create__anchor">create</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#create__anchor">create</a> to wait for the Promise to resolve before continuing.
   *
   * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the created record.
   *
   * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#create__anchor">create</a>.
   *
   * @name Adapter#afterCreate
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#create__anchor">create</a>.
   * @param {Object} props The `props` argument passed to <a href="#create__anchor">create</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#create__anchor">create</a>.
   * @property {string} opts.op `afterCreate`
   * @param {Object|Response} response Created record or {@link Response}, depending on the value of `opts.raw`.
   */
  afterCreate: noop2,

  /**
   * Lifecycle method method called by <a href="#createMany__anchor">createMany</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#createMany__anchor">createMany</a> to wait for the Promise to resolve before continuing.
   *
   * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the created records.
   *
   * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#createMany__anchor">createMany</a>.
   *
   * @name Adapter#afterCreate
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#createMany__anchor">createMany</a>.
   * @param {Object[]} props The `props` argument passed to <a href="#createMany__anchor">createMany</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#createMany__anchor">createMany</a>.
   * @property {string} opts.op `afterCreateMany`
   * @param {Object[]|Response} response Created records or {@link Response}, depending on the value of `opts.raw`.
   */
  afterCreateMany: noop2,

  /**
   * Lifecycle method method called by <a href="#destroy__anchor">destroy</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#destroy__anchor">destroy</a> to wait for the Promise to resolve before continuing.
   *
   * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be `undefined`.
   *
   * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroy__anchor">destroy</a>.
   *
   * @name Adapter#afterDestroy
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#destroy__anchor">destroy</a>.
   * @param {(string|number)} id The `id` argument passed to <a href="#destroy__anchor">destroy</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#destroy__anchor">destroy</a>.
   * @property {string} opts.op `afterDestroy`
   * @param {undefined|Response} response `undefined` or {@link Response}, depending on the value of `opts.raw`.
   */
  afterDestroy: noop2,

  /**
   * Lifecycle method method called by <a href="#destroyAll__anchor">destroyAll</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#destroyAll__anchor">destroyAll</a> to wait for the Promise to resolve before continuing.
   *
   * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be `undefined`.
   *
   * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroyAll__anchor">destroyAll</a>.
   *
   * @name Adapter#afterDestroyAll
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
   * @param {Object} query The `query` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
   * @property {string} opts.op `afterDestroyAll`
   * @param {undefined|Response} response `undefined` or {@link Response}, depending on the value of `opts.raw`.
   */
  afterDestroyAll: noop2,

  /**
   * Lifecycle method method called by <a href="#find__anchor">find</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#find__anchor">find</a> to wait for the Promise to resolve before continuing.
   *
   * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the found record, if any.
   *
   * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#find__anchor">find</a>.
   *
   * @name Adapter#afterFind
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#find__anchor">find</a>.
   * @param {(string|number)} id The `id` argument passed to <a href="#find__anchor">find</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#find__anchor">find</a>.
   * @property {string} opts.op `afterFind`
   * @param {Object|Response} response The found record or {@link Response}, depending on the value of `opts.raw`.
   */
  afterFind: noop2,

  /**
   * Lifecycle method method called by <a href="#findAll__anchor">findAll</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#findAll__anchor">findAll</a> to wait for the Promise to resolve before continuing.
   *
   * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the found records, if any.
   *
   * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#findAll__anchor">findAll</a>.
   *
   * @name Adapter#afterFindAll
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#findAll__anchor">findAll</a>.
   * @param {Object} query The `query` argument passed to <a href="#findAll__anchor">findAll</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#findAll__anchor">findAll</a>.
   * @property {string} opts.op `afterFindAll`
   * @param {Object[]|Response} response The found records or {@link Response}, depending on the value of `opts.raw`.
   */
  afterFindAll: noop2,

  /**
   * Lifecycle method method called by <a href="#update__anchor">update</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#update__anchor">update</a> to wait for the Promise to resolve before continuing.
   *
   * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the updated record.
   *
   * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#update__anchor">update</a>.
   *
   * @name Adapter#afterUpdate
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#update__anchor">update</a>.
   * @param {(string|number)} id The `id` argument passed to <a href="#update__anchor">update</a>.
   * @param {Object} props The `props` argument passed to <a href="#update__anchor">update</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#update__anchor">update</a>.
   * @property {string} opts.op `afterUpdate`
   * @param {Object|Response} response The updated record or {@link Response}, depending on the value of `opts.raw`.
   */
  afterUpdate: noop2,

  /**
   * Lifecycle method method called by <a href="#updateAll__anchor">updateAll</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#updateAll__anchor">updateAll</a> to wait for the Promise to resolve before continuing.
   *
   * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the updated records, if any.
   *
   * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateAll__anchor">updateAll</a>.
   *
   * @name Adapter#afterUpdateAll
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#updateAll__anchor">updateAll</a>.
   * @param {Object} props The `props` argument passed to <a href="#updateAll__anchor">updateAll</a>.
   * @param {Object} query The `query` argument passed to <a href="#updateAll__anchor">updateAll</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#updateAll__anchor">updateAll</a>.
   * @property {string} opts.op `afterUpdateAll`
   * @param {Object[]|Response} response The updated records or {@link Response}, depending on the value of `opts.raw`.
   */
  afterUpdateAll: noop2,

  /**
   * Lifecycle method method called by <a href="#updateMany__anchor">updateMany</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#updateMany__anchor">updateMany</a> to wait for the Promise to resolve before continuing.
   *
   * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the updated records, if any.
   *
   * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateMany__anchor">updateMany</a>.
   *
   * @name Adapter#afterUpdateMany
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#updateMany__anchor">updateMany</a>.
   * @param {Object[]} records The `records` argument passed to <a href="#updateMany__anchor">updateMany</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#updateMany__anchor">updateMany</a>.
   * @property {string} opts.op `afterUpdateMany`
   * @param {Object[]|Response} response The updated records or {@link Response}, depending on the value of `opts.raw`.
   */
  afterUpdateMany: noop2,

  /**
   * Lifecycle method method called by <a href="#create__anchor">create</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#create__anchor">create</a> to wait for the Promise to resolve before continuing.
   *
   * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#create__anchor">create</a>.
   *
   * @name Adapter#beforeCreate
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#create__anchor">create</a>.
   * @param {Object} props The `props` argument passed to <a href="#create__anchor">create</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#create__anchor">create</a>.
   * @property {string} opts.op `beforeCreate`
   */
  beforeCreate: noop,

  /**
   * Lifecycle method method called by <a href="#createMany__anchor">createMany</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#createMany__anchor">createMany</a> to wait for the Promise to resolve before continuing.
   *
   * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#createMany__anchor">createMany</a>.
   *
   * @name Adapter#beforeCreateMany
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#createMany__anchor">createMany</a>.
   * @param {Object[]} props The `props` argument passed to <a href="#createMany__anchor">createMany</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#createMany__anchor">createMany</a>.
   * @property {string} opts.op `beforeCreateMany`
   */
  beforeCreateMany: noop,

  /**
   * Lifecycle method method called by <a href="#destroy__anchor">destroy</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#destroy__anchor">destroy</a> to wait for the Promise to resolve before continuing.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroy__anchor">destroy</a>.
   *
   * @name Adapter#beforeDestroy
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#destroy__anchor">destroy</a>.
   * @param {(string|number)} id The `id` argument passed to <a href="#destroy__anchor">destroy</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#destroy__anchor">destroy</a>.
   * @property {string} opts.op `beforeDestroy`
   */
  beforeDestroy: noop,

  /**
   * Lifecycle method method called by <a href="#destroyAll__anchor">destroyAll</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#destroyAll__anchor">destroyAll</a> to wait for the Promise to resolve before continuing.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroyAll__anchor">destroyAll</a>.
   *
   * @name Adapter#beforeDestroyAll
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
   * @param {Object} query The `query` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
   * @property {string} opts.op `beforeDestroyAll`
   */
  beforeDestroyAll: noop,

  /**
   * Lifecycle method method called by <a href="#find__anchor">find</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#find__anchor">find</a> to wait for the Promise to resolve before continuing.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#find__anchor">find</a>.
   *
   * @name Adapter#beforeFind
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#find__anchor">find</a>.
   * @param {(string|number)} id The `id` argument passed to <a href="#find__anchor">find</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#find__anchor">find</a>.
   * @property {string} opts.op `beforeFind`
   */
  beforeFind: noop,

  /**
   * Lifecycle method method called by <a href="#findAll__anchor">findAll</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#findAll__anchor">findAll</a> to wait for the Promise to resolve before continuing.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#findAll__anchor">findAll</a>.
   *
   * @name Adapter#beforeFindAll
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#findAll__anchor">findAll</a>.
   * @param {Object} query The `query` argument passed to <a href="#findAll__anchor">findAll</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#findAll__anchor">findAll</a>.
   * @property {string} opts.op `beforeFindAll`
   */
  beforeFindAll: noop,

  /**
   * Lifecycle method method called by <a href="#update__anchor">update</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#update__anchor">update</a> to wait for the Promise to resolve before continuing.
   *
   * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#update__anchor">update</a>.
   *
   * @name Adapter#beforeUpdate
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#update__anchor">update</a>.
   * @param {(string|number)} id The `id` argument passed to <a href="#update__anchor">update</a>.
   * @param {Object} props The `props` argument passed to <a href="#update__anchor">update</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#update__anchor">update</a>.
   * @property {string} opts.op `beforeUpdate`
   */
  beforeUpdate: noop,

  /**
   * Lifecycle method method called by <a href="#updateAll__anchor">updateAll</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#updateAll__anchor">updateAll</a> to wait for the Promise to resolve before continuing.
   *
   * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateAll__anchor">updateAll</a>.
   *
   * @name Adapter#beforeUpdateAll
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#updateAll__anchor">updateAll</a>.
   * @param {Object} props The `props` argument passed to <a href="#updateAll__anchor">updateAll</a>.
   * @param {Object} query The `query` argument passed to <a href="#updateAll__anchor">updateAll</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#updateAll__anchor">updateAll</a>.
   * @property {string} opts.op `beforeUpdateAll`
   */
  beforeUpdateAll: noop,

  /**
   * Lifecycle method method called by <a href="#updateMany__anchor">updateMany</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#updateMany__anchor">updateMany</a> to wait for the Promise to resolve before continuing.
   *
   * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateMany__anchor">updateMany</a>.
   *
   * @name Adapter#beforeUpdateMany
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#updateMany__anchor">updateMany</a>.
   * @param {Object[]} props The `props` argument passed to <a href="#updateMany__anchor">updateMany</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#updateMany__anchor">updateMany</a>.
   * @property {string} opts.op `beforeUpdateMany`
   */
  beforeUpdateMany: noop,

  /**
   * Shortcut for `#log('debug'[, arg1[, arg2[, argn]]])`.
   *
   * @name Adapter#dbg
   * @method
   */
  dbg (...args) {
    this.log('debug', ...args)
  },

  /**
   * Create a new record.  Called by `Mapper#create`.
   *
   * @name Adapter#create
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object} props The record to be created.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @return {Promise}
   */
  create (mapper, props, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Create multiple records in a single batch. Called by `Mapper#createMany`.
   *
   * @name Adapter#createMany
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object} props The records to be created.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @return {Promise}
   */
  createMany (mapper, props, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Destroy the record with the given primary key. Called by
   * `Mapper#destroy`.
   *
   * @name Adapter#destroy
   * @method
   * @param {Object} mapper The mapper.
   * @param {(string|number)} id Primary key of the record to destroy.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @return {Promise}
   */
  destroy (mapper, id, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Destroy the records that match the selection query. Called by
   * `Mapper#destroyAll`.
   *
   * @name Adapter#destroyAll
   * @method
   * @param {Object} mapper the mapper.
   * @param {Object} [query] Selection query.
   * @param {Object} [query.where] Filtering criteria.
   * @param {string|Array} [query.orderBy] Sorting criteria.
   * @param {string|Array} [query.sort] Same as `query.sort`.
   * @param {number} [query.limit] Limit results.
   * @param {number} [query.skip] Offset results.
   * @param {number} [query.offset] Same as `query.skip`.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @return {Promise}
   */
  destroyAll (mapper, query, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Return the foreignKey from the given record for the provided relationship.
   *
   * There may be reasons why you may want to override this method, like when
   * the id of the parent doesn't exactly match up to the key on the child.
   *
   * Override with care.
   *
   * @name Adapter#makeHasManyForeignKey
   * @method
   * @return {*}
   */
  makeHasManyForeignKey (mapper, def, record) {
    return def.getForeignKey(record)
  },

  /**
   * Return the foreignKeys from the given record for the provided relationship.
   *
   * Override with care.
   *
   * @name Adapter#makeHasManyForeignKeys
   * @method
   * @return {*}
   */
  makeHasManyForeignKeys (mapper, def, record) {
    return get(record, mapper.idAttribute)
  },

  /**
   * Load a hasMany relationship.
   *
   * Override with care.
   *
   * @name Adapter#loadHasMany
   * @method
   * @return {Promise}
   */
  loadHasMany (mapper, def, records, __opts) {
    const self = this
    let singular = false

    if (isObject(records) && !isArray(records)) {
      singular = true
      records = [records]
    }
    const IDs = records.map(function (record) {
      return self.makeHasManyForeignKey(mapper, def, record)
    })
    const query = {}
    const criteria = query[def.foreignKey] = {}
    if (singular) {
      // more efficient query when we only have one record
      criteria['=='] = IDs[0]
    } else {
      criteria['in'] = IDs.filter(function (id) {
        return id
      })
    }
    return self.findAll(def.getRelation(), query, __opts).then(function (relatedItems) {
      records.forEach(function (record) {
        let attached = []
        // avoid unneccesary iteration when we only have one record
        if (singular) {
          attached = relatedItems
        } else {
          relatedItems.forEach(function (relatedItem) {
            if (get(relatedItem, def.foreignKey) === record[mapper.idAttribute]) {
              attached.push(relatedItem)
            }
          })
        }
        def.setLocalField(record, attached)
      })
    })
  },

  /**
   * Load a hasOne relationship.
   *
   * Override with care.
   *
   * @name Adapter#loadHasOne
   * @method
   * @return {Promise}
   */
  loadHasOne (mapper, def, records, __opts) {
    if (isObject(records) && !isArray(records)) {
      records = [records]
    }
    return this.loadHasMany(mapper, def, records, __opts).then(function () {
      records.forEach(function (record) {
        const relatedData = def.getLocalField(record)
        if (isArray(relatedData) && relatedData.length) {
          def.setLocalField(record, relatedData[0])
        }
      })
    })
  },

  /**
   * Return the foreignKey from the given record for the provided relationship.
   *
   * Override with care.
   *
   * @name Adapter#makeBelongsToForeignKey
   * @method
   * @return {*}
   */
  makeBelongsToForeignKey (mapper, def, record) {
    return def.getForeignKey(record)
  },

  /**
   * Load a belongsTo relationship.
   *
   * Override with care.
   *
   * @name Adapter#loadBelongsTo
   * @method
   * @return {Promise}
   */
  loadBelongsTo (mapper, def, records, __opts) {
    const self = this
    const relationDef = def.getRelation()

    if (isObject(records) && !isArray(records)) {
      const record = records
      return self.find(relationDef, self.makeBelongsToForeignKey(mapper, def, record), __opts).then(function (relatedItem) {
        def.setLocalField(record, relatedItem)
      })
    } else {
      const keys = records.map(function (record) {
        return self.makeBelongsToForeignKey(mapper, def, record)
      }).filter(function (key) {
        return key
      })
      return self.findAll(relationDef, {
        where: {
          [relationDef.idAttribute]: {
            'in': keys
          }
        }
      }, __opts).then(function (relatedItems) {
        records.forEach(function (record) {
          relatedItems.forEach(function (relatedItem) {
            if (relatedItem[relationDef.idAttribute] === record[def.foreignKey]) {
              def.setLocalField(record, relatedItem)
            }
          })
        })
      })
    }
  },

  /**
   * Retrieve the record with the given primary key. Called by `Mapper#find`.
   *
   * @name Adapter#find
   * @method
   * @param {Object} mapper The mapper.
   * @param {(string|number)} id Primary key of the record to retrieve.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @param {string[]} [opts.with=[]] Relations to eager load.
   * @return {Promise}
   */
  find (mapper, id, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Retrieve the records that match the selection query.
   *
   * @name Adapter#findAll
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object} [query] Selection query.
   * @param {Object} [query.where] Filtering criteria.
   * @param {string|Array} [query.orderBy] Sorting criteria.
   * @param {string|Array} [query.sort] Same as `query.sort`.
   * @param {number} [query.limit] Limit results.
   * @param {number} [query.skip] Offset results.
   * @param {number} [query.offset] Same as `query.skip`.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @param {string[]} [opts.with=[]] Relations to eager load.
   * @return {Promise}
   */
  findAll (mapper, query, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Resolve the value of the specified option based on the given options and
   * this adapter's settings. Override with care.
   *
   * @name Adapter#getOpt
   * @method
   * @param {string} opt The name of the option.
   * @param {Object} [opts] Configuration options.
   * @return {*} The value of the specified option.
   */
  getOpt (opt, opts) {
    opts || (opts = {})
    return isUndefined(opts[opt]) ? plainCopy(this[opt]) : plainCopy(opts[opt])
  },

  /**
   * Logging utility method. Override this method if you want to send log
   * messages to something other than the console.
   *
   * @name Adapter#log
   * @method
   * @param {string} level Log level.
   * @param {...*} values Values to log.
   */
  log (level, ...args) {
    if (level && !args.length) {
      args.push(level)
      level = 'debug'
    }
    if (level === 'debug' && !this.debug) {
      return
    }
    const prefix = `${level.toUpperCase()}: (Adapter)`
    if (console[level]) {
      console[level](prefix, ...args)
    } else {
      console.log(prefix, ...args)
    }
  },

  /**
   * @name Adapter#respond
   * @method
   * @param {Object} response Response object.
   * @param {Object} opts Configuration options.
   * return {Object} If `opts.raw == true` then return `response`, else return
   * `response.data`.
   */
  respond (response, opts) {
    return this.getOpt('raw', opts) ? response : response.data
  },

  /**
   * Apply the given update to the record with the specified primary key. Called
   * by `Mapper#update`.
   *
   * @name Adapter#update
   * @method
   * @param {Object} mapper The mapper.
   * @param {(string|number)} id The primary key of the record to be updated.
   * @param {Object} props The update to apply to the record.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @return {Promise}
   */
  update (mapper, id, props, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Apply the given update to all records that match the selection query.
   * Called by `Mapper#updateAll`.
   *
   * @name Adapter#updateAll
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object} props The update to apply to the selected records.
   * @param {Object} [query] Selection query.
   * @param {Object} [query.where] Filtering criteria.
   * @param {string|Array} [query.orderBy] Sorting criteria.
   * @param {string|Array} [query.sort] Same as `query.sort`.
   * @param {number} [query.limit] Limit results.
   * @param {number} [query.skip] Offset results.
   * @param {number} [query.offset] Same as `query.skip`.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @return {Promise}
   */
  updateAll (mapper, props, query, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Update the given records in a single batch. Called by `Mapper#updateMany`.
   *
   * @name Adapter#updateMany
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object[]} records The records to update.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @return {Promise}
   */
  updateMany (mapper, records, opts) {
    throw new Error('Not supported!')
  }
})
