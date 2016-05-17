/* global assert:true */
export default function (options) {
  describe('Adapter.extend', function () {
    it('should exist', function () {
      assert.equal(typeof this.$$adapter.constructor.extend, 'function', 'adapter constructor function should have an "extend" method')
    })
    it('should return a subclass of the adapter class using extend', function () {
      const Adapter = this.$$adapter.constructor

      const SubAdapter = Adapter.extend({
        foo () {
          return 'foo'
        }
      }, {
        bar () {
          return 'bar'
        }
      })

      assert.equal(SubAdapter.bar(), 'bar', 'SubAdapter.bar() should return "bar"')
      try {
        assert.isTrue(SubAdapter.extend === Adapter.extend, 'should have same static methods')
      } catch (err) {
        assert.equal(typeof SubAdapter.extend, 'function', 'should have same static methods')
      }

      const subAdapter = new SubAdapter()

      assert.equal(subAdapter.foo(), 'foo', 'subAdapter.foo() should return "foo"')
      assert.isTrue(subAdapter.find === subAdapter.find, 'should have same instance methods')
    })
    it('should return a subclass of the adapter class using ES6 classes', function () {
      const Adapter = this.$$adapter.constructor

      class SubAdapter extends Adapter {
        foo () {
          return 'foo'
        }
        static bar () {
          return 'bar'
        }
      }

      assert.equal(SubAdapter.bar(), 'bar', 'SubAdapter.bar() should return "bar"')
      try {
        assert.isTrue(SubAdapter.extend === Adapter.extend, 'should have same static methods')
      } catch (err) {
        try {
          assert.equal(typeof SubAdapter.extend, 'function', 'should have same static methods')
        } catch (err) {
          var obj = {}
          if (obj.setPrototypeOf) {
            throw err
          }
        }
      }

      const subAdapter = new SubAdapter()

      assert.equal(subAdapter.foo(), 'foo', 'subAdapter.foo() should return "foo"')
      assert.isTrue(subAdapter.find === subAdapter.find, 'should have same instance methods')
    })
  })
}
