/* global assert:true */
export default function (options) {
  describe('Adapter#updateMany', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.updateMany, 'function', 'adapter should have a "updateMany" method')
    })
    it('should update multiple users', async function () {
      var adapter = this.$$adapter
      var User = this.$$User
      var user1 = await adapter.create(User, {name: 'John', age: 20})
      var userId1 = user1.id

      var user2 = await adapter.create(User, {name: 'John', age: 30})
      var userId2 = user2.id

      var users = await adapter.findAll(User, { name: 'John' })
      users.sort(function (a, b) {
        return a.age - b.age
      })
      assert.equal(users[0].name, 'John')
      assert.equal(users[0].name, 'John')
      assert.equal(users.filter(function (x) { return x.id === userId1 }).length, 1)
      assert.equal(users.filter(function (x) { return x.id === userId2 }).length, 1)
      assert.equal(users.filter(function (x) { return x.age === 20 }).length, 1)
      assert.equal(users.filter(function (x) { return x.age === 30 }).length, 1)

      user1.age = 101
      user2.age = 202
      var users2 = await adapter.updateMany(User, [user1, user2])
      users2.sort(function (a, b) {
        return a.age - b.age
      })
      assert.equal(users2.filter(function (x) { return x.id === userId1 }).length, 1)
      assert.equal(users2.filter(function (x) { return x.id === userId2 }).length, 1)
      assert.equal(users2.filter(function (x) { return x.age === 101 }).length, 1)
      assert.equal(users2.filter(function (x) { return x.age === 202 }).length, 1)

      var users3 = await adapter.findAll(User, { age: 20 })
      assert.objectsEqual(users3, [])
      assert.equal(users3.length, 0)

      var users4 = await adapter.findAll(User, { age: 101 })
      users4.sort(function (a, b) {
        return a.age - b.age
      })
      assert.equal(users4.filter(function (x) { return x.id === userId1 }).length, 1)
      assert.equal(users4.filter(function (x) { return x.id === userId2 }).length, 0)
      assert.equal(users4.filter(function (x) { return x.age === 101 }).length, 1)
      assert.equal(users4.filter(function (x) { return x.age === 202 }).length, 0)
    })
  })
}
