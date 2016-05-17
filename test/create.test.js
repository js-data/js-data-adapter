/* global assert:true */
export default function (options) {
  describe('Adapter#create', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.create, 'function', 'adapter should have a "create" method')
    })
    it('should create a user', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      const userId = user[User.idAttribute]
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, 'user.name')
      assert.isDefined(user[User.idAttribute], 'user[User.idAttribute]')

      assert.debug('find', User.name, userId)
      const foundUser = await adapter.find(User, userId)
      assert.debug('found', User.name, foundUser)

      assert.equal(foundUser.name, props.name, 'foundUser.name')
      assert.isDefined(foundUser[User.idAttribute], 'foundUser[User.idAttribute]')
      assert.equal(foundUser[User.idAttribute], userId, 'foundUser[User.idAttribute]')
    })
  })
}
