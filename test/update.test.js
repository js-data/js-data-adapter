/* global assert:true */
export default function (options) {
  describe('Adapter#update', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.update, 'function', 'adapter should have a "update" method')
    })
    it('should update a user', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.debug('find', User.name, user[User.idAttribute])
      let foundUser = await adapter.find(User, user[User.idAttribute])
      assert.debug('found', User.name, foundUser)

      assert.equal(foundUser.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(foundUser[User.idAttribute], 'new user should have an id')
      assert.equal(foundUser[User.idAttribute], user[User.idAttribute])

      assert.debug('update', User.name, user[User.idAttribute], { name: 'Johnny' })
      let updatedUser = await adapter.update(User, user[User.idAttribute], { name: 'Johnny' })
      assert.debug('updated', User.name, updatedUser)
      assert.equal(updatedUser.name, 'Johnny')
      assert.equal(updatedUser[User.idAttribute], user[User.idAttribute])

      assert.debug('find', User.name, user[User.idAttribute])
      foundUser = await adapter.find(User, user[User.idAttribute])
      assert.debug('found', User.name, foundUser)
      assert.equal(foundUser.name, 'Johnny')
      assert.equal(foundUser[User.idAttribute], user[User.idAttribute])
    })
    it('should update a user and return raw', async function () {
      const adapter = this.$$adapter
      const User = this.$$User
      const props = { name: 'John' }

      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      assert.equal(user.name, props.name, `name of user should be "${props.name}"`)
      assert.isDefined(user[User.idAttribute], 'new user should have an id')

      assert.debug('update', User.name, user[User.idAttribute], { name: 'Johnny' })
      const result = await adapter.update(User, user[User.idAttribute], { name: 'Johnny' }, { raw: true })
      assert.debug('updated', User.name, result)
      assert.isDefined(result.data, 'result.data is defined')
      assert.isDefined(result.updated, 'result.updated is defined')
      assert.equal(result.data.name, 'Johnny', 'result.data.name should be "Johnny"')
      assert.equal(result.data[User.idAttribute], user[User.idAttribute], `result.data.${User.idAttribute} should be ${user[User.idAttribute]}`)
      assert.equal(result.updated, 1, 'result.updated should be 1')
    })
    it('should throw when updating non-existent row', async function () {
      const adapter = this.$$adapter
      const User = this.$$User

      assert.debug('update', 'non-existent-id', { name: 'Johnny' })
      try {
        await adapter.update(User, 'non-existent-id', { name: 'Johnny' })
        throw new Error('update should have failed!')
      } catch (err) {
        assert.debug('correctly threw error', err.message)
        assert.isDefined(err.message, 'err.message is defined')
        assert.equal(err.message, 'Not Found', 'err.message should be "Not Found"')
      }
    })
    it('should keep relations specified by "with"', async function () {
      const adapter = this.$$adapter
      const store = this.$$container

      sinon.stub(adapter, '_update').callsFake(function (mapper, id, props, opts) {
        assert.deepEqual(props.posts, [
          {
            id: 1234,
            userId: 1
          }
        ])
        assert.deepEqual(props.profile, {
          id: 238,
          userId: 1
        })
        assert.equal(props.address, undefined)
        assert.equal(props.organization, undefined)
        return [props, {}]
      })

      assert.debug('update', 1, { id: 1 })
      const result = await store.update('user', 1, {
        id: 1,
        posts: [
          {
            id: 1234,
            userId: 1
          }
        ],
        address: {
          id: 412,
          userId: 1
        },
        profile: {
          id: 238,
          userId: 1
        },
        organizationId: 333,
        organization: {
          id: 333
        }
      }, { with: ['posts', 'profile'] })
      assert.debug('updated', 1, result)
      adapter._update.restore()
    })
  })
}
