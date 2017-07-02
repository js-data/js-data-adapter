/* global assert:true */
export default function (options) {
  describe('Adapter#beforeUpdate', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.beforeUpdate, 'function', 'adapter should have a "beforeUpdate" method')
    })
    it('should call beforeUpdate', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'beforeUpdate').callsFake(function (mapper, id, props, opts) {
        assert.isDefined(opts, 'beforeUpdate should have received options')
        assert.equal(opts.op, 'beforeUpdate', 'opts.op')
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

      assert.isTrue(adapter.beforeUpdate.calledOnce, 'beforeUpdate should have been called once')

      const args = adapter.beforeUpdate.firstCall.args
      assert.equal(args.length, 4, 'beforeUpdate should have received 4 arguments')
      assert.isTrue(args[0] === User, 'beforeUpdate should have received User mapper')
      assert.isTrue(args[1] === userId, 'beforeUpdate should have received user id')
      assert.objectsEqual(args[2], { name: 'Johnny' }, 'beforeUpdate should have received update props')
      assert.isObject(args[3], 'beforeUpdate should have received options')
      adapter.beforeUpdate.restore()
    })
    it('should allow re-assignment', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'beforeUpdate').callsFake(function (mapper, id, props, opts) {
        assert.isDefined(opts, 'beforeUpdate should have received options')
        assert.equal(opts.op, 'beforeUpdate', 'opts.op')
        return { name: 'Sally' }
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
      assert.equal(updatedUser.name, 'Sally')
      assert.equal(updatedUser[User.idAttribute], userId)

      assert.isTrue(adapter.beforeUpdate.calledOnce, 'beforeUpdate should have been called once')

      const args = adapter.beforeUpdate.firstCall.args
      assert.equal(args.length, 4, 'beforeUpdate should have received 4 arguments')
      assert.isTrue(args[0] === User, 'beforeUpdate should have received User mapper')
      assert.isTrue(args[1] === userId, 'beforeUpdate should have received user id')
      assert.objectsEqual(args[2], { name: 'Johnny' }, 'beforeUpdate should have received update props')
      assert.isObject(args[3], 'beforeUpdate should have received options')
      adapter.beforeUpdate.restore()
    })
    it('should allow returning a promise', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'beforeUpdate').callsFake(function (mapper, id, props, opts) {
        assert.isDefined(opts, 'beforeUpdate should have received options')
        assert.equal(opts.op, 'beforeUpdate', 'opts.op')
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

      assert.isTrue(adapter.beforeUpdate.calledOnce, 'beforeUpdate should have been called once')

      const args = adapter.beforeUpdate.firstCall.args
      assert.equal(args.length, 4, 'beforeUpdate should have received 4 arguments')
      assert.isTrue(args[0] === User, 'beforeUpdate should have received User mapper')
      assert.isTrue(args[1] === userId, 'beforeUpdate should have received user id')
      assert.objectsEqual(args[2], { name: 'Johnny' }, 'beforeUpdate should have received update props')
      assert.isObject(args[3], 'beforeUpdate should have received options')
      adapter.beforeUpdate.restore()
    })
    it('should allow returning a promise and re-assignment', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      sinon.stub(adapter, 'beforeUpdate').callsFake(function (mapper, id, props, opts) {
        assert.isDefined(opts, 'beforeUpdate should have received options')
        assert.equal(opts.op, 'beforeUpdate', 'opts.op')
        return Promise.resolve({ name: 'Sally' })
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
      assert.equal(updatedUser.name, 'Sally')
      assert.equal(updatedUser[User.idAttribute], userId)

      assert.isTrue(adapter.beforeUpdate.calledOnce, 'beforeUpdate should have been called once')

      const args = adapter.beforeUpdate.firstCall.args
      assert.equal(args.length, 4, 'beforeUpdate should have received 4 arguments')
      assert.isTrue(args[0] === User, 'beforeUpdate should have received User mapper')
      assert.isTrue(args[1] === userId, 'beforeUpdate should have received user id')
      assert.objectsEqual(args[2], { name: 'Johnny' }, 'beforeUpdate should have received update props')
      assert.isObject(args[3], 'beforeUpdate should have received options')
      adapter.beforeUpdate.restore()
    })
  })
}
