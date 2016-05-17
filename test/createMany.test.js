/* global assert:true */
export default function (options) {
  describe('Adapter#createMany', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.createMany, 'function', 'adapter should have a "createMany" method')
    })
    it('should create multiple users', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      let user1 = { name: 'John', age: 20 }

      let user2 = { name: 'John', age: 30 }

      assert.debug('createMany', User.name, [user1, user2])
      const users = await adapter.createMany(User, [user1, user2])
      assert.debug('created', User.name, users)
      users.sort(function (a, b) {
        return a.age - b.age
      })
      assert.isDefined(users[0][User.idAttribute])
      assert.isDefined(users[1][User.idAttribute])
      assert.equal(users.filter(function (x) { return x.age === 20 }).length, 1)
      assert.equal(users.filter(function (x) { return x.age === 30 }).length, 1)

      assert.debug('findAll', User.name, { age: 20 })
      const users3 = await adapter.findAll(User, { age: 20 })
      assert.debug('found', User.name, users3)
      assert.equal(users3.length, 1)
    })
  })
}
