/* global assert:true */
export default function (options) {
  describe('Adapter#afterUpdate', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.afterUpdate, 'function', 'adapter should have a "afterUpdate" method')
    })
    it('should call afterUpdate', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'afterUpdate').callsFake(function (mapper, id, props, opts) {
        assert.isDefined(opts, 'afterUpdate should have received options')
        assert.equal(opts.op, 'afterUpdate', 'opts.op')
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      const userId = user[User.idAttribute]
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.debug('update', User.name, userId, { name: 'Johnny' })
      let updatedUser = await adapter.update(User, userId, { name: 'Johnny' })
      assert.debug('updated', User.name, updatedUser)
      assert.equal(updatedUser.name, 'Johnny')
      assert.equal(updatedUser[User.idAttribute], userId)

      assert.isTrue(adapter.afterUpdate.calledOnce, 'afterUpdate should have been called once')

      const args = adapter.afterUpdate.firstCall.args
      assert.equal(args.length, 5, 'beforeUpdate should have received 5 arguments')
      assert.isTrue(args[0] === User, 'afterUpdate should have received User mapper')
      assert.isTrue(args[1] === userId, 'afterUpdate should have received user id')
      assert.objectsEqual(args[2], { name: 'Johnny' }, 'afterUpdate should have received update props')
      assert.isDefined(args[3], 'afterUpdate should have received options')
      assert.equal(args[3].op, 'afterUpdate', 'args[3].op')
      assert.isDefined(args[4], 'afterUpdate should have received updated record')
      assert.equal(args[4][User.idAttribute], userId, `args[4].${User.idAttribute}`)
      assert.equal(args[4].name, 'Johnny', 'args[4].name')
      adapter.afterUpdate.restore()
    })
    it('should receive raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'afterUpdate').callsFake(function (mapper, id, props, opts) {
        assert.isDefined(opts, 'afterUpdate should have received options')
        assert.equal(opts.op, 'afterUpdate', 'opts.op')
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      const userId = user[User.idAttribute]
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.debug('update', User.name, userId, { name: 'Johnny' })
      let result = await adapter.update(User, userId, { name: 'Johnny' }, { raw: true })
      assert.debug('updated', User.name, result)
      assert.isDefined(result.data, 'result.data')
      assert.equal(result.data.name, 'Johnny', result.data.name)
      assert.equal(result.data[User.idAttribute], userId, `result.data.${User.idAttribute}`)

      assert.isTrue(adapter.afterUpdate.calledOnce, 'afterUpdate should have been called once')

      const args = adapter.afterUpdate.firstCall.args
      assert.equal(args.length, 5, 'beforeUpdate should have received 5 arguments')
      assert.isTrue(args[0] === User, 'afterUpdate should have received User mapper')
      assert.isTrue(args[1] === userId, 'afterUpdate should have received user id')
      assert.objectsEqual(args[2], { name: 'Johnny' }, 'afterUpdate should have received update props')
      assert.isDefined(args[3], 'afterUpdate should have received options')
      assert.equal(args[3].op, 'afterUpdate', 'args[3].op')
      assert.isDefined(args[4], 'afterUpdate should have received update result')
      assert.equal(args[4].updated, 1, 'args[4].updated')
      assert.isDefined(args[4].data, 'args[4].data')
      assert.equal(args[4].data[User.idAttribute], userId, `args[4].data.${User.idAttribute}`)
      assert.equal(args[4].data.name, 'Johnny', 'args[4].data.name')
      adapter.afterUpdate.restore()
    })
    it('should allow re-assignment', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'afterUpdate').callsFake(function (mapper, id, props, opts) {
        assert.isDefined(opts, 'afterUpdate should have received options')
        assert.equal(opts.op, 'afterUpdate', 'opts.op')
        return 'foo'
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      const userId = user[User.idAttribute]
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.debug('update', User.name, userId, { name: 'Johnny' })
      let updatedUser = await adapter.update(User, userId, { name: 'Johnny' })
      assert.debug('updated', User.name, updatedUser)
      assert.equal(updatedUser, 'foo', 'should have received re-assigned value')

      assert.isTrue(adapter.afterUpdate.calledOnce, 'afterUpdate should have been called once')

      const args = adapter.afterUpdate.firstCall.args
      assert.equal(args.length, 5, 'beforeUpdate should have received 5 arguments')
      assert.isTrue(args[0] === User, 'afterUpdate should have received User mapper')
      assert.isTrue(args[1] === userId, 'afterUpdate should have received user id')
      assert.objectsEqual(args[2], { name: 'Johnny' }, 'afterUpdate should have received update props')
      assert.isDefined(args[3], 'afterUpdate should have received options')
      assert.equal(args[3].op, 'afterUpdate', 'args[3].op')
      assert.isDefined(args[4], 'afterUpdate should have received updated record')
      assert.equal(args[4][User.idAttribute], userId, `args[4].${User.idAttribute}`)
      assert.equal(args[4].name, 'Johnny', 'args[4].name')
      adapter.afterUpdate.restore()
    })
    it('should allow returning a promise', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'afterUpdate').callsFake(function (mapper, id, props, opts) {
        assert.isDefined(opts, 'afterUpdate should have received options')
        assert.equal(opts.op, 'afterUpdate', 'opts.op')
        return Promise.resolve()
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      const userId = user[User.idAttribute]
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.debug('update', User.name, userId, { name: 'Johnny' })
      let updatedUser = await adapter.update(User, userId, { name: 'Johnny' })
      assert.debug('updated', User.name, updatedUser)
      assert.equal(updatedUser.name, 'Johnny')
      assert.equal(updatedUser[User.idAttribute], userId)

      assert.isTrue(adapter.afterUpdate.calledOnce, 'afterUpdate should have been called once')

      const args = adapter.afterUpdate.firstCall.args
      assert.equal(args.length, 5, 'beforeUpdate should have received 5 arguments')
      assert.isTrue(args[0] === User, 'afterUpdate should have received User mapper')
      assert.isTrue(args[1] === userId, 'afterUpdate should have received user id')
      assert.objectsEqual(args[2], { name: 'Johnny' }, 'afterUpdate should have received update props')
      assert.isDefined(args[3], 'afterUpdate should have received options')
      assert.equal(args[3].op, 'afterUpdate', 'args[3].op')
      assert.isDefined(args[4], 'afterUpdate should have received updated record')
      assert.equal(args[4][User.idAttribute], userId, `args[4].${User.idAttribute}`)
      assert.equal(args[4].name, 'Johnny', 'args[4].name')
      adapter.afterUpdate.restore()
    })
    it('should allow returning a promise and re-assignment', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'afterUpdate').callsFake(function (mapper, id, props, opts) {
        assert.isDefined(opts, 'afterUpdate should have received options')
        assert.equal(opts.op, 'afterUpdate', 'opts.op')
        return Promise.resolve('foo')
      })

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      const userId = user[User.idAttribute]
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.debug('update', User.name, userId, { name: 'Johnny' })
      let updatedUser = await adapter.update(User, userId, { name: 'Johnny' })
      assert.debug('updated', User.name, updatedUser)
      assert.equal(updatedUser, 'foo', 'should have received re-assigned value')

      assert.isTrue(adapter.afterUpdate.calledOnce, 'afterUpdate should have been called once')

      const args = adapter.afterUpdate.firstCall.args
      assert.equal(args.length, 5, 'beforeUpdate should have received 5 arguments')
      assert.isTrue(args[0] === User, 'afterUpdate should have received User mapper')
      assert.isTrue(args[1] === userId, 'afterUpdate should have received user id')
      assert.objectsEqual(args[2], { name: 'Johnny' }, 'afterUpdate should have received update props')
      assert.isDefined(args[3], 'afterUpdate should have received options')
      assert.equal(args[3].op, 'afterUpdate', 'args[3].op')
      assert.isDefined(args[4], 'afterUpdate should have received updated record')
      assert.equal(args[4][User.idAttribute], userId, `args[4].${User.idAttribute}`)
      assert.equal(args[4].name, 'Johnny', 'args[4].name')
      adapter.afterUpdate.restore()
    })
  })
}
