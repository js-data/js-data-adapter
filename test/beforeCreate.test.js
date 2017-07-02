/* global assert:true */
export default function (options) {
  describe('Adapter#beforeCreate', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.beforeCreate, 'function', 'adapter should have a "beforeCreate" method')
    })
    it('should call beforeCreate', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'beforeCreate').callsFake(function (mapper, props, opts) {
        assert.isDefined(opts, 'beforeCreate should have received options')
        assert.equal(opts.op, 'beforeCreate', 'opts.op')
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.isTrue(adapter.beforeCreate.calledOnce, 'beforeCreate should have been called once')

      const args = adapter.beforeCreate.firstCall.args
      assert.equal(args.length, 3, 'beforeCreate should have received 3 arguments')
      assert.isTrue(args[0] === User, 'beforeCreate should have received User mapper')
      assert.objectsEqual(args[1], { name: 'John' }, 'beforeCreate should have received create props')
      assert.isObject(args[2], 'beforeCreate should have received options')
      adapter.beforeCreate.restore()
    })
    it('should allow re-assignment', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'beforeCreate').callsFake(function (mapper, props, opts) {
        assert.isDefined(opts, 'beforeCreate should have received options')
        assert.equal(opts.op, 'beforeCreate', 'opts.op')
        return { name: 'Sally' }
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.equal(user.name, 'Sally', 'name of user should be "Sally"')
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.isTrue(adapter.beforeCreate.calledOnce, 'beforeCreate should have been called once')

      const args = adapter.beforeCreate.firstCall.args
      assert.equal(args.length, 3, 'beforeCreate should have received 3 arguments')
      assert.isTrue(args[0] === User, 'beforeCreate should have received User mapper')
      assert.objectsEqual(args[1], { name: 'John' }, 'beforeCreate should have received create props')
      assert.isObject(args[2], 'beforeCreate should have received options')
      adapter.beforeCreate.restore()
    })
    it('should allow returning a promise', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'beforeCreate').callsFake(function (mapper, props, opts) {
        assert.isDefined(opts, 'beforeCreate should have received options')
        assert.equal(opts.op, 'beforeCreate', 'opts.op')
        return Promise.resolve()
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.isTrue(adapter.beforeCreate.calledOnce, 'beforeCreate should have been called once')

      const args = adapter.beforeCreate.firstCall.args
      assert.equal(args.length, 3, 'beforeCreate should have received 3 arguments')
      assert.isTrue(args[0] === User, 'beforeCreate should have received User mapper')
      assert.objectsEqual(args[1], { name: 'John' }, 'beforeCreate should have received create props')
      assert.isDefined(args[2], 'beforeCreate should have received options')
      adapter.beforeCreate.restore()
    })
    it('should allow returning a promise and re-assignment', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'beforeCreate').callsFake(function (mapper, props, opts) {
        assert.isDefined(opts, 'beforeCreate should have received options')
        assert.equal(opts.op, 'beforeCreate', 'opts.op')
        return Promise.resolve({ name: 'Sally' })
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.equal(user.name, 'Sally', 'name of user should be "Sally"')
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.isTrue(adapter.beforeCreate.calledOnce, 'beforeCreate should have been called once')

      const args = adapter.beforeCreate.firstCall.args
      assert.equal(args.length, 3, 'beforeCreate should have received 3 arguments')
      assert.isTrue(args[0] === User, 'beforeCreate should have received User mapper')
      assert.objectsEqual(args[1], { name: 'John' }, 'beforeCreate should have received create props')
      assert.isObject(args[2], 'beforeCreate should have received options')
      adapter.beforeCreate.restore()
    })
  })
}
