import { assert } from './index'

describe('Adapter#updateMany', () => {
  it('should exist', function () {
    assert.equal(typeof this.$$adapter.updateMany, 'function', 'adapter should have a "updateMany" method')
  })
  it('should update multiple users', async function () {
    const adapter = this.$$adapter
    const User = this.$$User
    const user1 = await adapter.create(User, { name: 'John', age: 20 })
    const userId1 = user1.id

    const user2 = await adapter.create(User, { name: 'John', age: 30 })
    const userId2 = user2.id

    const users = await adapter.findAll(User, { name: 'John' })
    users.sort((a, b) => {
      return a.age - b.age
    })
    assert.equal(users[0].name, 'John')
    assert.equal(users[0].name, 'John')
    assert.equal(users.filter((x) => x.id === userId1).length, 1)
    assert.equal(users.filter((x) => x.id === userId2).length, 1)
    assert.equal(users.filter((x) => x.age === 20).length, 1)
    assert.equal(users.filter((x) => x.age === 30).length, 1)

    user1.age = 101
    user2.age = 202
    const users2 = await adapter.updateMany(User, [user1, user2])
    users2.sort((a, b) => a.age - b.age)
    assert.equal(users2.filter(x => x.id === userId1).length, 1)
    assert.equal(users2.filter(x => x.id === userId2).length, 1)
    assert.equal(users2.filter(x => x.age === 101).length, 1)
    assert.equal(users2.filter(x => x.age === 202).length, 1)

    const users3 = await adapter.findAll(User, { age: 20 })
    assert.objectsEqual(users3, [])
    assert.equal(users3.length, 0)

    const users4 = await adapter.findAll(User, { age: 101 })
    users4.sort((a, b) => a.age - b.age)
    assert.equal(users4.filter(x => x.id === userId1).length, 1)
    assert.equal(users4.filter(x => x.id === userId2).length, 0)
    assert.equal(users4.filter(x => x.age === 101).length, 1)
    assert.equal(users4.filter(x => x.age === 202).length, 0)
  })
})
