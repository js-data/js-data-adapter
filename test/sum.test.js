/* global assert:true */
export default function (options) {
  describe('Adapter#sum', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.sum, 'function', 'adapter should have a "sum" method')
    })
    it('should sum users\' age', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John', age: 30 }

      assert.debug('sum', User.name, {})
      let sum = await adapter.sum(User, 'age')
      assert.debug('summed', User.name, sum)
      assert.equal(sum, 0)

      assert.debug('sum', User.name, { name: 'John' })
      sum = await adapter.sum(User, 'age', { name: 'John' })
      assert.debug('summed', User.name, sum)
      assert.equal(sum, 0)

      assert.debug('sum', User.name, { name: 'Sally' })
      sum = await adapter.sum(User, 'age', { name: 'Sally' })
      assert.debug('summed', User.name, sum)
      assert.equal(sum, 0)

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.debug('sum', User.name, {})
      sum = await adapter.sum(User, 'age')
      assert.debug('summed', User.name, sum)
      assert.equal(sum, 30)

      assert.debug('sum', User.name, { name: 'John' })
      sum = await adapter.sum(User, 'age', { name: 'John' })
      assert.debug('summed', User.name, sum)
      assert.equal(sum, 30)

      assert.debug('sum', User.name, { name: 'Sally' })
      sum = await adapter.sum(User, 'age', { name: 'Sally' })
      assert.debug('summed', User.name, sum)
      assert.equal(sum, 0)

      assert.debug('create', User.name, { name: 'Sally' })
      const user2 = await adapter.create(User, { name: 'Sally', age: 27 })
      assert.debug('created', User.name, user2)

      assert.debug('sum', User.name, {})
      sum = await adapter.sum(User, 'age')
      assert.debug('summed', User.name, sum)
      assert.equal(sum, 57)

      assert.debug('sum', User.name, { name: 'John' })
      sum = await adapter.sum(User, 'age', { name: 'John' })
      assert.debug('summed', User.name, sum)
      assert.equal(sum, 30)

      assert.debug('sum', User.name, { name: 'Sally' })
      sum = await adapter.sum(User, 'age', { name: 'Sally' })
      assert.debug('summed', User.name, sum)
      assert.equal(sum, 27)
    })
    it('should sum users\' age and return raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John', age: 30 }

      assert.debug('create', User.name, props)
      let user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.debug('sum', User.name, props)
      const result = await adapter.sum(User, 'age', props, { raw: true })
      assert.debug('summed', User.name, result)
      assert.equal(result.data, 30, 'result.data')
    })
  })
}
