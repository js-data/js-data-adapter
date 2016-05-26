
import {utils} from 'js-data'

export const noop = function (...args) {
  const self = this
  const opts = args[args.length - 1]
  self.dbg(opts.op, ...args)
  return utils.resolve()
}

export const noop2 = function (...args) {
  const self = this
  const opts = args[args.length - 2]
  self.dbg(opts.op, ...args)
  return utils.resolve()
}

export const unique = function (array) {
  const seen = {}
  const final = []
  array.forEach(function (item) {
    if (item in seen) {
      return
    }
    final.push(item)
    seen[item] = 0
  })
  return final
}

export const withoutRelations = function (mapper, props, opts) {
  opts || (opts = {})
  opts.with || (opts.with = [])
  const relationFields = mapper.relationFields || []
  const toStrip = relationFields.filter(function (value) {
    return opts.with.indexOf(value) === -1
  })
  return utils.omit(props, toStrip)
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
 * Abstract class meant to be extended by adapters.
 *
 * @class Adapter
 * @abstract
 * @param {Object} [opts] Configuration opts.
 * @param {boolean} [opts.debug=false] Whether to log debugging information.
 * @param {boolean} [opts.raw=false] Whether to return a more detailed response
 * object.
 */
export function Adapter (opts) {
  const self = this
  opts || (opts = {})
  utils.fillIn(opts, DEFAULTS)
  utils.fillIn(self, opts)
}

export const reserved = [
  'orderBy',
  'sort',
  'limit',
  'offset',
  'skip',
  'where'
]

/**
 * Response object used when `raw` is `true`. May contain other fields in
 * addition to `data`.
 *
 * @class Response
 */
export function Response (data, meta, op) {
  const self = this
  meta || (meta = {})

  /**
   * Response data.
   *
   * @name Response#data
   * @type {*}
   */
  self.data = data

  utils.fillIn(self, meta)

  /**
   * The operation for which the response was created.
   *
   * @name Response#op
   * @type {string}
   */
  self.op = op
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
Adapter.extend = utils.extend

utils.addHiddenPropsToTarget(Adapter.prototype, {
  /**
   * Lifecycle method method called by <a href="#count__anchor">count</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#count__anchor">count</a> to wait for the Promise to resolve before continuing.
   *
   * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the count.
   *
   * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#count__anchor">count</a>.
   *
   * @name Adapter#afterCount
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#count__anchor">count</a>.
   * @param {Object} props The `props` argument passed to <a href="#count__anchor">count</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#count__anchor">count</a>.
   * @property {string} opts.op `afterCount`
   * @param {Object|Response} response Count or {@link Response}, depending on the value of `opts.raw`.
   */
  afterCount: noop2,

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
   * Lifecycle method method called by <a href="#sum__anchor">sum</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#sum__anchor">sum</a> to wait for the Promise to resolve before continuing.
   *
   * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the sum.
   *
   * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#sum__anchor">sum</a>.
   *
   * @name Adapter#afterSum
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#sum__anchor">sum</a>.
   * @param {string} field The `field` argument passed to <a href="#sum__anchor">sum</a>.
   * @param {Object} query The `query` argument passed to <a href="#sum__anchor">sum</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#sum__anchor">sum</a>.
   * @property {string} opts.op `afterSum`
   * @param {Object|Response} response Count or {@link Response}, depending on the value of `opts.raw`.
   */
  afterSum: noop2,

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
   * Lifecycle method method called by <a href="#count__anchor">count</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#count__anchor">count</a> to wait for the Promise to resolve before continuing.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#count__anchor">count</a>.
   *
   * @name Adapter#beforeCount
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#count__anchor">count</a>.
   * @param {Object} query The `query` argument passed to <a href="#count__anchor">count</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#count__anchor">count</a>.
   * @property {string} opts.op `beforeCount`
   */
  beforeCount: noop,

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
   * Lifecycle method method called by <a href="#sum__anchor">sum</a>.
   *
   * Override this method to add custom behavior for this lifecycle hook.
   *
   * Returning a Promise causes <a href="#sum__anchor">sum</a> to wait for the Promise to resolve before continuing.
   *
   * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#sum__anchor">sum</a>.
   *
   * @name Adapter#beforeSum
   * @method
   * @param {Object} mapper The `mapper` argument passed to <a href="#sum__anchor">sum</a>.
   * @param {Object} query The `query` argument passed to <a href="#sum__anchor">sum</a>.
   * @param {Object} opts The `opts` argument passed to <a href="#sum__anchor">sum</a>.
   * @property {string} opts.op `beforeSum`
   */
  beforeSum: noop,

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
   * Retrieve the number of records that match the selection query. Called by
   * `Mapper#count`.
   *
   * @name Adapter#count
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
   * @return {Promise}
   */
  count (mapper, query, opts) {
    const self = this
    let op
    query || (query = {})
    opts || (opts = {})

    // beforeCount lifecycle hook
    op = opts.op = 'beforeCount'
    return utils.resolve(self[op](mapper, query, opts)).then(function () {
      // Allow for re-assignment from lifecycle hook
      op = opts.op = 'count'
      self.dbg(op, mapper, query, opts)
      return utils.resolve(self._count(mapper, query, opts))
    }).then(function (results) {
      let [data, result] = results
      result || (result = {})
      let response = new Response(data, result, op)
      response = self.respond(response, opts)

      // afterCount lifecycle hook
      op = opts.op = 'afterCount'
      return utils.resolve(self[op](mapper, query, opts, response)).then(function (_response) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_response) ? response : _response
      })
    })
  },

  /**
   * Create a new record. Called by `Mapper#create`.
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
    const self = this
    let op
    props || (props = {})
    opts || (opts = {})

    // beforeCreate lifecycle hook
    op = opts.op = 'beforeCreate'
    return utils.resolve(self[op](mapper, props, opts)).then(function (_props) {
      // Allow for re-assignment from lifecycle hook
      props = utils.isUndefined(_props) ? props : _props
      props = withoutRelations(mapper, props, opts)
      op = opts.op = 'create'
      self.dbg(op, mapper, props, opts)
      return utils.resolve(self._create(mapper, props, opts))
    }).then(function (results) {
      let [data, result] = results
      result || (result = {})
      let response = new Response(data, result, 'create')
      response.created = data ? 1 : 0
      response = self.respond(response, opts)

      // afterCreate lifecycle hook
      op = opts.op = 'afterCreate'
      return utils.resolve(self[op](mapper, props, opts, response)).then(function (_response) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_response) ? response : _response
      })
    })
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
    const self = this
    let op
    props || (props = {})
    opts || (opts = {})

    // beforeCreateMany lifecycle hook
    op = opts.op = 'beforeCreateMany'
    return utils.resolve(self[op](mapper, props, opts)).then(function (_props) {
      // Allow for re-assignment from lifecycle hook
      props = utils.isUndefined(_props) ? props : _props
      props = props.map(function (record) {
        return withoutRelations(mapper, record, opts)
      })
      op = opts.op = 'createMany'
      self.dbg(op, mapper, props, opts)
      return utils.resolve(self._createMany(mapper, props, opts))
    }).then(function (results) {
      let [data, result] = results
      data || (data = [])
      result || (result = {})
      let response = new Response(data, result, 'createMany')
      response.created = data.length
      response = self.respond(response, opts)

      // afterCreateMany lifecycle hook
      op = opts.op = 'afterCreateMany'
      return utils.resolve(self[op](mapper, props, opts, response)).then(function (_response) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_response) ? response : _response
      })
    })
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
    const self = this
    let op
    opts || (opts = {})

    // beforeDestroy lifecycle hook
    op = opts.op = 'beforeDestroy'
    return utils.resolve(self[op](mapper, id, opts)).then(function () {
      op = opts.op = 'destroy'
      self.dbg(op, mapper, id, opts)
      return utils.resolve(self._destroy(mapper, id, opts))
    }).then(function (results) {
      let [data, result] = results
      result || (result = {})
      let response = new Response(data, result, 'destroy')
      response = self.respond(response, opts)

      // afterDestroy lifecycle hook
      op = opts.op = 'afterDestroy'
      return utils.resolve(self[op](mapper, id, opts, response)).then(function (_response) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_response) ? response : _response
      })
    })
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
    const self = this
    let op
    query || (query = {})
    opts || (opts = {})

    // beforeDestroyAll lifecycle hook
    op = opts.op = 'beforeDestroyAll'
    return utils.resolve(self[op](mapper, query, opts)).then(function () {
      op = opts.op = 'destroyAll'
      self.dbg(op, mapper, query, opts)
      return utils.resolve(self._destroyAll(mapper, query, opts))
    }).then(function (results) {
      let [data, result] = results
      result || (result = {})
      let response = new Response(data, result, 'destroyAll')
      response = self.respond(response, opts)

      // afterDestroyAll lifecycle hook
      op = opts.op = 'afterDestroyAll'
      return utils.resolve(self[op](mapper, query, opts, response)).then(function (_response) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_response) ? response : _response
      })
    })
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

    if (utils.isObject(records) && !utils.isArray(records)) {
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
    const self = this
    let record, op
    opts || (opts = {})
    opts.with || (opts.with = [])

    // beforeFind lifecycle hook
    op = opts.op = 'beforeFind'
    return utils.resolve(self[op](mapper, id, opts)).then(function () {
      op = opts.op = 'find'
      self.dbg(op, mapper, id, opts)
      return utils.resolve(self._find(mapper, id, opts))
    }).then(function (results) {
      let [_record] = results
      if (!_record) {
        return
      }
      record = _record
      const tasks = []

      utils.forEachRelation(mapper, opts, function (def, __opts) {
        let task
        if (def.foreignKey && (def.type === 'hasOne' || def.type === 'hasMany')) {
          if (def.type === 'hasOne') {
            task = self.loadHasOne(mapper, def, record, __opts)
          } else {
            task = self.loadHasMany(mapper, def, record, __opts)
          }
        } else if (def.type === 'hasMany' && def.localKeys) {
          task = self.loadHasManyLocalKeys(mapper, def, record, __opts)
        } else if (def.type === 'hasMany' && def.foreignKeys) {
          task = self.loadHasManyForeignKeys(mapper, def, record, __opts)
        } else if (def.type === 'belongsTo') {
          task = self.loadBelongsTo(mapper, def, record, __opts)
        }
        if (task) {
          tasks.push(task)
        }
      })

      return Promise.all(tasks)
    }).then(function () {
      let response = new Response(record, {}, 'find')
      response.found = record ? 1 : 0
      response = self.respond(response, opts)

      // afterFind lifecycle hook
      op = opts.op = 'afterFind'
      return utils.resolve(self[op](mapper, id, opts, response)).then(function (_response) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_response) ? response : _response
      })
    })
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
    const self = this
    opts || (opts = {})
    opts.with || (opts.with = [])

    let records = []
    let op
    const activeWith = opts._activeWith

    if (utils.isObject(activeWith)) {
      const activeQuery = activeWith.query || {}
      if (activeWith.replace) {
        query = activeQuery
      } else {
        utils.deepFillIn(query, activeQuery)
      }
    }

    // beforeFindAll lifecycle hook
    op = opts.op = 'beforeFindAll'
    return utils.resolve(self[op](mapper, query, opts)).then(function () {
      op = opts.op = 'findAll'
      self.dbg(op, mapper, query, opts)
      return utils.resolve(self._findAll(mapper, query, opts))
    }).then(function (results) {
      let [_records] = results
      _records || (_records = [])
      records = _records
      const tasks = []
      utils.forEachRelation(mapper, opts, function (def, __opts) {
        let task
        if (def.foreignKey && (def.type === 'hasOne' || def.type === 'hasMany')) {
          if (def.type === 'hasMany') {
            task = self.loadHasMany(mapper, def, records, __opts)
          } else {
            task = self.loadHasOne(mapper, def, records, __opts)
          }
        } else if (def.type === 'hasMany' && def.localKeys) {
          task = self.loadHasManyLocalKeys(mapper, def, records, __opts)
        } else if (def.type === 'hasMany' && def.foreignKeys) {
          task = self.loadHasManyForeignKeys(mapper, def, records, __opts)
        } else if (def.type === 'belongsTo') {
          task = self.loadBelongsTo(mapper, def, records, __opts)
        }
        if (task) {
          tasks.push(task)
        }
      })
      return Promise.all(tasks)
    }).then(function () {
      let response = new Response(records, {}, 'findAll')
      response.found = records.length
      response = self.respond(response, opts)

      // afterFindAll lifecycle hook
      op = opts.op = 'afterFindAll'
      return utils.resolve(self[op](mapper, query, opts, response)).then(function (_response) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_response) ? response : _response
      })
    })
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
    return utils.isUndefined(opts[opt]) ? utils.plainCopy(this[opt]) : utils.plainCopy(opts[opt])
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

    if (utils.isObject(records) && !utils.isArray(records)) {
      singular = true
      records = [records]
    }
    const IDs = records.map(function (record) {
      return self.makeHasManyForeignKey(mapper, def, record)
    })
    const query = {
      where: {}
    }
    const criteria = query.where[def.foreignKey] = {}
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
            if (utils.get(relatedItem, def.foreignKey) === record[mapper.idAttribute]) {
              attached.push(relatedItem)
            }
          })
        }
        def.setLocalField(record, attached)
      })
    })
  },

  loadHasManyLocalKeys (mapper, def, records, __opts) {
    const self = this
    let record
    const relatedMapper = def.getRelation()

    if (utils.isObject(records) && !utils.isArray(records)) {
      record = records
    }

    if (record) {
      return self.findAll(relatedMapper, {
        where: {
          [relatedMapper.idAttribute]: {
            'in': self.makeHasManyLocalKeys(mapper, def, record)
          }
        }
      }, __opts).then(function (relatedItems) {
        def.setLocalField(record, relatedItems)
      })
    } else {
      let localKeys = []
      records.forEach(function (record) {
        localKeys = localKeys.concat(self.self.makeHasManyLocalKeys(mapper, def, record))
      })
      return self.findAll(relatedMapper, {
        where: {
          [relatedMapper.idAttribute]: {
            'in': unique(localKeys).filter(function (x) { return x })
          }
        }
      }, __opts).then(function (relatedItems) {
        records.forEach(function (item) {
          let attached = []
          let itemKeys = utils.get(item, def.localKeys) || []
          itemKeys = utils.isArray(itemKeys) ? itemKeys : Object.keys(itemKeys)
          relatedItems.forEach(function (relatedItem) {
            if (itemKeys && itemKeys.indexOf(relatedItem[relatedMapper.idAttribute]) !== -1) {
              attached.push(relatedItem)
            }
          })
          def.setLocalField(item, attached)
        })
        return relatedItems
      })
    }
  },

  loadHasManyForeignKeys (mapper, def, records, __opts) {
    const self = this
    const relatedMapper = def.getRelation()
    const idAttribute = mapper.idAttribute
    let record

    if (utils.isObject(records) && !utils.isArray(records)) {
      record = records
    }

    if (record) {
      return self.findAll(def.getRelation(), {
        where: {
          [def.foreignKeys]: {
            'contains': self.makeHasManyForeignKeys(mapper, def, record)
          }
        }
      }, __opts).then(function (relatedItems) {
        def.setLocalField(record, relatedItems)
      })
    } else {
      return self.findAll(relatedMapper, {
        where: {
          [def.foreignKeys]: {
            'isectNotEmpty': records.map(function (record) {
              return self.makeHasManyForeignKeys(mapper, def, record)
            })
          }
        }
      }, __opts).then(function (relatedItems) {
        const foreignKeysField = def.foreignKeys
        records.forEach(function (record) {
          const _relatedItems = []
          const id = utils.get(record, idAttribute)
          relatedItems.forEach(function (relatedItem) {
            const foreignKeys = utils.get(relatedItems, foreignKeysField) || []
            if (foreignKeys.indexOf(id) !== -1) {
              _relatedItems.push(relatedItem)
            }
          })
          def.setLocalField(record, _relatedItems)
        })
      })
    }
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
    if (utils.isObject(records) && !utils.isArray(records)) {
      records = [records]
    }
    return this.loadHasMany(mapper, def, records, __opts).then(function () {
      records.forEach(function (record) {
        const relatedData = def.getLocalField(record)
        if (utils.isArray(relatedData) && relatedData.length) {
          def.setLocalField(record, relatedData[0])
        }
      })
    })
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
   * Return the localKeys from the given record for the provided relationship.
   *
   * Override with care.
   *
   * @name Adapter#makeHasManyLocalKeys
   * @method
   * @return {*}
   */
  makeHasManyLocalKeys (mapper, def, record) {
    let localKeys = []
    let itemKeys = utils.get(record, def.localKeys) || []
    itemKeys = utils.isArray(itemKeys) ? itemKeys : Object.keys(itemKeys)
    localKeys = localKeys.concat(itemKeys)
    return unique(localKeys).filter(function (x) { return x })
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
    return utils.get(record, mapper.idAttribute)
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
   * Retrieve sum of the specified field of the records that match the selection
   * query. Called by `Mapper#sum`.
   *
   * @name Adapter#sum
   * @method
   * @param {Object} mapper The mapper.
   * @param {string} field By to sum.
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
  sum (mapper, field, query, opts) {
    const self = this
    let op
    if (!utils.isString(field)) {
      throw new Error('field must be a string!')
    }
    query || (query = {})
    opts || (opts = {})

    // beforeSum lifecycle hook
    op = opts.op = 'beforeSum'
    return utils.resolve(self[op](mapper, field, query, opts)).then(function () {
      // Allow for re-assignment from lifecycle hook
      op = opts.op = 'sum'
      self.dbg(op, mapper, field, query, opts)
      return utils.resolve(self._sum(mapper, field, query, opts))
    }).then(function (results) {
      let [data, result] = results
      result || (result = {})
      let response = new Response(data, result, op)
      response = self.respond(response, opts)

      // afterSum lifecycle hook
      op = opts.op = 'afterSum'
      return utils.resolve(self[op](mapper, field, query, opts, response)).then(function (_response) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_response) ? response : _response
      })
    })
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
    const self = this
    props || (props = {})
    opts || (opts = {})
    let op

    // beforeUpdate lifecycle hook
    op = opts.op = 'beforeUpdate'
    return utils.resolve(self[op](mapper, id, props, opts)).then(function (_props) {
      // Allow for re-assignment from lifecycle hook
      props = utils.isUndefined(_props) ? props : _props
      props = withoutRelations(mapper, props, opts)
      op = opts.op = 'update'
      self.dbg(op, mapper, id, props, opts)
      return utils.resolve(self._update(mapper, id, props, opts))
    }).then(function (results) {
      let [data, result] = results
      result || (result = {})
      let response = new Response(data, result, 'update')
      response.updated = data ? 1 : 0
      response = self.respond(response, opts)

      // afterUpdate lifecycle hook
      op = opts.op = 'afterUpdate'
      return utils.resolve(self[op](mapper, id, props, opts, response)).then(function (_response) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_response) ? response : _response
      })
    })
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
    const self = this
    props || (props = {})
    query || (query = {})
    opts || (opts = {})
    let op

    // beforeUpdateAll lifecycle hook
    op = opts.op = 'beforeUpdateAll'
    return utils.resolve(self[op](mapper, props, query, opts)).then(function (_props) {
      // Allow for re-assignment from lifecycle hook
      props = utils.isUndefined(_props) ? props : _props
      props = withoutRelations(mapper, props, opts)
      op = opts.op = 'updateAll'
      self.dbg(op, mapper, props, query, opts)
      return utils.resolve(self._updateAll(mapper, props, query, opts))
    }).then(function (results) {
      let [data, result] = results
      data || (data = [])
      result || (result = {})
      let response = new Response(data, result, 'updateAll')
      response.updated = data.length
      response = self.respond(response, opts)

      // afterUpdateAll lifecycle hook
      op = opts.op = 'afterUpdateAll'
      return utils.resolve(self[op](mapper, props, query, opts, response)).then(function (_response) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_response) ? response : _response
      })
    })
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
    const self = this
    records || (records = [])
    opts || (opts = {})
    let op
    const idAttribute = mapper.idAttribute

    records = records.filter(function (record) {
      return utils.get(record, idAttribute)
    })

    // beforeUpdateMany lifecycle hook
    op = opts.op = 'beforeUpdateMany'
    return utils.resolve(self[op](mapper, records, opts)).then(function (_records) {
      // Allow for re-assignment from lifecycle hook
      records = utils.isUndefined(_records) ? records : _records
      records = records.map(function (record) {
        return withoutRelations(mapper, record, opts)
      })
      op = opts.op = 'updateMany'
      self.dbg(op, mapper, records, opts)
      return utils.resolve(self._updateMany(mapper, records, opts))
    }).then(function (results) {
      let [data, result] = results
      data || (data = [])
      result || (result = {})
      let response = new Response(data, result, 'updateMany')
      response.updated = data.length
      response = self.respond(response, opts)

      // afterUpdateMany lifecycle hook
      op = opts.op = 'afterUpdateMany'
      return utils.resolve(self[op](mapper, records, opts, response)).then(function (_response) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_response) ? response : _response
      })
    })
  }
})
