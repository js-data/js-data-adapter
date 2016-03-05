import {utils} from 'js-data'

const {
  addHiddenPropsToTarget,
  extend,
  fillIn,
  forEachRelation,
  forOwn,
  get,
  isArray,
  isObject,
  isString,
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

const withoutRelations = function (mapper, props) {
  const relationFields = mapper.relationFields || []

  // Remove relations
  const _props = {}
  forOwn(props, function (value, key) {
    if (relationFields.indexOf(key) === -1) {
      _props[key] = value
    }
  })
  return _props
}

const DEFAULTS = {
  /**
   * Whether to log debugging information.
   *
   * @name RethinkDBAdapter#debug
   * @type {boolean}
   * @default false
   */
  debug: false,

  /**
   * Whether to return a more detailed response object.
   *
   * @name RethinkDBAdapter#raw
   * @type {boolean}
   * @default false
   */
  raw: false
}

/**
 * RethinkDBAdapter class.
 *
 * @example
 * // Use Container instead of DataStore on the server
 * import {Container} from 'js-data'
 * import RethinkdbDBAdapter from 'js-data-rethinkdb'
 *
 * // Create a store to hold your Mappers
 * const store = new Container()
 *
 * // Create an instance of RethinkdbDBAdapter with default settings
 * const adapter = new RethinkdbDBAdapter()
 *
 * // Mappers in "store" will use the RethinkDB adapter by default
 * store.registerAdapter('rethinkdb', adapter, { default: true })
 *
 * // Create a Mapper that maps to a "user" table
 * store.defineMapper('user')
 *
 * @class RethinkDBAdapter
 * @param {Object} [opts] Configuration opts.
 * @param {boolean} [opts.debug=false] Whether to log debugging information.
 * @param {boolean} [opts.raw=false] Whether to return a more detailed response object.
 */
export default function RethinkDBAdapter (opts) {
  const self = this
  opts || (opts = {})
  fillIn(opts, DEFAULTS)
  fillIn(self, opts)
}

/**
 * Alternative to ES6 class syntax for extending `RethinkDBAdapter`.
 *
 * @name RethinkDBAdapter.extend
 * @method
 * @param {Object} [instanceProps] Properties that will be added to the
 * prototype of the subclass.
 * @param {Object} [classProps] Properties that will be added as static
 * properties to the subclass itself.
 * @return {Object} Subclass of `RethinkDBAdapter`.
 */
RethinkDBAdapter.extend = extend

addHiddenPropsToTarget(RethinkDBAdapter.prototype, {
  /**
   * @name RethinkDBAdapter#afterCreate
   * @method
   */
  afterCreate: noop2,

  /**
   * @name RethinkDBAdapter#afterCreateMany
   * @method
   */
  afterCreateMany: noop2,

  /**
   * @name RethinkDBAdapter#afterDestroy
   * @method
   */
  afterDestroy: noop2,

  /**
   * @name RethinkDBAdapter#afterDestroyAll
   * @method
   */
  afterDestroyAll: noop2,

  /**
   * @name RethinkDBAdapter#afterFind
   * @method
   */
  afterFind: noop2,

  /**
   * @name RethinkDBAdapter#afterFindAll
   * @method
   */
  afterFindAll: noop2,

  /**
   * @name RethinkDBAdapter#afterUpdate
   * @method
   */
  afterUpdate: noop2,

  /**
   * @name RethinkDBAdapter#afterUpdateAll
   * @method
   */
  afterUpdateAll: noop2,

  /**
   * @name RethinkDBAdapter#afterUpdateMany
   * @method
   */
  afterUpdateMany: noop2,

  /**
   * @name RethinkDBAdapter#beforeCreate
   * @method
   */
  beforeCreate: noop,

  /**
   * @name RethinkDBAdapter#beforeCreateMany
   * @method
   */
  beforeCreateMany: noop,

  /**
   * @name RethinkDBAdapter#beforeDestroy
   * @method
   */
  beforeDestroy: noop,

  /**
   * @name RethinkDBAdapter#beforeDestroyAll
   * @method
   */
  beforeDestroyAll: noop,

  /**
   * @name RethinkDBAdapter#beforeFind
   * @method
   */
  beforeFind: noop,

  /**
   * @name RethinkDBAdapter#beforeFindAll
   * @method
   */
  beforeFindAll: noop,

  /**
   * @name RethinkDBAdapter#beforeUpdate
   * @method
   */
  beforeUpdate: noop,

  /**
   * @name RethinkDBAdapter#beforeUpdateAll
   * @method
   */
  beforeUpdateAll: noop,

  /**
   * @name RethinkDBAdapter#beforeUpdateMany
   * @method
   */
  beforeUpdateMany: noop,

  /**
   * @name RethinkDBAdapter#dbg
   * @method
   */
  dbg (...args) {
    this.log('debug', ...args)
  },

  /**
   * Create a new record.
   *
   * @name RethinkDBAdapter#create
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object} props The record to be created.
   * @param {Object} [opts] Configuration options.
   * @param {Object} [opts.insertOpts] Options to pass to r#insert.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @param {Object} [opts.runOpts] Options to pass to r#run.
   * @return {Promise}
   */
  create (mapper, props, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Create multiple records in a single batch.
   *
   * @name RethinkDBAdapter#createMany
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object} props The records to be created.
   * @param {Object} [opts] Configuration options.
   * @param {Object} [opts.insertOpts] Options to pass to r#insert.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @param {Object} [opts.runOpts] Options to pass to r#run.
   * @return {Promise}
   */
  createMany (mapper, props, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Destroy the record with the given primary key.
   *
   * @name RethinkDBAdapter#destroy
   * @method
   * @param {Object} mapper The mapper.
   * @param {(string|number)} id Primary key of the record to destroy.
   * @param {Object} [opts] Configuration options.
   * @param {Object} [opts.deleteOpts] Options to pass to r#delete.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @param {Object} [opts.runOpts] Options to pass to r#run.
   * @return {Promise}
   */
  destroy (mapper, id, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Destroy the records that match the selection query.
   *
   * @name RethinkDBAdapter#destroyAll
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
   * @param {Object} [opts.deleteOpts] Options to pass to r#delete.
   * @param {Object} [opts.operators] Override the default predicate functions
   * for specified operators.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @param {Object} [opts.runOpts] Options to pass to r#run.
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
   * @name RethinkDBAdapter#makeHasManyForeignKey
   * @method
   * @return {*}
   */
  makeHasManyForeignKey (mapper, def, record) {
    return def.getForeignKey(record)
  },

  /**
   * Load a hasMany relationship.
   *
   * @name RethinkDBAdapter#loadHasMany
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
   * @name RethinkDBAdapter#loadHasOne
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
   * @name RethinkDBAdapter#makeBelongsToForeignKey
   * @method
   * @return {*}
   */
  makeBelongsToForeignKey (mapper, def, record) {
    return def.getForeignKey(record)
  },

  /**
   * Load a belongsTo relationship.
   *
   * @name RethinkDBAdapter#loadBelongsTo
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
   * Retrieve the record with the given primary key.
   *
   * @name RethinkDBAdapter#find
   * @method
   * @param {Object} mapper The mapper.
   * @param {(string|number)} id Primary key of the record to retrieve.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @param {Object} [opts.runOpts] Options to pass to r#run.
   * @param {string[]} [opts.with=[]] Relations to eager load.
   * @return {Promise}
   */
  find (mapper, id, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Retrieve the records that match the selection query.
   *
   * @name RethinkDBAdapter#findAll
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
   * @param {Object} [opts.operators] Override the default predicate functions
   * for specified operators.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @param {Object} [opts.runOpts] Options to pass to r#run.
   * @param {string[]} [opts.with=[]] Relations to eager load.
   * @return {Promise}
   */
  findAll (mapper, query, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Resolve the predicate function for the specified operator based on the
   * given options and this adapter's settings.
   *
   * @name RethinkDBAdapter#getOperator
   * @method
   * @param {string} operator The name of the operator.
   * @param {Object} [opts] Configuration options.
   * @param {Object} [opts.operators] Override the default predicate functions
   * for specified operators.
   * @return {*} The predicate function for the specified operator.
   */
  getOperator (operator, opts) {
    if (!this.constructor.OPS) {
      throw new Error('Not supported!')
    }
    opts || (opts = {})
    opts.operators || (opts.operators = {})
    let ownOps = this.operators || {}
    return isUndefined(opts.operators[operator]) ? ownOps[operator] || OPERATORS[operator] : opts.operators[operator]
  },

  /**
   * Resolve the value of the specified option based on the given options and
   * this adapter's settings.
   *
   * @name RethinkDBAdapter#getOpt
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
   * Logging utility method.
   *
   * @name RethinkDBAdapter#log
   * @method
   */
  log (level, ...args) {
    if (level && !args.length) {
      args.push(level)
      level = 'debug'
    }
    if (level === 'debug' && !this.debug) {
      return
    }
    const prefix = `${level.toUpperCase()}: (RethinkDBAdapter)`
    if (console[level]) {
      console[level](prefix, ...args)
    } else {
      console.log(prefix, ...args)
    }
  },

  /**
   * Apply the given update to the record with the specified primary key.
   *
   * @name RethinkDBAdapter#update
   * @method
   * @param {Object} mapper The mapper.
   * @param {(string|number)} id The primary key of the record to be updated.
   * @param {Object} props The update to apply to the record.
   * @param {Object} [opts] Configuration options.
   * @param {Object} [opts.updateOpts] Options to pass to r#update.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @param {Object} [opts.runOpts] Options to pass to r#run.
   * @return {Promise}
   */
  update (mapper, id, props, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Apply the given update to all records that match the selection query.
   *
   * @name RethinkDBAdapter#updateAll
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
   * @param {Object} [opts.operators] Override the default predicate functions
   * for specified operators.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @param {Object} [opts.runOpts] Options to pass to r#run.
   * @param {Object} [opts.updateOpts] Options to pass to r#update.
   * @return {Promise}
   */
  updateAll (mapper, props, query, opts) {
    throw new Error('Not supported!')
  },

  /**
   * Update the given records in a single batch.
   *
   * @name RethinkDBAdapter#updateMany
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object[]} records The records to update.
   * @param {Object} [opts] Configuration options.
   * @param {Object} [opts.insertOpts] Options to pass to r#insert.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed
   * response object.
   * @param {Object} [opts.runOpts] Options to pass to r#run.
   * @return {Promise}
   */
  updateMany (mapper, records, opts) {
    throw new Error('Not supported!')
  }
})
