/* global assert:true */
export default function (options) {
  describe('Adapter#destroy', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.destroy, 'function', 'adapter should have a "destroy" method')
    })
    it('should destroy a user', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', User.name, props)
      let user = await adapter.create(User, props)
      let userId = user[User.idAttribute]
      assert.debug('created', User.name, user)

      let beforeDestroyCalled = false
      let afterDestroyCalled = false

      // Test beforeDestroy and afterDestroy
      adapter.beforeDestroy = function (mapper, id, opts) {
        beforeDestroyCalled = true
        assert.isObject(mapper, 'beforeDestroy should have received mapper argument')
        assert.isDefined(id, 'beforeDestroy should have received id argument')
        assert.isObject(opts, 'beforeDestroy should have received opts argument')
        // Test re-assignment
        return Promise.resolve()
      }
      adapter.afterDestroy = function (mapper, id, opts) {
        afterDestroyCalled = true
        assert.isObject(mapper, 'afterDestroy should have received mapper argument')
        assert.isDefined(id, 'afterDestroy should have received id argument')
        assert.isObject(opts, 'afterDestroy should have received opts argument')
        // Test re-assignment
        return Promise.resolve()
      }

      assert.debug('destroy', User.name, userId)
      const destroyedUser = await adapter.destroy(User, userId)
      assert.debug('destroyed', User.name, destroyedUser)
      assert.isUndefined(destroyedUser, 'destroyedUser')
      assert.isTrue(beforeDestroyCalled, 'beforeDestroy should have been called')
      assert.isTrue(afterDestroyCalled, 'afterDestroy should have been called')
    })
    it('should destroy a user and allow afterDestroy re-assignment', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', User.name, props)
      let user = await adapter.create(User, props)
      let userId = user[User.idAttribute]
      assert.debug('created', User.name, user)

      let beforeDestroyCalled = false
      let afterDestroyCalled = false

      // Test beforeDestroy and afterDestroy
      adapter.beforeDestroy = function (mapper, id, opts) {
        beforeDestroyCalled = true
        assert.isObject(mapper, 'beforeDestroy should have received mapper argument')
        assert.isDefined(id, 'beforeDestroy should have received id argument')
        assert.isObject(opts, 'beforeDestroy should have received opts argument')
        // Test re-assignment
        return Promise.resolve()
      }
      adapter.afterDestroy = function (mapper, id, opts) {
        afterDestroyCalled = true
        assert.isObject(mapper, 'afterDestroy should have received mapper argument')
        assert.isDefined(id, 'afterDestroy should have received id argument')
        assert.isObject(opts, 'afterDestroy should have received opts argument')
        // Test re-assignment
        return Promise.resolve('foo')
      }

      assert.debug('destroy', User.name, userId)
      const destroyedUser = await adapter.destroy(User, userId, { raw: true })
      assert.debug('destroyed', User.name, destroyedUser)
      assert.equal(destroyedUser, 'foo', 'destroyedUser')
      assert.isTrue(beforeDestroyCalled, 'beforeDestroy should have been called')
      assert.isTrue(afterDestroyCalled, 'afterDestroy should have been called')
    })
    it('should destroy a user and return raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', User.name, props)
      let user = await adapter.create(User, props)
      let userId = user[User.idAttribute]
      assert.debug('created', User.name, user)

      assert.debug('destroy', User.name, userId)
      const result = await adapter.destroy(User, userId, { raw: true })
      assert.debug('destroyed', User.name, result)
      assert.isUndefined(result.data, 'result.data')
      if (result.hasOwnProperty('deleted')) {
        assert.isDefined(result.deleted, 'result.deleted')
        assert.equal(result.deleted, 1, 'result.deleted')
      }
    })
    it('should destroy nothing', async function () {
      const adapter = this.$$adapter
      const User = this.$$User

      assert.debug('destroy', User.name, 'non-existent-id')
      const result = await adapter.destroy(User, 'non-existent-id')
      assert.debug('destroyed', User.name, result)
      assert.isUndefined(result, 'result')
    })
    it('should destroy nothing and return raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User

      assert.debug('destroy', User.name, 'non-existent-id')
      const result = await adapter.destroy(User, 'non-existent-id', { raw: true })
      assert.debug('destroyed', User.name, result)
      assert.isUndefined(result.data, 'result.data')
      if (result.hasOwnProperty('deleted')) {
        assert.isDefined(result.deleted, 'result.deleted')
        assert.equal(result.deleted, 0, 'result.deleted')
      }
    })
  })
}
