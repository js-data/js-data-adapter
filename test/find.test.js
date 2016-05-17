/* global assert:true */
export default function (options) {
  describe('Adapter#find', function () {
    var adapter, User, Profile, Post, Comment, Tag

    beforeEach(function () {
      adapter = this.$$adapter
      User = this.$$User
      Profile = this.$$Profile
      Post = this.$$Post
      Comment = this.$$Comment
      Tag = this.$$Tag
    })

    it('should exist', function () {
      assert.equal(typeof adapter.find, 'function', 'adapter should have a "find" method')
    })

    it('should find a user', async function () {
      this.toClear.push('Post')
      this.toClear.push('Comment')
      let props = { name: 'John' }
      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)
      const userId = user[User.idAttribute]
      assert.equal(user.name, 'John', 'user.name')
      assert.isDefined(user[User.idAttribute], 'user[User.idAttribute]')

      // Test beforeFind and afterFind
      let beforeFindCalled = false
      let afterFindCalled = false
      adapter.beforeFind = function (mapper, id, opts) {
        beforeFindCalled = true
        assert.isObject(mapper, 'beforeFind should have received mapper argument')
        assert.isDefined(id, 'beforeFind should have received id argument')
        assert.equal(id, userId, 'beforeFind should have received correct id argument')
        assert.isObject(opts, 'beforeFind should have received opts argument')
        // Optionally return a promise for async
        return Promise.resolve()
      }
      adapter.afterFind = function (mapper, id, opts, record) {
        afterFindCalled = true
        assert.isObject(mapper, 'afterFind should have received mapper argument')
        assert.isDefined(id, 'afterFind should have received id argument')
        assert.equal(id, userId, 'afterFind should have received correct id argument')
        assert.isObject(opts, 'afterFind should have received opts argument')
        assert.isObject(record, 'afterFind should have received record argument')
        // Optionally return a promise for async
        return Promise.resolve()
      }

      assert.debug('find', User.name, userId)
      let foundUser = await adapter.find(User, userId)
      assert.debug('found', User.name, foundUser)
      assert.equal(foundUser.name, 'John', 'name of found user should be "John"')
      assert.equal(foundUser[User.idAttribute], userId, 'found user should have correct id')
      assert.isTrue(beforeFindCalled, 'beforeFind should have been called')
      assert.isTrue(afterFindCalled, 'afterFind should have been called')

      // should allow re-assignment
      beforeFindCalled = false
      afterFindCalled = false
      adapter.afterFind = function (mapper, id, opts, record) {
        afterFindCalled = true
        assert.isObject(mapper, 'afterFind should have received mapper argument')
        assert.isDefined(id, 'afterFind should have received id argument')
        assert.equal(id, userId, 'afterFind should have received correct id argument')
        assert.isObject(opts, 'afterFind should have received opts argument')
        assert.isObject(record, 'afterFind should have received record argument')
        // Test re-assignment
        return Promise.resolve({ name: 'Sally', [User.idAttribute]: userId })
      }

      assert.debug('find', User.name, userId)
      foundUser = await adapter.find(User, userId)
      assert.debug('found', User.name, foundUser)
      assert.equal(foundUser.name, 'Sally', 'foundUser.name')
      assert.equal(foundUser[User.idAttribute], userId, 'foundUser[User.idAttribute]')
      assert.isTrue(beforeFindCalled, 'beforeFind should have been called')
      assert.isTrue(afterFindCalled, 'afterFind should have been called')
      // clear hooks
      delete adapter.beforeFind
      delete adapter.afterFind

      props = { content: 'test', userId: userId }
      assert.debug('create', Post.name, props)
      const post = await adapter.create(Post, props)
      assert.debug('created', Post.name, post)
      const postId = post[Post.idAttribute]

      assert.equal(post.content, 'test', 'post.content')
      assert.isDefined(post[Post.idAttribute], 'post[Post.idAttribute]')
      assert.equal(post.userId, userId, 'post.userId')

      props = [
        {
          content: 'test2',
          postId,
          userId
        },
        {
          content: 'test3',
          postId,
          userId
        }
      ]
      assert.debug('create', Comment.name, props)
      const comments = await Promise.all([
        adapter.create(Comment, props[0]),
        adapter.create(Comment, props[1])
      ])
      assert.debug('created', Comment.name, comments)

      comments.sort(function (a, b) {
        return a.content > b.content
      })

      assert.debug('find', Post.name, postId)
      const foundPost = await adapter.find(Post, postId, { with: ['user', 'comment'] })
      assert.debug('found', Post.name, foundPost)
      foundPost.comments.sort(function (a, b) {
        return a.content > b.content
      })
      assert.equalObjects(foundPost.user, user, 'foundPost.user')
      assert.equalObjects(foundPost.comments, comments, 'foundPost.comments')
    })

    it('should return raw', async function () {
      let props = { name: 'John' }
      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)
      const userId = user[User.idAttribute]
      assert.equal(user.name, 'John', 'user.name')
      assert.isDefined(user[User.idAttribute], 'user[User.idAttribute]')

      assert.debug('find', User.name, userId)
      const result = await adapter.find(User, userId, { raw: true })
      assert.debug('found', User.name, result)
      assert.isDefined(result.data, 'result.data')
      assert.isDefined(result.found, 'result.found')
      assert.equal(result.data.name, 'John', 'result.data.name')
      assert.equal(result.data[User.idAttribute], userId, `result.data.${User.idAttribute}`)
      assert.equal(result.found, 1, 'result.found')
    })

    it('should return nothing', async function () {
      assert.debug('find', User.name, 'non-existent-id')
      const result = await adapter.find(User, 'non-existent-id')
      assert.debug('found', User.name, result)
      assert.isUndefined(result, 'result')
    })

    it('should return raw and nothing', async function () {
      assert.debug('find', User.name, 'non-existent-id')
      const result = await adapter.find(User, 'non-existent-id', { raw: true })
      assert.debug('found', User.name, result)
      assert.isUndefined(result.data, 'result.data')
      assert.isDefined(result.found, 'result.found')
      assert.equal(result.found, 0, 'result.found')
    })

    it('should load belongsTo relations', async function () {
      this.toClear.push('Post')
      this.toClear.push('Comment')
      this.toClear.push('Profile')
      let props = { name: 'John' }
      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      props = { email: 'foo@test.com', userId: user[User.idAttribute] }
      assert.debug('create', Profile.name, props)
      const profile = await adapter.create(Profile, props)
      assert.debug('created', Profile.name, profile)

      props = { content: 'foo', userId: user[User.idAttribute] }
      assert.debug('create', Post.name, props)
      const post = await adapter.create(Post, props)
      assert.debug('created', Post.name, post)

      props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId }
      assert.debug('create', Comment.name, props)
      let comment = await adapter.create(Comment, props)
      assert.debug('created', Comment.name, comment)

      assert.debug('find', Comment.name, comment[Comment.idAttribute])
      comment = await adapter.find(Comment, comment[Comment.idAttribute], {'with': ['user', 'post']})
      assert.debug('found', Comment.name, comment)

      assert.isDefined(comment, 'comment')
      assert.isDefined(comment.post, 'comment.post')
      assert.isDefined(comment.user, 'comment.user')
    })

    it('should load belongsTo relations and filter sub queries', async function () {
      this.toClear.push('Post')
      this.toClear.push('Comment')
      let props = { name: 'John' }
      assert.debug('create', User.name, props)
      let user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      props = { name: 'Sally' }
      assert.debug('create', User.name, props)
      let user2 = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      props = { status: 'draft', userId: user[User.idAttribute] }
      assert.debug('create', Post.name, props)
      const post = await adapter.create(Post, props)
      assert.debug('created', Post.name, post)

      props = { status: 'published', userId: user[User.idAttribute] }
      assert.debug('create', Post.name, props)
      const post2 = await adapter.create(Post, props)
      assert.debug('created', Post.name, post2)

      props = { status: 'draft', userId: user2[User.idAttribute] }
      assert.debug('create', Post.name, props)
      const post3 = await adapter.create(Post, props)
      assert.debug('created', Post.name, post3)

      props = { status: 'published', userId: user2[User.idAttribute] }
      assert.debug('create', Post.name, props)
      const post4 = await adapter.create(Post, props)
      assert.debug('created', Post.name, post4)

      assert.debug('find', User.name, user[User.idAttribute])
      user = await adapter.find(User, user[User.idAttribute], {'with': ['post']})
      assert.debug('found', User.name, user)

      assert.isDefined(user, 'user')
      assert.isDefined(user.posts, 'user.posts')
      assert.equal(user.posts.length, 2, 'user.posts.length')

      assert.debug('find', User.name, user[User.idAttribute])
      user = await adapter.find(User, user[User.idAttribute], {'with': [{
        relation: 'post',
        query: {
          status: 'published'
        }
      }]})
      assert.debug('found', User.name, user)

      assert.isDefined(user, 'user')
      assert.isDefined(user.posts, 'user.posts')
      assert.equal(user.posts.length, 1, 'user.posts.length')

      assert.debug('find', User.name, user[User.idAttribute])
      user = await adapter.find(User, user[User.idAttribute], {'with': [{
        relation: 'post',
        replace: true,
        query: {
          status: 'published'
        }
      }]})
      assert.debug('found', User.name, user)

      assert.isDefined(user, 'user')
      assert.isDefined(user.posts, 'user.posts')
      assert.equal(user.posts.length, 2, 'user.posts.length')
    })

    if (options.hasFeature('findBelongsToNested')) {
      it('should load belongsTo relations (nested)', async function () {
        this.toClear.push('Post')
        this.toClear.push('Comment')
        this.toClear.push('Profile')
        let props = { name: 'John' }
        assert.debug('create', User.name, props)
        const user = await adapter.create(User, props)
        assert.debug('created', User.name, user)

        props = { email: 'foo@test.com', userId: user[User.idAttribute] }
        assert.debug('create', Profile.name, props)
        const profile = await adapter.create(Profile, props)
        assert.debug('created', Profile.name, profile)

        props = { content: 'foo', userId: user[User.idAttribute] }
        assert.debug('create', Post.name, props)
        const post = await adapter.create(Post, props)
        assert.debug('created', Post.name, post)

        props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId }
        assert.debug('create', Comment.name, props)
        let comment = await adapter.create(Comment, props)
        assert.debug('created', Comment.name, comment)

        assert.debug('find', Comment.name, comment[Comment.idAttribute])
        comment = await adapter.find(Comment, comment[Comment.idAttribute], {'with': ['user', 'user.profile', 'post', 'post.user']})
        assert.debug('found', Comment.name, comment)

        assert.isDefined(comment, 'comment')
        assert.isDefined(comment.post, 'comment.post')
        assert.isDefined(comment.post.user, 'comment.post.user')
        assert.isDefined(comment.user, 'comment.user')
        assert.isDefined(comment.user.profile, 'comment.user.profile')
      })
    }

    it('should load hasMany and belongsTo relations', async function () {
      this.toClear.push('Post')
      this.toClear.push('Comment')
      this.toClear.push('Profile')
      let props = { name: 'John' }
      assert.debug('create', User.name, props)
      const user = await adapter.create(User, props)
      assert.debug('created', User.name, user)

      props = { email: 'foo@test.com', userId: user[User.idAttribute] }
      assert.debug('create', Profile.name, props)
      const profile = await adapter.create(Profile, props)
      assert.debug('created', Profile.name, profile)

      props = { content: 'foo', userId: user[User.idAttribute] }
      assert.debug('create', Post.name, props)
      let post = await adapter.create(Post, props)
      let postId = post[Post.idAttribute]
      assert.debug('created', Post.name, post)

      props = { content: 'test2', postId, userId: post.userId }
      assert.debug('create', Comment.name, props)
      const comment = await adapter.create(Comment, props)
      assert.debug('created', Comment.name, comment)

      assert.debug('find', Post.name, postId)
      post = await adapter.find(Post, postId, {'with': ['user', 'comment']})
      assert.debug('found', Post.name, post)

      assert.isDefined(post.comments, 'post.comments')
      assert.isDefined(post.user, 'post.user')
    })

    if (options.hasFeature('findBelongsToHasManyNested')) {
      it('should load hasMany and belongsTo relations (nested)', async function () {
        this.toClear.push('Post')
        this.toClear.push('Comment')
        this.toClear.push('Profile')
        let props = { name: 'John' }
        assert.debug('create', User.name, props)
        const user = await adapter.create(User, props)
        assert.debug('created', User.name, user)

        props = { email: 'foo@test.com', userId: user[User.idAttribute] }
        assert.debug('create', Profile.name, props)
        const profile = await adapter.create(Profile, props)
        assert.debug('created', Profile.name, profile)

        props = { content: 'foo', userId: user[User.idAttribute] }
        assert.debug('create', Post.name, props)
        let post = await adapter.create(Post, props)
        let postId = post[Post.idAttribute]
        assert.debug('created', Post.name, post)

        props = { content: 'test2', postId, userId: post.userId }
        assert.debug('create', Comment.name, props)
        const comment = await adapter.create(Comment, props)
        assert.debug('created', Comment.name, comment)

        assert.debug('find', Post.name, postId)
        post = await adapter.find(Post, postId, {'with': ['user', 'comment', 'comment.user', 'comment.user.profile']})
        assert.debug('found', Post.name, post)

        assert.isDefined(post.comments, 'post.comments')
        assert.isDefined(post.comments[0].user, 'post.comments[0].user')
        assert.isDefined(post.comments[0].user.profile, 'post.comments[0].user.profile')
        assert.isDefined(post.user, 'post.user')
      })
    }

    if (options.hasFeature('findHasManyLocalKeys')) {
      it('should load hasMany localKeys (array) relations', async function () {
        this.toClear.push('Post')
        this.toClear.push('Tag')
        let props = { value: 'big data' }
        assert.debug('create', Tag.name, props)
        const tag = await adapter.create(Tag, props)
        assert.debug('created', Tag.name, tag)

        props = { value: 'servers' }
        assert.debug('create', Tag.name, props)
        const tag2 = await adapter.create(Tag, props)
        assert.debug('created', Tag.name, tag2)

        props = { content: 'test', tagIds: [tag[Tag.idAttribute], tag2[Tag.idAttribute]] }
        assert.debug('create', Post.name, props)
        let post = await adapter.create(Post, props)
        let postId = post[Post.idAttribute]
        assert.debug('created', Post.name, post)

        assert.debug('find', Post.name, postId)
        post = await adapter.find(Post, postId, { 'with': ['tag'] })
        assert.debug('found', Post.name, post)

        assert.isDefined(post.tags, 'post.tags')
        assert.equal(post.content, 'test', 'post.content')
        assert.isDefined(post.tags[0][Tag.idAttribute], 'post.tags[0][Tag.idAttribute]')
        assert.isDefined(post.tags[1][Tag.idAttribute], 'post.tags[1][Tag.idAttribute]')
      })
      it('should load hasMany localKeys (empty array) relations', async function () {
        this.toClear.push('Post')
        let props = { content: 'test' }
        assert.debug('create', Post.name, props)
        let post = await adapter.create(Post, props)
        let postId = post[Post.idAttribute]
        assert.debug('created', Post.name, post)

        assert.debug('find', Post.name, postId)
        post = await adapter.find(Post, postId, { 'with': ['tag'] })
        assert.debug('found', Post.name, post)

        assert.isDefined(post.tags, 'post.tags')
        assert.equal(post.content, 'test', 'post.content')
        assert.deepEqual(post.tags, [], 'post.tags')
      })
      it('should load hasMany localKeys (object) relations', async function () {
        this.toClear.push('Post')
        this.toClear.push('Tag')
        let props = { value: 'big data' }
        assert.debug('create', Tag.name, props)
        const tag = await adapter.create(Tag, props)
        assert.debug('created', Tag.name, tag)

        props = { value: 'servers' }
        assert.debug('create', Tag.name, props)
        const tag2 = await adapter.create(Tag, props)
        assert.debug('created', Tag.name, tag2)

        props = { content: 'test', tagIds: { [tag[Tag.idAttribute]]: true, [tag2[Tag.idAttribute]]: true } }
        assert.debug('create', Post.name, props)
        let post = await adapter.create(Post, props)
        let postId = post[Post.idAttribute]
        assert.debug('created', Post.name, post)

        assert.debug('find', Post.name, postId)
        post = await adapter.find(Post, postId, { 'with': ['tag'] })
        assert.debug('found', Post.name)

        assert.isDefined(post.tags, 'post.tags')
        assert.equal(post.content, 'test', 'post.content')
        assert.isDefined(post.tags[0][Tag.idAttribute], 'post.tags[0][Tag.idAttribute]')
        assert.isDefined(post.tags[1][Tag.idAttribute], 'post.tags[1][Tag.idAttribute]')
      })
    }

    if (options.hasFeature('findHasManyForeignKeys')) {
      it('should load hasMany foreignKeys (array) relations', async function () {
        this.toClear.push('Post')
        this.toClear.push('Tag')
        let props = { value: 'big data' }
        assert.debug('create', Tag.name, props)
        let tag = await adapter.create(Tag, props)
        let tagId = tag[Tag.idAttribute]
        assert.debug('created', Tag.name, tag)

        props = { value: 'servers' }
        assert.debug('create', Tag.name, props)
        let tag2 = await adapter.create(Tag, props)
        let tag2Id = tag2[Tag.idAttribute]
        assert.debug('created', Tag.name, tag2)

        props = { content: 'test', tagIds: [tagId] }
        assert.debug('create', Post.name, props)
        let post = await adapter.create(Post, props)
        assert.debug('created', Post.name, post)

        props = { content: 'test2', tagIds: [tagId, tag2Id] }
        assert.debug('create', Post.name, props)
        let post2 = await adapter.create(Post, props)
        assert.debug('created', Post.name, post2)

        assert.debug('find', Tag.name, tagId)
        tag = await adapter.find(Tag, tagId, { 'with': ['post'] })
        assert.debug('found', Tag.name, tag)

        assert.isDefined(tag.posts, 'tag.posts')
        assert.equal(tag.value, 'big data', 'tag.value')
        assert.equal(tag.posts.length, 2, 'tag.posts.length')

        assert.debug('find', Tag.name, tag2Id)
        tag2 = await adapter.find(Tag, tag2Id, { 'with': ['post'] })
        assert.debug('found', Tag.name, tag2)

        assert.isDefined(tag2.posts, 'tag2.posts')
        assert.equal(tag2.value, 'servers', 'tag2.value')
        assert.equal(tag2.posts.length, 1, 'tag2.posts.length')
        assert.objectsEqual(tag2.posts, [post2], 'tag2.posts')
      })
    }
  })
}
