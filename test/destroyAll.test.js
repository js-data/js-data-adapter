/* global assert:true */
export default function (options) {
  describe('Adapter#destroyAll', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.destroyAll, 'function', 'adapter should have a "destroyAll" method')
    })
    it('should destroy all users', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      const userId = user[User.idAttribute]
      assert.debug('created', User.name, user)

      assert.debug('create', User.name, { name: 'Sally' })
      const user2 = await adapter.create(User, { name: 'Sally' })
      assert.debug('created', User.name, user2)

      assert.debug('findAll', User.name, { name: 'John' })
      let foundUsers = await adapter.findAll(User, { name: 'John' })
      assert.debug('found', User.name, foundUsers)
      assert.equal(foundUsers.length, 1, 'foundUsers.length')
      assert.equal(foundUsers[0][User.idAttribute], userId, 'foundUsers[0][User.idAttribute]')
      assert.equal(foundUsers[0].name, 'John', 'foundUsers[0].name')

      assert.debug('destroyAll', User.name, { name: 'John' })
      const destroyedUsers = await adapter.destroyAll(User, { name: 'John' })
      assert.debug('destroyed', User.name, destroyedUsers)
      assert.isUndefined(destroyedUsers, 'destroyedUsers')

      assert.debug('findAll', User.name, { name: 'John' })
      foundUsers = await adapter.findAll(User, { name: 'John' })
      assert.debug('found', User.name, foundUsers)
      assert.equal(foundUsers.length, 0)

      assert.debug('findAll', User.name, {})
      foundUsers = await adapter.findAll(User, {})
      assert.debug('found', User.name, foundUsers)
      assert.equal(foundUsers.length, 1)
    })
    it('should destroy users and return raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', User.name, props)
      let user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.debug('destroyAll', User.name, props)
      const result = await adapter.destroyAll(User, props, { raw: true })
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

      assert.debug('destroyAll', User.name, {})
      const result = await adapter.destroyAll(User, {})
      assert.debug('destroyed', User.name, result)
      assert.isUndefined(result, 'result')
    })
    it('should destroy nothing and return raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User

      assert.debug('destroyAll', User.name, {})
      const result = await adapter.destroyAll(User, {}, { raw: true })
      assert.debug('destroyed', User.name, result)
      assert.isUndefined(result.data, 'result.data')
      if (result.hasOwnProperty('deleted')) {
        assert.isDefined(result.deleted, 'result.deleted')
        assert.equal(result.deleted, 0, 'result.deleted')
      }
    })
  })
}
