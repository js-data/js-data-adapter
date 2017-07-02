/* global assert:true */
export default function (options) {
  describe('Adapter#afterCreate', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.afterCreate, 'function', 'adapter should have a "afterCreate" method')
    })
    it('should call afterCreate', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'afterCreate').callsFake(function (mapper, props, opts) {
        assert.isDefined(opts, 'afterCreate should have received options')
        assert.equal(opts.op, 'afterCreate', 'opts.op')
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.isTrue(adapter.afterCreate.calledOnce, 'afterCreate should have been called once')

      const args = adapter.afterCreate.firstCall.args
      assert.equal(args.length, 4, 'afterCreate should have received 4 arguments')
      assert.isTrue(args[0] === User, 'afterCreate should have received User mapper')
      assert.objectsEqual(args[1], { name: 'John' }, 'afterCreate should have received create props')
      assert.isObject(args[2], 'afterCreate should have received options')
      assert.isObject(args[3], 'afterCreate should have received record')
      adapter.afterCreate.restore()
    })
    it('should allow re-assignment', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'afterCreate').callsFake(function (mapper, props, opts) {
        assert.isDefined(opts, 'afterCreate should have received options')
        assert.equal(opts.op, 'afterCreate', 'opts.op')
        return 'foo'
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.equal(user, 'foo', 'result should be "foo"')

      assert.isTrue(adapter.afterCreate.calledOnce, 'afterCreate should have been called once')

      const args = adapter.afterCreate.firstCall.args
      assert.equal(args.length, 4, 'afterCreate should have received 4 arguments')
      assert.isTrue(args[0] === User, 'afterCreate should have received User mapper')
      assert.objectsEqual(args[1], { name: 'John' }, 'afterCreate should have received create props')
      assert.isObject(args[2], 'afterCreate should have received options')
      assert.isObject(args[3], 'afterCreate should have received record')
      adapter.afterCreate.restore()
    })
    it('should allow returning a promise', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'afterCreate').callsFake(function (mapper, props, opts, record) {
        assert.isDefined(opts, 'afterCreate should have received options')
        assert.equal(opts.op, 'afterCreate', 'opts.op')
        return Promise.resolve()
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.isTrue(adapter.afterCreate.calledOnce, 'afterCreate should have been called once')

      const args = adapter.afterCreate.firstCall.args
      assert.equal(args.length, 4, 'afterCreate should have received 4 arguments')
      assert.isTrue(args[0] === User, 'afterCreate should have received User mapper')
      assert.objectsEqual(args[1], { name: 'John' }, 'afterCreate should have received create props')
      assert.isDefined(args[2], 'afterCreate should have received options')
      assert.isObject(args[3], 'afterCreate should have received record')
      adapter.afterCreate.restore()
    })
    it('should allow returning a promise and re-assignment', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'afterCreate').callsFake(function (mapper, props, opts) {
        assert.isDefined(opts, 'afterCreate should have received options')
        assert.equal(opts.op, 'afterCreate', 'opts.op')
        return 'foo'
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.equal(user, 'foo', 'result should be "foo"')

      assert.isTrue(adapter.afterCreate.calledOnce, 'afterCreate should have been called once')

      const args = adapter.afterCreate.firstCall.args
      assert.equal(args.length, 4, 'afterCreate should have received 4 arguments')
      assert.isTrue(args[0] === User, 'afterCreate should have received User mapper')
      assert.objectsEqual(args[1], { name: 'John' }, 'afterCreate should have received create props')
      assert.isObject(args[2], 'afterCreate should have received options')
      assert.isObject(args[3], 'afterCreate should have received record')
      adapter.afterCreate.restore()
    })
    it('should receive raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'afterCreate').callsFake(function (mapper, props, opts) {
        assert.isDefined(opts, 'afterCreate should have received options')
        assert.equal(opts.op, 'afterCreate', 'opts.op')
      })

      assert.debug('create', User.name, props)
      const result = await adapter.create(User, props, { raw: true })
      assert.debug('created', User.name, result)

      assert.equal(result.created, 1, 'result.created')
      assert.equal(result.data.name, props.name, 'result.data.name')
      assert.isDefined(result.data[User.idAttribute], `result.data[${User.idAttribute}]`)

      assert.isTrue(adapter.afterCreate.calledOnce, 'afterCreate should have been called once')

      const args = adapter.afterCreate.firstCall.args
      assert.equal(args.length, 4, 'afterCreate should have received 4 arguments')
      assert.isTrue(args[0] === User, 'afterCreate should have received User mapper')
      assert.objectsEqual(args[1], { name: 'John' }, 'afterCreate should have received create props')
      assert.isObject(args[2], 'afterCreate should have received options')
      assert.isObject(args[3], 'afterCreate should have received result')
      assert.equal(args[3].created, 1, 'result.created')
      assert.isObject(args[3].data, 'result.data')
      adapter.afterCreate.restore()
    })
  })
}
