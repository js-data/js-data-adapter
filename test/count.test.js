/* global assert:true */
export default function (options) {
  describe('Adapter#count', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.count, 'function', 'adapter should have a "count" method')
    })
    it('should count users', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('count', User.name, {})
      let count = await adapter.count(User)
      assert.debug('counted', User.name, count)
      assert.equal(count, 0)

      assert.debug('count', User.name, { name: 'John' })
      count = await adapter.count(User, { name: 'John' })
      assert.debug('counted', User.name, count)
      assert.equal(count, 0)

      assert.debug('count', User.name, { name: 'Sally' })
      count = await adapter.count(User, { name: 'Sally' })
      assert.debug('counted', User.name, count)
      assert.equal(count, 0)

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.debug('count', User.name, {})
      count = await adapter.count(User)
      assert.debug('counted', User.name, count)
      assert.equal(count, 1)

      assert.debug('count', User.name, { name: 'John' })
      count = await adapter.count(User, { name: 'John' })
      assert.debug('counted', User.name, count)
      assert.equal(count, 1)

      assert.debug('count', User.name, { name: 'Sally' })
      count = await adapter.count(User, { name: 'Sally' })
      assert.debug('counted', User.name, count)
      assert.equal(count, 0)

      assert.debug('create', User.name, { name: 'Sally' })
      const user2 = await adapter.create(User, { name: 'Sally' })
      assert.debug('created', User.name, user2)

      assert.debug('count', User.name, {})
      count = await adapter.count(User)
      assert.debug('counted', User.name, count)
      assert.equal(count, 2)

      assert.debug('count', User.name, { name: 'John' })
      count = await adapter.count(User, { name: 'John' })
      assert.debug('counted', User.name, count)
      assert.equal(count, 1)

      assert.debug('count', User.name, { name: 'Sally' })
      count = await adapter.count(User, { name: 'Sally' })
      assert.debug('counted', User.name, count)
      assert.equal(count, 1)
    })
    it('should count users and return raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', User.name, props)
      let user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.debug('count', User.name, props)
      const result = await adapter.count(User, props, { raw: true })
      assert.debug('counted', User.name, result)
      assert.equal(result.data, 1, 'result.data')
    })
  })
}
