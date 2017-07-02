(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chai'), require('sinon')) :
	typeof define === 'function' && define.amd ? define('js-data-adapter-tests', ['chai', 'sinon'], factory) :
	(global.JSDataAdapterTests = factory(global.chai,global.sinon));
}(this, (function (chai,sinon$1) { 'use strict';

sinon$1 = sinon$1 && 'default' in sinon$1 ? sinon$1['default'] : sinon$1;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/* global assert:true */
var afterCreateTest = function (options) {
  describe('Adapter#afterCreate', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.afterCreate), 'function', 'adapter should have a "afterCreate" method');
    });
    it('should call afterCreate', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, props, user, args;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'afterCreate').callsFake(function (mapper, props, opts) {
                assert.isDefined(opts, 'afterCreate should have received options');
                assert.equal(opts.op, 'afterCreate', 'opts.op');
              });

              assert.debug('create', User.name, props);
              _context.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context.sent;

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.isTrue(adapter.afterCreate.calledOnce, 'afterCreate should have been called once');

              args = adapter.afterCreate.firstCall.args;

              assert.equal(args.length, 4, 'afterCreate should have received 4 arguments');
              assert.isTrue(args[0] === User, 'afterCreate should have received User mapper');
              assert.objectsEqual(args[1], { name: 'John' }, 'afterCreate should have received create props');
              assert.isObject(args[2], 'afterCreate should have received options');
              assert.isObject(args[3], 'afterCreate should have received record');
              adapter.afterCreate.restore();

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should allow re-assignment', asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var adapter, User, props, user, args;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'afterCreate').callsFake(function (mapper, props, opts) {
                assert.isDefined(opts, 'afterCreate should have received options');
                assert.equal(opts.op, 'afterCreate', 'opts.op');
                return 'foo';
              });

              assert.debug('create', User.name, props);
              _context2.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context2.sent;

              assert.debug('created', User.name, user);

              assert.equal(user, 'foo', 'result should be "foo"');

              assert.isTrue(adapter.afterCreate.calledOnce, 'afterCreate should have been called once');

              args = adapter.afterCreate.firstCall.args;

              assert.equal(args.length, 4, 'afterCreate should have received 4 arguments');
              assert.isTrue(args[0] === User, 'afterCreate should have received User mapper');
              assert.objectsEqual(args[1], { name: 'John' }, 'afterCreate should have received create props');
              assert.isObject(args[2], 'afterCreate should have received options');
              assert.isObject(args[3], 'afterCreate should have received record');
              adapter.afterCreate.restore();

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('should allow returning a promise', asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var adapter, User, props, user, args;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'afterCreate').callsFake(function (mapper, props, opts, record) {
                assert.isDefined(opts, 'afterCreate should have received options');
                assert.equal(opts.op, 'afterCreate', 'opts.op');
                return Promise.resolve();
              });

              assert.debug('create', User.name, props);
              _context3.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context3.sent;

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.isTrue(adapter.afterCreate.calledOnce, 'afterCreate should have been called once');

              args = adapter.afterCreate.firstCall.args;

              assert.equal(args.length, 4, 'afterCreate should have received 4 arguments');
              assert.isTrue(args[0] === User, 'afterCreate should have received User mapper');
              assert.objectsEqual(args[1], { name: 'John' }, 'afterCreate should have received create props');
              assert.isDefined(args[2], 'afterCreate should have received options');
              assert.isObject(args[3], 'afterCreate should have received record');
              adapter.afterCreate.restore();

            case 19:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('should allow returning a promise and re-assignment', asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var adapter, User, props, user, args;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'afterCreate').callsFake(function (mapper, props, opts) {
                assert.isDefined(opts, 'afterCreate should have received options');
                assert.equal(opts.op, 'afterCreate', 'opts.op');
                return 'foo';
              });

              assert.debug('create', User.name, props);
              _context4.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context4.sent;

              assert.debug('created', User.name, user);

              assert.equal(user, 'foo', 'result should be "foo"');

              assert.isTrue(adapter.afterCreate.calledOnce, 'afterCreate should have been called once');

              args = adapter.afterCreate.firstCall.args;

              assert.equal(args.length, 4, 'afterCreate should have received 4 arguments');
              assert.isTrue(args[0] === User, 'afterCreate should have received User mapper');
              assert.objectsEqual(args[1], { name: 'John' }, 'afterCreate should have received create props');
              assert.isObject(args[2], 'afterCreate should have received options');
              assert.isObject(args[3], 'afterCreate should have received record');
              adapter.afterCreate.restore();

            case 18:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
    it('should receive raw', asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
      var adapter, User, props, result, args;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'afterCreate').callsFake(function (mapper, props, opts) {
                assert.isDefined(opts, 'afterCreate should have received options');
                assert.equal(opts.op, 'afterCreate', 'opts.op');
              });

              assert.debug('create', User.name, props);
              _context5.next = 7;
              return adapter.create(User, props, { raw: true });

            case 7:
              result = _context5.sent;

              assert.debug('created', User.name, result);

              assert.equal(result.created, 1, 'result.created');
              assert.equal(result.data.name, props.name, 'result.data.name');
              assert.isDefined(result.data[User.idAttribute], 'result.data[' + User.idAttribute + ']');

              assert.isTrue(adapter.afterCreate.calledOnce, 'afterCreate should have been called once');

              args = adapter.afterCreate.firstCall.args;

              assert.equal(args.length, 4, 'afterCreate should have received 4 arguments');
              assert.isTrue(args[0] === User, 'afterCreate should have received User mapper');
              assert.objectsEqual(args[1], { name: 'John' }, 'afterCreate should have received create props');
              assert.isObject(args[2], 'afterCreate should have received options');
              assert.isObject(args[3], 'afterCreate should have received result');
              assert.equal(args[3].created, 1, 'result.created');
              assert.isObject(args[3].data, 'result.data');
              adapter.afterCreate.restore();

            case 22:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));
  });
};

/* global assert:true */
var afterUpdateTest = function (options) {
  describe('Adapter#afterUpdate', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.afterUpdate), 'function', 'adapter should have a "afterUpdate" method');
    });
    it('should call afterUpdate', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, props, user, userId, updatedUser, args;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'afterUpdate').callsFake(function (mapper, id, props, opts) {
                assert.isDefined(opts, 'afterUpdate should have received options');
                assert.equal(opts.op, 'afterUpdate', 'opts.op');
              });

              assert.debug('create', User.name, props);
              _context.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.debug('update', User.name, userId, { name: 'Johnny' });
              _context.next = 15;
              return adapter.update(User, userId, { name: 'Johnny' });

            case 15:
              updatedUser = _context.sent;

              assert.debug('updated', User.name, updatedUser);
              assert.equal(updatedUser.name, 'Johnny');
              assert.equal(updatedUser[User.idAttribute], userId);

              assert.isTrue(adapter.afterUpdate.calledOnce, 'afterUpdate should have been called once');

              args = adapter.afterUpdate.firstCall.args;

              assert.equal(args.length, 5, 'beforeUpdate should have received 5 arguments');
              assert.isTrue(args[0] === User, 'afterUpdate should have received User mapper');
              assert.isTrue(args[1] === userId, 'afterUpdate should have received user id');
              assert.objectsEqual(args[2], { name: 'Johnny' }, 'afterUpdate should have received update props');
              assert.isDefined(args[3], 'afterUpdate should have received options');
              assert.equal(args[3].op, 'afterUpdate', 'args[3].op');
              assert.isDefined(args[4], 'afterUpdate should have received updated record');
              assert.equal(args[4][User.idAttribute], userId, 'args[4].' + User.idAttribute);
              assert.equal(args[4].name, 'Johnny', 'args[4].name');
              adapter.afterUpdate.restore();

            case 31:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should receive raw', asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var adapter, User, props, user, userId, result, args;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'afterUpdate').callsFake(function (mapper, id, props, opts) {
                assert.isDefined(opts, 'afterUpdate should have received options');
                assert.equal(opts.op, 'afterUpdate', 'opts.op');
              });

              assert.debug('create', User.name, props);
              _context2.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context2.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.debug('update', User.name, userId, { name: 'Johnny' });
              _context2.next = 15;
              return adapter.update(User, userId, { name: 'Johnny' }, { raw: true });

            case 15:
              result = _context2.sent;

              assert.debug('updated', User.name, result);
              assert.isDefined(result.data, 'result.data');
              assert.equal(result.data.name, 'Johnny', result.data.name);
              assert.equal(result.data[User.idAttribute], userId, 'result.data.' + User.idAttribute);

              assert.isTrue(adapter.afterUpdate.calledOnce, 'afterUpdate should have been called once');

              args = adapter.afterUpdate.firstCall.args;

              assert.equal(args.length, 5, 'beforeUpdate should have received 5 arguments');
              assert.isTrue(args[0] === User, 'afterUpdate should have received User mapper');
              assert.isTrue(args[1] === userId, 'afterUpdate should have received user id');
              assert.objectsEqual(args[2], { name: 'Johnny' }, 'afterUpdate should have received update props');
              assert.isDefined(args[3], 'afterUpdate should have received options');
              assert.equal(args[3].op, 'afterUpdate', 'args[3].op');
              assert.isDefined(args[4], 'afterUpdate should have received update result');
              assert.equal(args[4].updated, 1, 'args[4].updated');
              assert.isDefined(args[4].data, 'args[4].data');
              assert.equal(args[4].data[User.idAttribute], userId, 'args[4].data.' + User.idAttribute);
              assert.equal(args[4].data.name, 'Johnny', 'args[4].data.name');
              adapter.afterUpdate.restore();

            case 34:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('should allow re-assignment', asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var adapter, User, props, user, userId, updatedUser, args;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'afterUpdate').callsFake(function (mapper, id, props, opts) {
                assert.isDefined(opts, 'afterUpdate should have received options');
                assert.equal(opts.op, 'afterUpdate', 'opts.op');
                return 'foo';
              });

              assert.debug('create', User.name, props);
              _context3.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context3.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.debug('update', User.name, userId, { name: 'Johnny' });
              _context3.next = 15;
              return adapter.update(User, userId, { name: 'Johnny' });

            case 15:
              updatedUser = _context3.sent;

              assert.debug('updated', User.name, updatedUser);
              assert.equal(updatedUser, 'foo', 'should have received re-assigned value');

              assert.isTrue(adapter.afterUpdate.calledOnce, 'afterUpdate should have been called once');

              args = adapter.afterUpdate.firstCall.args;

              assert.equal(args.length, 5, 'beforeUpdate should have received 5 arguments');
              assert.isTrue(args[0] === User, 'afterUpdate should have received User mapper');
              assert.isTrue(args[1] === userId, 'afterUpdate should have received user id');
              assert.objectsEqual(args[2], { name: 'Johnny' }, 'afterUpdate should have received update props');
              assert.isDefined(args[3], 'afterUpdate should have received options');
              assert.equal(args[3].op, 'afterUpdate', 'args[3].op');
              assert.isDefined(args[4], 'afterUpdate should have received updated record');
              assert.equal(args[4][User.idAttribute], userId, 'args[4].' + User.idAttribute);
              assert.equal(args[4].name, 'Johnny', 'args[4].name');
              adapter.afterUpdate.restore();

            case 30:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('should allow returning a promise', asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var adapter, User, props, user, userId, updatedUser, args;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'afterUpdate').callsFake(function (mapper, id, props, opts) {
                assert.isDefined(opts, 'afterUpdate should have received options');
                assert.equal(opts.op, 'afterUpdate', 'opts.op');
                return Promise.resolve();
              });

              assert.debug('create', User.name, props);
              _context4.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context4.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.debug('update', User.name, userId, { name: 'Johnny' });
              _context4.next = 15;
              return adapter.update(User, userId, { name: 'Johnny' });

            case 15:
              updatedUser = _context4.sent;

              assert.debug('updated', User.name, updatedUser);
              assert.equal(updatedUser.name, 'Johnny');
              assert.equal(updatedUser[User.idAttribute], userId);

              assert.isTrue(adapter.afterUpdate.calledOnce, 'afterUpdate should have been called once');

              args = adapter.afterUpdate.firstCall.args;

              assert.equal(args.length, 5, 'beforeUpdate should have received 5 arguments');
              assert.isTrue(args[0] === User, 'afterUpdate should have received User mapper');
              assert.isTrue(args[1] === userId, 'afterUpdate should have received user id');
              assert.objectsEqual(args[2], { name: 'Johnny' }, 'afterUpdate should have received update props');
              assert.isDefined(args[3], 'afterUpdate should have received options');
              assert.equal(args[3].op, 'afterUpdate', 'args[3].op');
              assert.isDefined(args[4], 'afterUpdate should have received updated record');
              assert.equal(args[4][User.idAttribute], userId, 'args[4].' + User.idAttribute);
              assert.equal(args[4].name, 'Johnny', 'args[4].name');
              adapter.afterUpdate.restore();

            case 31:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
    it('should allow returning a promise and re-assignment', asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
      var adapter, User, props, user, userId, updatedUser, args;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'afterUpdate').callsFake(function (mapper, id, props, opts) {
                assert.isDefined(opts, 'afterUpdate should have received options');
                assert.equal(opts.op, 'afterUpdate', 'opts.op');
                return Promise.resolve('foo');
              });

              assert.debug('create', User.name, props);
              _context5.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context5.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.debug('update', User.name, userId, { name: 'Johnny' });
              _context5.next = 15;
              return adapter.update(User, userId, { name: 'Johnny' });

            case 15:
              updatedUser = _context5.sent;

              assert.debug('updated', User.name, updatedUser);
              assert.equal(updatedUser, 'foo', 'should have received re-assigned value');

              assert.isTrue(adapter.afterUpdate.calledOnce, 'afterUpdate should have been called once');

              args = adapter.afterUpdate.firstCall.args;

              assert.equal(args.length, 5, 'beforeUpdate should have received 5 arguments');
              assert.isTrue(args[0] === User, 'afterUpdate should have received User mapper');
              assert.isTrue(args[1] === userId, 'afterUpdate should have received user id');
              assert.objectsEqual(args[2], { name: 'Johnny' }, 'afterUpdate should have received update props');
              assert.isDefined(args[3], 'afterUpdate should have received options');
              assert.equal(args[3].op, 'afterUpdate', 'args[3].op');
              assert.isDefined(args[4], 'afterUpdate should have received updated record');
              assert.equal(args[4][User.idAttribute], userId, 'args[4].' + User.idAttribute);
              assert.equal(args[4].name, 'Johnny', 'args[4].name');
              adapter.afterUpdate.restore();

            case 30:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));
  });
};

/* global assert:true */
var beforeCreateTest = function (options) {
  describe('Adapter#beforeCreate', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.beforeCreate), 'function', 'adapter should have a "beforeCreate" method');
    });
    it('should call beforeCreate', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, props, user, args;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'beforeCreate').callsFake(function (mapper, props, opts) {
                assert.isDefined(opts, 'beforeCreate should have received options');
                assert.equal(opts.op, 'beforeCreate', 'opts.op');
              });

              assert.debug('create', User.name, props);
              _context.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context.sent;

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.isTrue(adapter.beforeCreate.calledOnce, 'beforeCreate should have been called once');

              args = adapter.beforeCreate.firstCall.args;

              assert.equal(args.length, 3, 'beforeCreate should have received 3 arguments');
              assert.isTrue(args[0] === User, 'beforeCreate should have received User mapper');
              assert.objectsEqual(args[1], { name: 'John' }, 'beforeCreate should have received create props');
              assert.isObject(args[2], 'beforeCreate should have received options');
              adapter.beforeCreate.restore();

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should allow re-assignment', asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var adapter, User, props, user, args;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'beforeCreate').callsFake(function (mapper, props, opts) {
                assert.isDefined(opts, 'beforeCreate should have received options');
                assert.equal(opts.op, 'beforeCreate', 'opts.op');
                return { name: 'Sally' };
              });

              assert.debug('create', User.name, props);
              _context2.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context2.sent;

              assert.debug('created', User.name, user);

              assert.equal(user.name, 'Sally', 'name of user should be "Sally"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.isTrue(adapter.beforeCreate.calledOnce, 'beforeCreate should have been called once');

              args = adapter.beforeCreate.firstCall.args;

              assert.equal(args.length, 3, 'beforeCreate should have received 3 arguments');
              assert.isTrue(args[0] === User, 'beforeCreate should have received User mapper');
              assert.objectsEqual(args[1], { name: 'John' }, 'beforeCreate should have received create props');
              assert.isObject(args[2], 'beforeCreate should have received options');
              adapter.beforeCreate.restore();

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('should allow returning a promise', asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var adapter, User, props, user, args;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'beforeCreate').callsFake(function (mapper, props, opts) {
                assert.isDefined(opts, 'beforeCreate should have received options');
                assert.equal(opts.op, 'beforeCreate', 'opts.op');
                return Promise.resolve();
              });

              assert.debug('create', User.name, props);
              _context3.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context3.sent;

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.isTrue(adapter.beforeCreate.calledOnce, 'beforeCreate should have been called once');

              args = adapter.beforeCreate.firstCall.args;

              assert.equal(args.length, 3, 'beforeCreate should have received 3 arguments');
              assert.isTrue(args[0] === User, 'beforeCreate should have received User mapper');
              assert.objectsEqual(args[1], { name: 'John' }, 'beforeCreate should have received create props');
              assert.isDefined(args[2], 'beforeCreate should have received options');
              adapter.beforeCreate.restore();

            case 18:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('should allow returning a promise and re-assignment', asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var adapter, User, props, user, args;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'beforeCreate').callsFake(function (mapper, props, opts) {
                assert.isDefined(opts, 'beforeCreate should have received options');
                assert.equal(opts.op, 'beforeCreate', 'opts.op');
                return Promise.resolve({ name: 'Sally' });
              });

              assert.debug('create', User.name, props);
              _context4.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context4.sent;

              assert.debug('created', User.name, user);

              assert.equal(user.name, 'Sally', 'name of user should be "Sally"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.isTrue(adapter.beforeCreate.calledOnce, 'beforeCreate should have been called once');

              args = adapter.beforeCreate.firstCall.args;

              assert.equal(args.length, 3, 'beforeCreate should have received 3 arguments');
              assert.isTrue(args[0] === User, 'beforeCreate should have received User mapper');
              assert.objectsEqual(args[1], { name: 'John' }, 'beforeCreate should have received create props');
              assert.isObject(args[2], 'beforeCreate should have received options');
              adapter.beforeCreate.restore();

            case 18:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
  });
};

/* global assert:true */
var beforeUpdateTest = function (options) {
  describe('Adapter#beforeUpdate', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.beforeUpdate), 'function', 'adapter should have a "beforeUpdate" method');
    });
    it('should call beforeUpdate', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, props, user, userId, updatedUser, args;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'beforeUpdate').callsFake(function (mapper, id, props, opts) {
                assert.isDefined(opts, 'beforeUpdate should have received options');
                assert.equal(opts.op, 'beforeUpdate', 'opts.op');
              });

              assert.debug('create', User.name, props);
              _context.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.debug('update', User.name, userId, { name: 'Johnny' });
              _context.next = 15;
              return adapter.update(User, userId, { name: 'Johnny' });

            case 15:
              updatedUser = _context.sent;

              assert.debug('updated', User.name, updatedUser);
              assert.equal(updatedUser.name, 'Johnny');
              assert.equal(updatedUser[User.idAttribute], userId);

              assert.isTrue(adapter.beforeUpdate.calledOnce, 'beforeUpdate should have been called once');

              args = adapter.beforeUpdate.firstCall.args;

              assert.equal(args.length, 4, 'beforeUpdate should have received 4 arguments');
              assert.isTrue(args[0] === User, 'beforeUpdate should have received User mapper');
              assert.isTrue(args[1] === userId, 'beforeUpdate should have received user id');
              assert.objectsEqual(args[2], { name: 'Johnny' }, 'beforeUpdate should have received update props');
              assert.isObject(args[3], 'beforeUpdate should have received options');
              adapter.beforeUpdate.restore();

            case 27:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should allow re-assignment', asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var adapter, User, props, user, userId, updatedUser, args;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'beforeUpdate').callsFake(function (mapper, id, props, opts) {
                assert.isDefined(opts, 'beforeUpdate should have received options');
                assert.equal(opts.op, 'beforeUpdate', 'opts.op');
                return { name: 'Sally' };
              });

              assert.debug('create', User.name, props);
              _context2.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context2.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.debug('update', User.name, userId, { name: 'Johnny' });
              _context2.next = 15;
              return adapter.update(User, userId, { name: 'Johnny' });

            case 15:
              updatedUser = _context2.sent;

              assert.debug('updated', User.name, updatedUser);
              assert.equal(updatedUser.name, 'Sally');
              assert.equal(updatedUser[User.idAttribute], userId);

              assert.isTrue(adapter.beforeUpdate.calledOnce, 'beforeUpdate should have been called once');

              args = adapter.beforeUpdate.firstCall.args;

              assert.equal(args.length, 4, 'beforeUpdate should have received 4 arguments');
              assert.isTrue(args[0] === User, 'beforeUpdate should have received User mapper');
              assert.isTrue(args[1] === userId, 'beforeUpdate should have received user id');
              assert.objectsEqual(args[2], { name: 'Johnny' }, 'beforeUpdate should have received update props');
              assert.isObject(args[3], 'beforeUpdate should have received options');
              adapter.beforeUpdate.restore();

            case 27:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('should allow returning a promise', asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var adapter, User, props, user, userId, updatedUser, args;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'beforeUpdate').callsFake(function (mapper, id, props, opts) {
                assert.isDefined(opts, 'beforeUpdate should have received options');
                assert.equal(opts.op, 'beforeUpdate', 'opts.op');
                return Promise.resolve();
              });

              assert.debug('create', User.name, props);
              _context3.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context3.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.debug('update', User.name, userId, { name: 'Johnny' });
              _context3.next = 15;
              return adapter.update(User, userId, { name: 'Johnny' });

            case 15:
              updatedUser = _context3.sent;

              assert.debug('updated', User.name, updatedUser);
              assert.equal(updatedUser.name, 'Johnny');
              assert.equal(updatedUser[User.idAttribute], userId);

              assert.isTrue(adapter.beforeUpdate.calledOnce, 'beforeUpdate should have been called once');

              args = adapter.beforeUpdate.firstCall.args;

              assert.equal(args.length, 4, 'beforeUpdate should have received 4 arguments');
              assert.isTrue(args[0] === User, 'beforeUpdate should have received User mapper');
              assert.isTrue(args[1] === userId, 'beforeUpdate should have received user id');
              assert.objectsEqual(args[2], { name: 'Johnny' }, 'beforeUpdate should have received update props');
              assert.isObject(args[3], 'beforeUpdate should have received options');
              adapter.beforeUpdate.restore();

            case 27:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('should allow returning a promise and re-assignment', asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var adapter, User, props, user, userId, updatedUser, args;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              sinon.stub(adapter, 'beforeUpdate').callsFake(function (mapper, id, props, opts) {
                assert.isDefined(opts, 'beforeUpdate should have received options');
                assert.equal(opts.op, 'beforeUpdate', 'opts.op');
                return Promise.resolve({ name: 'Sally' });
              });

              assert.debug('create', User.name, props);
              _context4.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context4.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.debug('update', User.name, userId, { name: 'Johnny' });
              _context4.next = 15;
              return adapter.update(User, userId, { name: 'Johnny' });

            case 15:
              updatedUser = _context4.sent;

              assert.debug('updated', User.name, updatedUser);
              assert.equal(updatedUser.name, 'Sally');
              assert.equal(updatedUser[User.idAttribute], userId);

              assert.isTrue(adapter.beforeUpdate.calledOnce, 'beforeUpdate should have been called once');

              args = adapter.beforeUpdate.firstCall.args;

              assert.equal(args.length, 4, 'beforeUpdate should have received 4 arguments');
              assert.isTrue(args[0] === User, 'beforeUpdate should have received User mapper');
              assert.isTrue(args[1] === userId, 'beforeUpdate should have received user id');
              assert.objectsEqual(args[2], { name: 'Johnny' }, 'beforeUpdate should have received update props');
              assert.isObject(args[3], 'beforeUpdate should have received options');
              adapter.beforeUpdate.restore();

            case 27:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
  });
};

/* global assert:true */
var countTest = function (options) {
  describe('Adapter#count', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.count), 'function', 'adapter should have a "count" method');
    });
    it('should count users', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, props, count, user, user2;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              assert.debug('count', User.name, {});
              _context.next = 6;
              return adapter.count(User);

            case 6:
              count = _context.sent;

              assert.debug('counted', User.name, count);
              assert.equal(count, 0);

              assert.debug('count', User.name, { name: 'John' });
              _context.next = 12;
              return adapter.count(User, { name: 'John' });

            case 12:
              count = _context.sent;

              assert.debug('counted', User.name, count);
              assert.equal(count, 0);

              assert.debug('count', User.name, { name: 'Sally' });
              _context.next = 18;
              return adapter.count(User, { name: 'Sally' });

            case 18:
              count = _context.sent;

              assert.debug('counted', User.name, count);
              assert.equal(count, 0);

              assert.debug('create', User.name, props);
              _context.next = 24;
              return adapter.create(User, props);

            case 24:
              user = _context.sent;

              assert.debug('created', User.name, user);

              assert.debug('count', User.name, {});
              _context.next = 29;
              return adapter.count(User);

            case 29:
              count = _context.sent;

              assert.debug('counted', User.name, count);
              assert.equal(count, 1);

              assert.debug('count', User.name, { name: 'John' });
              _context.next = 35;
              return adapter.count(User, { name: 'John' });

            case 35:
              count = _context.sent;

              assert.debug('counted', User.name, count);
              assert.equal(count, 1);

              assert.debug('count', User.name, { name: 'Sally' });
              _context.next = 41;
              return adapter.count(User, { name: 'Sally' });

            case 41:
              count = _context.sent;

              assert.debug('counted', User.name, count);
              assert.equal(count, 0);

              assert.debug('create', User.name, { name: 'Sally' });
              _context.next = 47;
              return adapter.create(User, { name: 'Sally' });

            case 47:
              user2 = _context.sent;

              assert.debug('created', User.name, user2);

              assert.debug('count', User.name, {});
              _context.next = 52;
              return adapter.count(User);

            case 52:
              count = _context.sent;

              assert.debug('counted', User.name, count);
              assert.equal(count, 2);

              assert.debug('count', User.name, { name: 'John' });
              _context.next = 58;
              return adapter.count(User, { name: 'John' });

            case 58:
              count = _context.sent;

              assert.debug('counted', User.name, count);
              assert.equal(count, 1);

              assert.debug('count', User.name, { name: 'Sally' });
              _context.next = 64;
              return adapter.count(User, { name: 'Sally' });

            case 64:
              count = _context.sent;

              assert.debug('counted', User.name, count);
              assert.equal(count, 1);

            case 67:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should count users and return raw', asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var adapter, User, props, user, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              assert.debug('create', User.name, props);
              _context2.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context2.sent;

              assert.debug('created', User.name, user);

              assert.debug('count', User.name, props);
              _context2.next = 11;
              return adapter.count(User, props, { raw: true });

            case 11:
              result = _context2.sent;

              assert.debug('counted', User.name, result);
              assert.equal(result.data, 1, 'result.data');

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
  });
};

/* global assert:true */
var createTest = function (options) {
  describe('Adapter#create', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.create), 'function', 'adapter should have a "create" method');
    });
    it('should create a user', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, props, user, userId, foundUser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              assert.debug('create', User.name, props);
              _context.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'user.name');
              assert.isDefined(user[User.idAttribute], 'user[User.idAttribute]');

              assert.debug('find', User.name, userId);
              _context.next = 14;
              return adapter.find(User, userId);

            case 14:
              foundUser = _context.sent;

              assert.debug('found', User.name, foundUser);

              assert.equal(foundUser.name, props.name, 'foundUser.name');
              assert.isDefined(foundUser[User.idAttribute], 'foundUser[User.idAttribute]');
              assert.equal(foundUser[User.idAttribute], userId, 'foundUser[User.idAttribute]');

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
  });
};

/* global assert:true */
var createManyTest = function (options) {
  describe('Adapter#createMany', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.createMany), 'function', 'adapter should have a "createMany" method');
    });
    it('should create multiple users', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, user1, user2, users, users3;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              user1 = { name: 'John', age: 20 };
              user2 = { name: 'John', age: 30 };


              assert.debug('createMany', User.name, [user1, user2]);
              _context.next = 7;
              return adapter.createMany(User, [user1, user2]);

            case 7:
              users = _context.sent;

              assert.debug('created', User.name, users);
              users.sort(function (a, b) {
                return a.age - b.age;
              });
              assert.isDefined(users[0][User.idAttribute]);
              assert.isDefined(users[1][User.idAttribute]);
              assert.equal(users.filter(function (x) {
                return x.age === 20;
              }).length, 1);
              assert.equal(users.filter(function (x) {
                return x.age === 30;
              }).length, 1);

              assert.debug('findAll', User.name, { age: 20 });
              _context.next = 17;
              return adapter.findAll(User, { age: 20 });

            case 17:
              users3 = _context.sent;

              assert.debug('found', User.name, users3);
              assert.equal(users3.length, 1);

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
  });
};

/* global assert:true */
var destroyTest = function (options) {
  describe('Adapter#destroy', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.destroy), 'function', 'adapter should have a "destroy" method');
    });
    it('should destroy a user', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, props, user, userId, beforeDestroyCalled, afterDestroyCalled, destroyedUser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              assert.debug('create', User.name, props);
              _context.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              beforeDestroyCalled = false;
              afterDestroyCalled = false;

              // Test beforeDestroy and afterDestroy

              adapter.beforeDestroy = function (mapper, id, opts) {
                beforeDestroyCalled = true;
                assert.isObject(mapper, 'beforeDestroy should have received mapper argument');
                assert.isDefined(id, 'beforeDestroy should have received id argument');
                assert.isObject(opts, 'beforeDestroy should have received opts argument');
                // Test re-assignment
                return Promise.resolve();
              };
              adapter.afterDestroy = function (mapper, id, opts) {
                afterDestroyCalled = true;
                assert.isObject(mapper, 'afterDestroy should have received mapper argument');
                assert.isDefined(id, 'afterDestroy should have received id argument');
                assert.isObject(opts, 'afterDestroy should have received opts argument');
                // Test re-assignment
                return Promise.resolve();
              };

              assert.debug('destroy', User.name, userId);
              _context.next = 16;
              return adapter.destroy(User, userId);

            case 16:
              destroyedUser = _context.sent;

              assert.debug('destroyed', User.name, destroyedUser);
              assert.isUndefined(destroyedUser, 'destroyedUser');
              assert.isTrue(beforeDestroyCalled, 'beforeDestroy should have been called');
              assert.isTrue(afterDestroyCalled, 'afterDestroy should have been called');

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should destroy a user and allow afterDestroy re-assignment', asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var adapter, User, props, user, userId, beforeDestroyCalled, afterDestroyCalled, destroyedUser;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              assert.debug('create', User.name, props);
              _context2.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context2.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              beforeDestroyCalled = false;
              afterDestroyCalled = false;

              // Test beforeDestroy and afterDestroy

              adapter.beforeDestroy = function (mapper, id, opts) {
                beforeDestroyCalled = true;
                assert.isObject(mapper, 'beforeDestroy should have received mapper argument');
                assert.isDefined(id, 'beforeDestroy should have received id argument');
                assert.isObject(opts, 'beforeDestroy should have received opts argument');
                // Test re-assignment
                return Promise.resolve();
              };
              adapter.afterDestroy = function (mapper, id, opts) {
                afterDestroyCalled = true;
                assert.isObject(mapper, 'afterDestroy should have received mapper argument');
                assert.isDefined(id, 'afterDestroy should have received id argument');
                assert.isObject(opts, 'afterDestroy should have received opts argument');
                // Test re-assignment
                return Promise.resolve('foo');
              };

              assert.debug('destroy', User.name, userId);
              _context2.next = 16;
              return adapter.destroy(User, userId, { raw: true });

            case 16:
              destroyedUser = _context2.sent;

              assert.debug('destroyed', User.name, destroyedUser);
              assert.equal(destroyedUser, 'foo', 'destroyedUser');
              assert.isTrue(beforeDestroyCalled, 'beforeDestroy should have been called');
              assert.isTrue(afterDestroyCalled, 'afterDestroy should have been called');

            case 21:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('should destroy a user and return raw', asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var adapter, User, props, user, userId, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              assert.debug('create', User.name, props);
              _context3.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context3.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.debug('destroy', User.name, userId);
              _context3.next = 12;
              return adapter.destroy(User, userId, { raw: true });

            case 12:
              result = _context3.sent;

              assert.debug('destroyed', User.name, result);
              assert.isUndefined(result.data, 'result.data');
              if (result.hasOwnProperty('deleted')) {
                assert.isDefined(result.deleted, 'result.deleted');
                assert.equal(result.deleted, 1, 'result.deleted');
              }

            case 16:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('should destroy nothing', asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var adapter, User, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;


              assert.debug('destroy', User.name, 'non-existent-id');
              _context4.next = 5;
              return adapter.destroy(User, 'non-existent-id');

            case 5:
              result = _context4.sent;

              assert.debug('destroyed', User.name, result);
              assert.isUndefined(result, 'result');

            case 8:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
    it('should destroy nothing and return raw', asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
      var adapter, User, result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;


              assert.debug('destroy', User.name, 'non-existent-id');
              _context5.next = 5;
              return adapter.destroy(User, 'non-existent-id', { raw: true });

            case 5:
              result = _context5.sent;

              assert.debug('destroyed', User.name, result);
              assert.isUndefined(result.data, 'result.data');
              if (result.hasOwnProperty('deleted')) {
                assert.isDefined(result.deleted, 'result.deleted');
                assert.equal(result.deleted, 0, 'result.deleted');
              }

            case 9:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));
  });
};

/* global assert:true */
var destroyAllTest = function (options) {
  describe('Adapter#destroyAll', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.destroyAll), 'function', 'adapter should have a "destroyAll" method');
    });
    it('should destroy all users', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, props, user, userId, user2, foundUsers, destroyedUsers;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              assert.debug('create', User.name, props);
              _context.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context.sent;
              userId = user[User.idAttribute];

              assert.debug('created', User.name, user);

              assert.debug('create', User.name, { name: 'Sally' });
              _context.next = 12;
              return adapter.create(User, { name: 'Sally' });

            case 12:
              user2 = _context.sent;

              assert.debug('created', User.name, user2);

              assert.debug('findAll', User.name, { name: 'John' });
              _context.next = 17;
              return adapter.findAll(User, { name: 'John' });

            case 17:
              foundUsers = _context.sent;

              assert.debug('found', User.name, foundUsers);
              assert.equal(foundUsers.length, 1, 'foundUsers.length');
              assert.equal(foundUsers[0][User.idAttribute], userId, 'foundUsers[0][User.idAttribute]');
              assert.equal(foundUsers[0].name, 'John', 'foundUsers[0].name');

              assert.debug('destroyAll', User.name, { name: 'John' });
              _context.next = 25;
              return adapter.destroyAll(User, { name: 'John' });

            case 25:
              destroyedUsers = _context.sent;

              assert.debug('destroyed', User.name, destroyedUsers);
              assert.isUndefined(destroyedUsers, 'destroyedUsers');

              assert.debug('findAll', User.name, { name: 'John' });
              _context.next = 31;
              return adapter.findAll(User, { name: 'John' });

            case 31:
              foundUsers = _context.sent;

              assert.debug('found', User.name, foundUsers);
              assert.equal(foundUsers.length, 0);

              assert.debug('findAll', User.name, {});
              _context.next = 37;
              return adapter.findAll(User, {});

            case 37:
              foundUsers = _context.sent;

              assert.debug('found', User.name, foundUsers);
              assert.equal(foundUsers.length, 1);

            case 40:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should destroy users and return raw', asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var adapter, User, props, user, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              assert.debug('create', User.name, props);
              _context2.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context2.sent;

              assert.debug('created', User.name, user);

              assert.debug('destroyAll', User.name, props);
              _context2.next = 11;
              return adapter.destroyAll(User, props, { raw: true });

            case 11:
              result = _context2.sent;

              assert.debug('destroyed', User.name, result);
              assert.isUndefined(result.data, 'result.data');
              if (result.hasOwnProperty('deleted')) {
                assert.isDefined(result.deleted, 'result.deleted');
                assert.equal(result.deleted, 1, 'result.deleted');
              }

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('should destroy nothing', asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var adapter, User, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;


              assert.debug('destroyAll', User.name, {});
              _context3.next = 5;
              return adapter.destroyAll(User, {});

            case 5:
              result = _context3.sent;

              assert.debug('destroyed', User.name, result);
              assert.isUndefined(result, 'result');

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('should destroy nothing and return raw', asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var adapter, User, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;


              assert.debug('destroyAll', User.name, {});
              _context4.next = 5;
              return adapter.destroyAll(User, {}, { raw: true });

            case 5:
              result = _context4.sent;

              assert.debug('destroyed', User.name, result);
              assert.isUndefined(result.data, 'result.data');
              if (result.hasOwnProperty('deleted')) {
                assert.isDefined(result.deleted, 'result.deleted');
                assert.equal(result.deleted, 0, 'result.deleted');
              }

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
  });
};

/* global assert:true */
var extendTest = function (options) {
  describe('Adapter.extend', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.constructor.extend), 'function', 'adapter constructor function should have an "extend" method');
    });
    it('should return a subclass of the adapter class using extend', function () {
      var Adapter = this.$$adapter.constructor;

      var SubAdapter = Adapter.extend({
        foo: function foo() {
          return 'foo';
        }
      }, {
        bar: function bar() {
          return 'bar';
        }
      });

      assert.equal(SubAdapter.bar(), 'bar', 'SubAdapter.bar() should return "bar"');
      try {
        assert.isTrue(SubAdapter.extend === Adapter.extend, 'should have same static methods');
      } catch (err) {
        assert.equal(_typeof(SubAdapter.extend), 'function', 'should have same static methods');
      }

      var subAdapter = new SubAdapter();

      assert.equal(subAdapter.foo(), 'foo', 'subAdapter.foo() should return "foo"');
      assert.isTrue(subAdapter.find === subAdapter.find, 'should have same instance methods');
    });
    it('should return a subclass of the adapter class using ES6 classes', function () {
      var Adapter = this.$$adapter.constructor;

      var SubAdapter = function (_Adapter) {
        inherits(SubAdapter, _Adapter);

        function SubAdapter() {
          classCallCheck(this, SubAdapter);
          return possibleConstructorReturn(this, (SubAdapter.__proto__ || Object.getPrototypeOf(SubAdapter)).apply(this, arguments));
        }

        createClass(SubAdapter, [{
          key: 'foo',
          value: function foo() {
            return 'foo';
          }
        }], [{
          key: 'bar',
          value: function bar() {
            return 'bar';
          }
        }]);
        return SubAdapter;
      }(Adapter);

      assert.equal(SubAdapter.bar(), 'bar', 'SubAdapter.bar() should return "bar"');
      try {
        assert.isTrue(SubAdapter.extend === Adapter.extend, 'should have same static methods');
      } catch (err) {
        try {
          assert.equal(_typeof(SubAdapter.extend), 'function', 'should have same static methods');
        } catch (err) {
          var obj = {};
          if (obj.setPrototypeOf) {
            throw err;
          }
        }
      }

      var subAdapter = new SubAdapter();

      assert.equal(subAdapter.foo(), 'foo', 'subAdapter.foo() should return "foo"');
      assert.isTrue(subAdapter.find === subAdapter.find, 'should have same instance methods');
    });
  });
};

/* global assert:true */
var findTest = function (options) {
  describe('Adapter#find', function () {
    var adapter, User, Profile, Post, Comment, Tag;

    beforeEach(function () {
      adapter = this.$$adapter;
      User = this.$$User;
      Profile = this.$$Profile;
      Post = this.$$Post;
      Comment = this.$$Comment;
      Tag = this.$$Tag;
    });

    it('should exist', function () {
      assert.equal(_typeof(adapter.find), 'function', 'adapter should have a "find" method');
    });

    it('should find a user', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var props, user, userId, beforeFindCalled, afterFindCalled, foundUser, post, postId, comments, foundPost;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.toClear.push('Post');
              this.toClear.push('Comment');
              props = { name: 'John' };

              assert.debug('create', User.name, props);
              _context.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context.sent;

              assert.debug('created', User.name, user);
              userId = user[User.idAttribute];

              assert.equal(user.name, 'John', 'user.name');
              assert.isDefined(user[User.idAttribute], 'user[User.idAttribute]');

              // Test beforeFind and afterFind
              beforeFindCalled = false;
              afterFindCalled = false;

              adapter.beforeFind = function (mapper, id, opts) {
                beforeFindCalled = true;
                assert.isObject(mapper, 'beforeFind should have received mapper argument');
                assert.isDefined(id, 'beforeFind should have received id argument');
                assert.equal(id, userId, 'beforeFind should have received correct id argument');
                assert.isObject(opts, 'beforeFind should have received opts argument');
                // Optionally return a promise for async
                return Promise.resolve();
              };
              adapter.afterFind = function (mapper, id, opts, record) {
                afterFindCalled = true;
                assert.isObject(mapper, 'afterFind should have received mapper argument');
                assert.isDefined(id, 'afterFind should have received id argument');
                assert.equal(id, userId, 'afterFind should have received correct id argument');
                assert.isObject(opts, 'afterFind should have received opts argument');
                assert.isObject(record, 'afterFind should have received record argument');
                // Optionally return a promise for async
                return Promise.resolve();
              };

              assert.debug('find', User.name, userId);
              _context.next = 18;
              return adapter.find(User, userId);

            case 18:
              foundUser = _context.sent;

              assert.debug('found', User.name, foundUser);
              assert.equal(foundUser.name, 'John', 'name of found user should be "John"');
              assert.equal(foundUser[User.idAttribute], userId, 'found user should have correct id');
              assert.isTrue(beforeFindCalled, 'beforeFind should have been called');
              assert.isTrue(afterFindCalled, 'afterFind should have been called');

              // should allow re-assignment
              beforeFindCalled = false;
              afterFindCalled = false;
              adapter.afterFind = function (mapper, id, opts, record) {
                afterFindCalled = true;
                assert.isObject(mapper, 'afterFind should have received mapper argument');
                assert.isDefined(id, 'afterFind should have received id argument');
                assert.equal(id, userId, 'afterFind should have received correct id argument');
                assert.isObject(opts, 'afterFind should have received opts argument');
                assert.isObject(record, 'afterFind should have received record argument');
                // Test re-assignment
                return Promise.resolve(defineProperty({ name: 'Sally' }, User.idAttribute, userId));
              };

              assert.debug('find', User.name, userId);
              _context.next = 30;
              return adapter.find(User, userId);

            case 30:
              foundUser = _context.sent;

              assert.debug('found', User.name, foundUser);
              assert.equal(foundUser.name, 'Sally', 'foundUser.name');
              assert.equal(foundUser[User.idAttribute], userId, 'foundUser[User.idAttribute]');
              assert.isTrue(beforeFindCalled, 'beforeFind should have been called');
              assert.isTrue(afterFindCalled, 'afterFind should have been called');
              // clear hooks
              delete adapter.beforeFind;
              delete adapter.afterFind;

              props = { content: 'test', userId: userId };
              assert.debug('create', Post.name, props);
              _context.next = 42;
              return adapter.create(Post, props);

            case 42:
              post = _context.sent;

              assert.debug('created', Post.name, post);
              postId = post[Post.idAttribute];


              assert.equal(post.content, 'test', 'post.content');
              assert.isDefined(post[Post.idAttribute], 'post[Post.idAttribute]');
              assert.equal(post.userId, userId, 'post.userId');

              props = [{
                content: 'test2',
                postId: postId,
                userId: userId
              }, {
                content: 'test3',
                postId: postId,
                userId: userId
              }];
              assert.debug('create', Comment.name, props);
              _context.next = 52;
              return Promise.all([adapter.create(Comment, props[0]), adapter.create(Comment, props[1])]);

            case 52:
              comments = _context.sent;

              assert.debug('created', Comment.name, comments);

              comments.sort(function (a, b) {
                return a.content > b.content;
              });

              assert.debug('find', Post.name, postId);
              _context.next = 58;
              return adapter.find(Post, postId, { with: ['user', 'comment'] });

            case 58:
              foundPost = _context.sent;

              assert.debug('found', Post.name, foundPost);
              foundPost.comments.sort(function (a, b) {
                return a.content > b.content;
              });
              assert.equalObjects(foundPost.user, user, 'foundPost.user');
              assert.equalObjects(foundPost.comments, comments, 'foundPost.comments');

            case 63:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));

    it('should return raw', asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var props, user, userId, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              props = { name: 'John' };

              assert.debug('create', User.name, props);
              _context2.next = 4;
              return adapter.create(User, props);

            case 4:
              user = _context2.sent;

              assert.debug('created', User.name, user);
              userId = user[User.idAttribute];

              assert.equal(user.name, 'John', 'user.name');
              assert.isDefined(user[User.idAttribute], 'user[User.idAttribute]');

              assert.debug('find', User.name, userId);
              _context2.next = 12;
              return adapter.find(User, userId, { raw: true });

            case 12:
              result = _context2.sent;

              assert.debug('found', User.name, result);
              assert.isDefined(result.data, 'result.data');
              assert.isDefined(result.found, 'result.found');
              assert.equal(result.data.name, 'John', 'result.data.name');
              assert.equal(result.data[User.idAttribute], userId, 'result.data.' + User.idAttribute);
              assert.equal(result.found, 1, 'result.found');

            case 19:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));

    it('should return nothing', asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              assert.debug('find', User.name, 'non-existent-id');
              _context3.next = 3;
              return adapter.find(User, 'non-existent-id');

            case 3:
              result = _context3.sent;

              assert.debug('found', User.name, result);
              assert.isUndefined(result, 'result');

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));

    it('should return raw and nothing', asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              assert.debug('find', User.name, 'non-existent-id');
              _context4.next = 3;
              return adapter.find(User, 'non-existent-id', { raw: true });

            case 3:
              result = _context4.sent;

              assert.debug('found', User.name, result);
              assert.isUndefined(result.data, 'result.data');
              assert.isDefined(result.found, 'result.found');
              assert.equal(result.found, 0, 'result.found');

            case 8:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));

    it('should load belongsTo relations', asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
      var props, user, profile, post, comment;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.toClear.push('Post');
              this.toClear.push('Comment');
              this.toClear.push('Profile');
              props = { name: 'John' };

              assert.debug('create', User.name, props);
              _context5.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context5.sent;

              assert.debug('created', User.name, user);

              props = { email: 'foo@test.com', userId: user[User.idAttribute] };
              assert.debug('create', Profile.name, props);
              _context5.next = 13;
              return adapter.create(Profile, props);

            case 13:
              profile = _context5.sent;

              assert.debug('created', Profile.name, profile);

              props = { content: 'foo', userId: user[User.idAttribute] };
              assert.debug('create', Post.name, props);
              _context5.next = 19;
              return adapter.create(Post, props);

            case 19:
              post = _context5.sent;

              assert.debug('created', Post.name, post);

              props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
              assert.debug('create', Comment.name, props);
              _context5.next = 25;
              return adapter.create(Comment, props);

            case 25:
              comment = _context5.sent;

              assert.debug('created', Comment.name, comment);

              assert.debug('find', Comment.name, comment[Comment.idAttribute]);
              _context5.next = 30;
              return adapter.find(Comment, comment[Comment.idAttribute], { 'with': ['user', 'post'] });

            case 30:
              comment = _context5.sent;

              assert.debug('found', Comment.name, comment);

              assert.isDefined(comment, 'comment');
              assert.isDefined(comment.post, 'comment.post');
              assert.isDefined(comment.user, 'comment.user');

            case 35:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));

    it('should load belongsTo relations and filter sub queries', asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
      var props, user, user2, post, post2, post3, post4;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              this.toClear.push('Post');
              this.toClear.push('Comment');
              props = { name: 'John' };

              assert.debug('create', User.name, props);
              _context6.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context6.sent;

              assert.debug('created', User.name, user);

              props = { name: 'Sally' };
              assert.debug('create', User.name, props);
              _context6.next = 12;
              return adapter.create(User, props);

            case 12:
              user2 = _context6.sent;

              assert.debug('created', User.name, user);

              props = { status: 'draft', userId: user[User.idAttribute] };
              assert.debug('create', Post.name, props);
              _context6.next = 18;
              return adapter.create(Post, props);

            case 18:
              post = _context6.sent;

              assert.debug('created', Post.name, post);

              props = { status: 'published', userId: user[User.idAttribute] };
              assert.debug('create', Post.name, props);
              _context6.next = 24;
              return adapter.create(Post, props);

            case 24:
              post2 = _context6.sent;

              assert.debug('created', Post.name, post2);

              props = { status: 'draft', userId: user2[User.idAttribute] };
              assert.debug('create', Post.name, props);
              _context6.next = 30;
              return adapter.create(Post, props);

            case 30:
              post3 = _context6.sent;

              assert.debug('created', Post.name, post3);

              props = { status: 'published', userId: user2[User.idAttribute] };
              assert.debug('create', Post.name, props);
              _context6.next = 36;
              return adapter.create(Post, props);

            case 36:
              post4 = _context6.sent;

              assert.debug('created', Post.name, post4);

              assert.debug('find', User.name, user[User.idAttribute]);
              _context6.next = 41;
              return adapter.find(User, user[User.idAttribute], { 'with': ['post'] });

            case 41:
              user = _context6.sent;

              assert.debug('found', User.name, user);

              assert.isDefined(user, 'user');
              assert.isDefined(user.posts, 'user.posts');
              assert.equal(user.posts.length, 2, 'user.posts.length');

              assert.debug('find', User.name, user[User.idAttribute]);
              _context6.next = 49;
              return adapter.find(User, user[User.idAttribute], { 'with': [{
                  relation: 'post',
                  query: {
                    status: 'published'
                  }
                }] });

            case 49:
              user = _context6.sent;

              assert.debug('found', User.name, user);

              assert.isDefined(user, 'user');
              assert.isDefined(user.posts, 'user.posts');
              assert.equal(user.posts.length, 1, 'user.posts.length');

              assert.debug('find', User.name, user[User.idAttribute]);
              _context6.next = 57;
              return adapter.find(User, user[User.idAttribute], { 'with': [{
                  relation: 'post',
                  replace: true,
                  query: {
                    status: 'published'
                  }
                }] });

            case 57:
              user = _context6.sent;

              assert.debug('found', User.name, user);

              assert.isDefined(user, 'user');
              assert.isDefined(user.posts, 'user.posts');
              assert.equal(user.posts.length, 2, 'user.posts.length');

            case 62:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    })));

    if (options.hasFeature('findBelongsToNested')) {
      it('should load belongsTo relations (nested)', asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
        var props, user, profile, post, comment;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Comment');
                this.toClear.push('Profile');
                props = { name: 'John' };

                assert.debug('create', User.name, props);
                _context7.next = 7;
                return adapter.create(User, props);

              case 7:
                user = _context7.sent;

                assert.debug('created', User.name, user);

                props = { email: 'foo@test.com', userId: user[User.idAttribute] };
                assert.debug('create', Profile.name, props);
                _context7.next = 13;
                return adapter.create(Profile, props);

              case 13:
                profile = _context7.sent;

                assert.debug('created', Profile.name, profile);

                props = { content: 'foo', userId: user[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context7.next = 19;
                return adapter.create(Post, props);

              case 19:
                post = _context7.sent;

                assert.debug('created', Post.name, post);

                props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
                assert.debug('create', Comment.name, props);
                _context7.next = 25;
                return adapter.create(Comment, props);

              case 25:
                comment = _context7.sent;

                assert.debug('created', Comment.name, comment);

                assert.debug('find', Comment.name, comment[Comment.idAttribute]);
                _context7.next = 30;
                return adapter.find(Comment, comment[Comment.idAttribute], { 'with': ['user', 'user.profile', 'post', 'post.user'] });

              case 30:
                comment = _context7.sent;

                assert.debug('found', Comment.name, comment);

                assert.isDefined(comment, 'comment');
                assert.isDefined(comment.post, 'comment.post');
                assert.isDefined(comment.post.user, 'comment.post.user');
                assert.isDefined(comment.user, 'comment.user');
                assert.isDefined(comment.user.profile, 'comment.user.profile');

              case 37:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      })));
    }

    it('should load hasMany and belongsTo relations', asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
      var props, user, profile, post, postId, comment;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              this.toClear.push('Post');
              this.toClear.push('Comment');
              this.toClear.push('Profile');
              props = { name: 'John' };

              assert.debug('create', User.name, props);
              _context8.next = 7;
              return adapter.create(User, props);

            case 7:
              user = _context8.sent;

              assert.debug('created', User.name, user);

              props = { email: 'foo@test.com', userId: user[User.idAttribute] };
              assert.debug('create', Profile.name, props);
              _context8.next = 13;
              return adapter.create(Profile, props);

            case 13:
              profile = _context8.sent;

              assert.debug('created', Profile.name, profile);

              props = { content: 'foo', userId: user[User.idAttribute] };
              assert.debug('create', Post.name, props);
              _context8.next = 19;
              return adapter.create(Post, props);

            case 19:
              post = _context8.sent;
              postId = post[Post.idAttribute];

              assert.debug('created', Post.name, post);

              props = { content: 'test2', postId: postId, userId: post.userId };
              assert.debug('create', Comment.name, props);
              _context8.next = 26;
              return adapter.create(Comment, props);

            case 26:
              comment = _context8.sent;

              assert.debug('created', Comment.name, comment);

              assert.debug('find', Post.name, postId);
              _context8.next = 31;
              return adapter.find(Post, postId, { 'with': ['user', 'comment'] });

            case 31:
              post = _context8.sent;

              assert.debug('found', Post.name, post);

              assert.isDefined(post.comments, 'post.comments');
              assert.isDefined(post.user, 'post.user');

            case 35:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    })));

    if (options.hasFeature('findBelongsToHasManyNested')) {
      it('should load hasMany and belongsTo relations (nested)', asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
        var props, user, profile, post, postId, comment;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Comment');
                this.toClear.push('Profile');
                props = { name: 'John' };

                assert.debug('create', User.name, props);
                _context9.next = 7;
                return adapter.create(User, props);

              case 7:
                user = _context9.sent;

                assert.debug('created', User.name, user);

                props = { email: 'foo@test.com', userId: user[User.idAttribute] };
                assert.debug('create', Profile.name, props);
                _context9.next = 13;
                return adapter.create(Profile, props);

              case 13:
                profile = _context9.sent;

                assert.debug('created', Profile.name, profile);

                props = { content: 'foo', userId: user[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context9.next = 19;
                return adapter.create(Post, props);

              case 19:
                post = _context9.sent;
                postId = post[Post.idAttribute];

                assert.debug('created', Post.name, post);

                props = { content: 'test2', postId: postId, userId: post.userId };
                assert.debug('create', Comment.name, props);
                _context9.next = 26;
                return adapter.create(Comment, props);

              case 26:
                comment = _context9.sent;

                assert.debug('created', Comment.name, comment);

                assert.debug('find', Post.name, postId);
                _context9.next = 31;
                return adapter.find(Post, postId, { 'with': ['user', 'comment', 'comment.user', 'comment.user.profile'] });

              case 31:
                post = _context9.sent;

                assert.debug('found', Post.name, post);

                assert.isDefined(post.comments, 'post.comments');
                assert.isDefined(post.comments[0].user, 'post.comments[0].user');
                assert.isDefined(post.comments[0].user.profile, 'post.comments[0].user.profile');
                assert.isDefined(post.user, 'post.user');

              case 37:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      })));
    }

    if (options.hasFeature('findHasManyLocalKeys')) {
      it('should load hasMany localKeys (array) relations', asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
        var props, tag, tag2, post, postId;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Tag');
                props = { value: 'big data' };

                assert.debug('create', Tag.name, props);
                _context10.next = 6;
                return adapter.create(Tag, props);

              case 6:
                tag = _context10.sent;

                assert.debug('created', Tag.name, tag);

                props = { value: 'servers' };
                assert.debug('create', Tag.name, props);
                _context10.next = 12;
                return adapter.create(Tag, props);

              case 12:
                tag2 = _context10.sent;

                assert.debug('created', Tag.name, tag2);

                props = { content: 'test', tagIds: [tag[Tag.idAttribute], tag2[Tag.idAttribute]] };
                assert.debug('create', Post.name, props);
                _context10.next = 18;
                return adapter.create(Post, props);

              case 18:
                post = _context10.sent;
                postId = post[Post.idAttribute];

                assert.debug('created', Post.name, post);

                assert.debug('find', Post.name, postId);
                _context10.next = 24;
                return adapter.find(Post, postId, { 'with': ['tag'] });

              case 24:
                post = _context10.sent;

                assert.debug('found', Post.name, post);

                assert.isDefined(post.tags, 'post.tags');
                assert.equal(post.content, 'test', 'post.content');
                assert.isDefined(post.tags[0][Tag.idAttribute], 'post.tags[0][Tag.idAttribute]');
                assert.isDefined(post.tags[1][Tag.idAttribute], 'post.tags[1][Tag.idAttribute]');

              case 30:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      })));
      it('should load hasMany localKeys (empty array) relations', asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
        var props, post, postId;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this.toClear.push('Post');
                props = { content: 'test' };

                assert.debug('create', Post.name, props);
                _context11.next = 5;
                return adapter.create(Post, props);

              case 5:
                post = _context11.sent;
                postId = post[Post.idAttribute];

                assert.debug('created', Post.name, post);

                assert.debug('find', Post.name, postId);
                _context11.next = 11;
                return adapter.find(Post, postId, { 'with': ['tag'] });

              case 11:
                post = _context11.sent;

                assert.debug('found', Post.name, post);

                assert.isDefined(post.tags, 'post.tags');
                assert.equal(post.content, 'test', 'post.content');
                assert.deepEqual(post.tags, [], 'post.tags');

              case 16:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      })));
      it('should load hasMany localKeys (object) relations', asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
        var _tagIds;

        var props, tag, tag2, post, postId;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Tag');
                props = { value: 'big data' };

                assert.debug('create', Tag.name, props);
                _context12.next = 6;
                return adapter.create(Tag, props);

              case 6:
                tag = _context12.sent;

                assert.debug('created', Tag.name, tag);

                props = { value: 'servers' };
                assert.debug('create', Tag.name, props);
                _context12.next = 12;
                return adapter.create(Tag, props);

              case 12:
                tag2 = _context12.sent;

                assert.debug('created', Tag.name, tag2);

                props = { content: 'test', tagIds: (_tagIds = {}, defineProperty(_tagIds, tag[Tag.idAttribute], true), defineProperty(_tagIds, tag2[Tag.idAttribute], true), _tagIds) };
                assert.debug('create', Post.name, props);
                _context12.next = 18;
                return adapter.create(Post, props);

              case 18:
                post = _context12.sent;
                postId = post[Post.idAttribute];

                assert.debug('created', Post.name, post);

                assert.debug('find', Post.name, postId);
                _context12.next = 24;
                return adapter.find(Post, postId, { 'with': ['tag'] });

              case 24:
                post = _context12.sent;

                assert.debug('found', Post.name);

                assert.isDefined(post.tags, 'post.tags');
                assert.equal(post.content, 'test', 'post.content');
                assert.isDefined(post.tags[0][Tag.idAttribute], 'post.tags[0][Tag.idAttribute]');
                assert.isDefined(post.tags[1][Tag.idAttribute], 'post.tags[1][Tag.idAttribute]');

              case 30:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      })));
    }

    if (options.hasFeature('findHasManyForeignKeys')) {
      it('should load hasMany foreignKeys (array) relations', asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
        var props, tag, tagId, tag2, tag2Id, post, post2;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Tag');
                props = { value: 'big data' };

                assert.debug('create', Tag.name, props);
                _context13.next = 6;
                return adapter.create(Tag, props);

              case 6:
                tag = _context13.sent;
                tagId = tag[Tag.idAttribute];

                assert.debug('created', Tag.name, tag);

                props = { value: 'servers' };
                assert.debug('create', Tag.name, props);
                _context13.next = 13;
                return adapter.create(Tag, props);

              case 13:
                tag2 = _context13.sent;
                tag2Id = tag2[Tag.idAttribute];

                assert.debug('created', Tag.name, tag2);

                props = { content: 'test', tagIds: [tagId] };
                assert.debug('create', Post.name, props);
                _context13.next = 20;
                return adapter.create(Post, props);

              case 20:
                post = _context13.sent;

                assert.debug('created', Post.name, post);

                props = { content: 'test2', tagIds: [tagId, tag2Id] };
                assert.debug('create', Post.name, props);
                _context13.next = 26;
                return adapter.create(Post, props);

              case 26:
                post2 = _context13.sent;

                assert.debug('created', Post.name, post2);

                assert.debug('find', Tag.name, tagId);
                _context13.next = 31;
                return adapter.find(Tag, tagId, { 'with': ['post'] });

              case 31:
                tag = _context13.sent;

                assert.debug('found', Tag.name, tag);

                assert.isDefined(tag.posts, 'tag.posts');
                assert.equal(tag.value, 'big data', 'tag.value');
                assert.equal(tag.posts.length, 2, 'tag.posts.length');

                assert.debug('find', Tag.name, tag2Id);
                _context13.next = 39;
                return adapter.find(Tag, tag2Id, { 'with': ['post'] });

              case 39:
                tag2 = _context13.sent;

                assert.debug('found', Tag.name, tag2);

                assert.isDefined(tag2.posts, 'tag2.posts');
                assert.equal(tag2.value, 'servers', 'tag2.value');
                assert.equal(tag2.posts.length, 1, 'tag2.posts.length');
                assert.objectsEqual(tag2.posts, [post2], 'tag2.posts');

              case 45:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      })));
    }
  });
};

/* global assert:true */
var findAllTest = function (options) {
  describe('Adapter#findAll', function () {
    var adapter, User, Profile, Post, Comment;

    beforeEach(function () {
      adapter = this.$$adapter;
      User = this.$$User;
      Profile = this.$$Profile;
      Post = this.$$Post;
      Comment = this.$$Comment;
    });

    it('should exist', function () {
      assert.equal(_typeof(adapter.findAll), 'function', 'adapter should have a "findAll" method');
    });

    it('should filter users', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var props, users, user, userId, users2;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              props = { name: 'John' };

              assert.debug('findAll', User.name, { age: 30 });
              _context.next = 4;
              return adapter.findAll(User, { age: 30 });

            case 4:
              users = _context.sent;

              assert.debug('found', User.name, users);
              assert.equal(users.length, 0, 'users.length');

              assert.debug('create', User.name, props);
              _context.next = 10;
              return adapter.create(User, props);

            case 10:
              user = _context.sent;

              assert.debug('created', User.name, user);
              userId = user[User.idAttribute];


              assert.debug('findAll', User.name, { name: 'John' });
              _context.next = 16;
              return adapter.findAll(User, { name: 'John' });

            case 16:
              users2 = _context.sent;

              assert.debug('found', User.name, users2);

              assert.equal(users2.length, 1, 'users2.length');
              assert.equal(users2[0][User.idAttribute], userId, 'users2[0][User.idAttribute]');
              assert.equal(users2[0].name, 'John', users2[0].name);

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));

    it('should filter users with raw option', asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var props, result, users, user, userId, result2, users2;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              props = { name: 'John' };

              assert.debug('findAll', User.name, { age: 30 });
              _context2.next = 4;
              return adapter.findAll(User, { age: 30 }, { raw: true });

            case 4:
              result = _context2.sent;
              users = result.data;

              assert.debug('found', User.name, users);
              assert.equal(users.length, 0, 'users.length');

              assert.debug('create', User.name, props);
              _context2.next = 11;
              return adapter.create(User, props);

            case 11:
              user = _context2.sent;

              assert.debug('created', User.name, user);
              userId = user[User.idAttribute];


              assert.debug('findAll', User.name, { name: 'John' });
              _context2.next = 17;
              return adapter.findAll(User, { name: 'John' }, { raw: true });

            case 17:
              result2 = _context2.sent;
              users2 = result2.data;

              assert.debug('found', User.name, users2);

              assert.equal(users2.length, 1, 'users2.length');
              assert.equal(users2[0][User.idAttribute], userId, 'users2[0][User.idAttribute]');
              assert.equal(users2[0].name, 'John', users2[0].name);

            case 23:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));

    if (options.hasFeature('findAllInOp')) {
      it('should filter users using the "in" operator', asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var users, user, id, users2;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return adapter.findAll(User, {
                  where: {
                    age: {
                      'in': [30]
                    }
                  }
                });

              case 2:
                users = _context3.sent;

                assert.equal(users.length, 0, 'users.length');

                _context3.next = 6;
                return adapter.create(User, { name: 'John' });

              case 6:
                user = _context3.sent;
                id = user[User.idAttribute];
                _context3.next = 10;
                return adapter.findAll(User, { name: 'John' });

              case 10:
                users2 = _context3.sent;

                assert.equal(users2.length, 1, 'users2.length');
                assert.equal(users2[0][User.idAttribute], id, 'users2[0][User.idAttribute]');
                assert.equal(users2[0].name, 'John', 'users2[0].name');

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      })));
    }

    if (options.hasFeature('findAllLikeOp')) {
      it('should filter users using the "like" operator', asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var users, user, id, users2;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return adapter.findAll(User, {
                  where: {
                    name: {
                      'like': '%J%'
                    }
                  }
                });

              case 2:
                users = _context4.sent;

                assert.equal(users.length, 0);

                _context4.next = 6;
                return adapter.create(User, { name: 'John' });

              case 6:
                user = _context4.sent;
                id = user.id;
                _context4.next = 10;
                return adapter.findAll(User, {
                  where: {
                    name: {
                      'like': '%J%'
                    }
                  }
                });

              case 10:
                users2 = _context4.sent;

                assert.equal(users2.length, 1);
                assert.equal(users2[0].id, id);
                assert.equal(users2[0].name, 'John');

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      })));
    }

    if (options.hasFeature('findAllOpNotFound')) {
      it('should throw "Operator not found" error', function () {
        return adapter.findAll(User, {
          where: {
            name: {
              op: 'John'
            }
          }
        }).then(function () {
          throw new Error('should have failed!');
        }, function (err) {
          assert.equal(err.message, 'Operator op not supported!');
        });
      });
    }

    if (options.hasFeature('findAllBelongsTo')) {
      it('should load belongsTo relations', asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var props, user, profile, post, comment, user2, post2, comment2, comments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Profile');
                this.toClear.push('Comment');
                props = { name: 'John' };

                assert.debug('create', User.name, props);
                _context5.next = 7;
                return adapter.create(User, props);

              case 7:
                user = _context5.sent;

                assert.debug('created', User.name, user);

                props = { email: 'foo@test.com', userId: user[User.idAttribute] };
                assert.debug('create', Profile.name, props);
                _context5.next = 13;
                return adapter.create(Profile, props);

              case 13:
                profile = _context5.sent;

                assert.debug('created', Profile.name, profile);

                props = { content: 'foo', userId: user[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context5.next = 19;
                return adapter.create(Post, props);

              case 19:
                post = _context5.sent;

                assert.debug('created', Post.name, post);

                props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
                assert.debug('create', Comment.name, props);
                _context5.next = 25;
                return adapter.create(Comment, props);

              case 25:
                comment = _context5.sent;

                assert.debug('created', Comment.name, comment);

                props = { name: 'Sally' };
                assert.debug('create', User.name, props);
                _context5.next = 31;
                return adapter.create(User, props);

              case 31:
                user2 = _context5.sent;

                assert.debug('created', User.name, user2);

                props = { content: 'bar', userId: user2[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context5.next = 37;
                return adapter.create(Post, props);

              case 37:
                post2 = _context5.sent;

                assert.debug('created', Post.name, post2);

                props = { content: 'test67', postId: post2[Post.idAttribute], userId: post2.userId };
                assert.debug('create', Comment.name, props);
                _context5.next = 43;
                return adapter.create(Comment, props);

              case 43:
                comment2 = _context5.sent;

                assert.debug('created', Comment.name, comment2);

                assert.debug('findAll', Comment.name, {});
                _context5.next = 48;
                return adapter.findAll(Comment, {}, { 'with': ['user', 'post'] });

              case 48:
                comments = _context5.sent;

                assert.debug('found', Comment.name, comments);

                assert.isDefined(comments[0].post, 'comments[0].post');
                assert.isDefined(comments[0].user, 'comments[0].user');
                assert.isDefined(comments[1].post, 'comments[1].post');
                assert.isDefined(comments[1].user, 'comments[1].user');

              case 54:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      })));

      it('should load belongsTo relations and filter sub queries', asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        var props, user, user2, post, post2, post3, post4, users;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Comment');
                props = { name: 'John' };

                assert.debug('create', User.name, props);
                _context6.next = 6;
                return adapter.create(User, props);

              case 6:
                user = _context6.sent;

                assert.debug('created', User.name, user);

                props = { name: 'Sally' };
                assert.debug('create', User.name, props);
                _context6.next = 12;
                return adapter.create(User, props);

              case 12:
                user2 = _context6.sent;

                assert.debug('created', User.name, user);

                props = { status: 'draft', userId: user[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context6.next = 18;
                return adapter.create(Post, props);

              case 18:
                post = _context6.sent;

                assert.debug('created', Post.name, post);

                props = { status: 'published', userId: user[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context6.next = 24;
                return adapter.create(Post, props);

              case 24:
                post2 = _context6.sent;

                assert.debug('created', Post.name, post2);

                props = { status: 'draft', userId: user2[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context6.next = 30;
                return adapter.create(Post, props);

              case 30:
                post3 = _context6.sent;

                assert.debug('created', Post.name, post3);

                props = { status: 'published', userId: user2[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context6.next = 36;
                return adapter.create(Post, props);

              case 36:
                post4 = _context6.sent;

                assert.debug('created', Post.name, post4);

                assert.debug('findAll', User.name, defineProperty({}, User.idAttribute, user[User.idAttribute]));
                _context6.next = 41;
                return adapter.findAll(User, defineProperty({}, User.idAttribute, user[User.idAttribute]), { 'with': ['post'] });

              case 41:
                users = _context6.sent;

                assert.debug('found', User.name, users);

                assert.isDefined(users, 'users');
                assert.isDefined(users[0].posts, 'users[0].posts');
                assert.equal(users[0].posts.length, 2, 'users[0].posts.length');

                assert.debug('findAll', User.name, defineProperty({}, User.idAttribute, user[User.idAttribute]));
                _context6.next = 49;
                return adapter.findAll(User, defineProperty({}, User.idAttribute, user[User.idAttribute]), { 'with': [{
                    relation: 'post',
                    query: {
                      status: 'published'
                    }
                  }] });

              case 49:
                users = _context6.sent;

                assert.debug('found', User.name, users);

                assert.isDefined(users, 'users');
                assert.isDefined(users[0].posts, 'users[0].posts');
                assert.equal(users[0].posts.length, 1, 'users[0].posts.length');

                assert.debug('findAll', User.name, defineProperty({}, User.idAttribute, user[User.idAttribute]));
                _context6.next = 57;
                return adapter.findAll(User, defineProperty({}, User.idAttribute, user[User.idAttribute]), { 'with': [{
                    relation: 'post',
                    replace: true,
                    query: {
                      status: 'published'
                    }
                  }] });

              case 57:
                users = _context6.sent;

                assert.debug('found', User.name, users);

                assert.isDefined(user, 'user');
                assert.isDefined(users[0].posts, 'users[0].posts');
                assert.equal(users[0].posts.length, 1, 'users[0].posts.length');

              case 62:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      })));
    }

    if (options.hasFeature('findAllBelongsToNested')) {
      it('should load belongsTo relations (nested)', asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
        var props, user, profile, post, comment, user2, post2, comment2, comments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Profile');
                this.toClear.push('Comment');
                props = { name: 'John' };

                assert.debug('create', User.name, props);
                _context7.next = 7;
                return adapter.create(User, props);

              case 7:
                user = _context7.sent;

                assert.debug('created', User.name, user);

                props = { email: 'foo@test.com', userId: user[User.idAttribute] };
                assert.debug('create', Profile.name, props);
                _context7.next = 13;
                return adapter.create(Profile, props);

              case 13:
                profile = _context7.sent;

                assert.debug('created', Profile.name, profile);

                props = { content: 'foo', userId: user[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context7.next = 19;
                return adapter.create(Post, props);

              case 19:
                post = _context7.sent;

                assert.debug('created', Post.name, post);

                props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
                assert.debug('create', Comment.name, props);
                _context7.next = 25;
                return adapter.create(Comment, props);

              case 25:
                comment = _context7.sent;

                assert.debug('created', Comment.name, comment);

                props = { name: 'Sally' };
                assert.debug('create', User.name, props);
                _context7.next = 31;
                return adapter.create(User, props);

              case 31:
                user2 = _context7.sent;

                assert.debug('created', User.name, user2);

                props = { content: 'bar', userId: user2[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context7.next = 37;
                return adapter.create(Post, props);

              case 37:
                post2 = _context7.sent;

                assert.debug('created', Post.name, post2);

                props = { content: 'test67', postId: post2[Post.idAttribute], userId: post2.userId };
                assert.debug('create', Comment.name, props);
                _context7.next = 43;
                return adapter.create(Comment, props);

              case 43:
                comment2 = _context7.sent;

                assert.debug('created', Comment.name, comment2);

                assert.debug('findAll', Comment.name, {});
                _context7.next = 48;
                return adapter.findAll(Comment, {}, { 'with': ['user', 'user.profile', 'post', 'post.user'] });

              case 48:
                comments = _context7.sent;

                assert.debug('found', Comment.name, comments);

                assert.isDefined(comments[0].post, 'comments[0].post');
                assert.isDefined(comments[0].post.user, 'comments[0].post.user');
                assert.isDefined(comments[0].user, 'comments[0].user');
                assert.isDefined(comments[0].user.profile || comments[1].user.profile, 'comments[0].user.profile || comments[1].user.profile');
                assert.isDefined(comments[1].post, 'comments[1].post');
                assert.isDefined(comments[1].post.user, 'comments[1].post.user');
                assert.isDefined(comments[1].user, 'comments[1].user');

              case 57:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      })));
    }

    if (options.hasFeature('findAllBelongsToHasMany')) {
      it('should load hasMany and belongsTo relations', asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
        var props, user, profile, post, comment, user2, post2, comment2, posts;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Profile');
                this.toClear.push('Comment');
                props = { name: 'John' };

                assert.debug('create', User.name, props);
                _context8.next = 7;
                return adapter.create(User, props);

              case 7:
                user = _context8.sent;

                assert.debug('created', User.name, user);

                props = { email: 'foo@test.com', userId: user[User.idAttribute] };
                assert.debug('create', Profile.name, props);
                _context8.next = 13;
                return adapter.create(Profile, props);

              case 13:
                profile = _context8.sent;

                assert.debug('created', Profile.name, profile);

                props = { content: 'foo', userId: user[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context8.next = 19;
                return adapter.create(Post, props);

              case 19:
                post = _context8.sent;

                assert.debug('created', Post.name, post);

                props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
                assert.debug('create', Comment.name, props);
                _context8.next = 25;
                return adapter.create(Comment, props);

              case 25:
                comment = _context8.sent;

                assert.debug('created', Comment.name, comment);

                props = { name: 'Sally' };
                assert.debug('create', User.name, props);
                _context8.next = 31;
                return adapter.create(User, props);

              case 31:
                user2 = _context8.sent;

                assert.debug('created', User.name, user2);

                props = { content: 'bar', userId: user2[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context8.next = 37;
                return adapter.create(Post, props);

              case 37:
                post2 = _context8.sent;

                assert.debug('created', Post.name, post2);

                props = { content: 'test67', postId: post2[Post.idAttribute], userId: post2.userId };
                assert.debug('create', Comment.name, props);
                _context8.next = 43;
                return adapter.create(Comment, props);

              case 43:
                comment2 = _context8.sent;

                assert.debug('created', Comment.name, comment2);

                assert.debug('find', Post.name, {});
                _context8.next = 48;
                return adapter.findAll(Post, {}, { 'with': ['user', 'comment'] });

              case 48:
                posts = _context8.sent;

                assert.debug('found', Post.name, posts);

                assert.isDefined(posts[0].comments, 'posts[0].comments');
                assert.isDefined(posts[0].user, 'posts[0].user');
                assert.isDefined(posts[1].comments, 'posts[1].comments');
                assert.isDefined(posts[1].user, 'posts[1].user');

              case 54:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      })));
    }

    if (options.hasFeature('findAllBelongsToHasManyNested')) {
      it('should load hasMany and belongsTo relations', asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
        var props, user, profile, post, comment, user2, post2, comment2, posts;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Profile');
                this.toClear.push('Comment');
                props = { name: 'John' };

                assert.debug('create', User.name, props);
                _context9.next = 7;
                return adapter.create(User, props);

              case 7:
                user = _context9.sent;

                assert.debug('created', User.name, user);

                props = { email: 'foo@test.com', userId: user[User.idAttribute] };
                assert.debug('create', Profile.name, props);
                _context9.next = 13;
                return adapter.create(Profile, props);

              case 13:
                profile = _context9.sent;

                assert.debug('created', Profile.name, profile);

                props = { content: 'foo', userId: user[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context9.next = 19;
                return adapter.create(Post, props);

              case 19:
                post = _context9.sent;

                assert.debug('created', Post.name, post);

                props = { content: 'test2', postId: post[Post.idAttribute], userId: post.userId };
                assert.debug('create', Comment.name, props);
                _context9.next = 25;
                return adapter.create(Comment, props);

              case 25:
                comment = _context9.sent;

                assert.debug('created', Comment.name, comment);

                props = { name: 'Sally' };
                assert.debug('create', User.name, props);
                _context9.next = 31;
                return adapter.create(User, props);

              case 31:
                user2 = _context9.sent;

                assert.debug('created', User.name, user2);

                props = { content: 'bar', userId: user2[User.idAttribute] };
                assert.debug('create', Post.name, props);
                _context9.next = 37;
                return adapter.create(Post, props);

              case 37:
                post2 = _context9.sent;

                assert.debug('created', Post.name, post2);

                props = { content: 'test67', postId: post2[Post.idAttribute], userId: post2.userId };
                assert.debug('create', Comment.name, props);
                _context9.next = 43;
                return adapter.create(Comment, props);

              case 43:
                comment2 = _context9.sent;

                assert.debug('created', Comment.name, comment2);

                assert.debug('find', Post.name, {});
                _context9.next = 48;
                return adapter.findAll(Post, {}, { 'with': ['user', 'comment', 'comment.user', 'comment.user.profile'] });

              case 48:
                posts = _context9.sent;

                assert.debug('found', Post.name, posts);

                assert.isDefined(posts[0].comments, 'posts[0].comments');
                assert.isDefined(posts[0].comments[0].user, 'posts[0].comments[0].user');
                assert.isDefined(posts[0].comments[0].user.profile || posts[1].comments[0].user.profile, 'posts[0].comments[0].user.profile || posts[1].comments[0].user.profile');
                assert.isDefined(posts[0].user, 'posts[0].user');
                assert.isDefined(posts[1].comments, 'posts[1].comments');
                assert.isDefined(posts[1].comments[0].user, 'posts[1].comments[0].user');
                assert.isDefined(posts[1].user, 'posts[1].user');

              case 57:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      })));
    }

    if (options.hasFeature('filterOnRelations')) {
      it('should filter using belongsTo relation', asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
        var profile1, user1, post1, user2, post2, users;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Profile');
                this.toClear.push('Comment');
                _context10.next = 5;
                return adapter.create(Profile, { email: 'foo@test.com' });

              case 5:
                profile1 = _context10.sent;
                _context10.next = 8;
                return adapter.create(User, { name: 'John', profileId: profile1.id });

              case 8:
                user1 = _context10.sent;
                _context10.next = 11;
                return adapter.create(Post, { content: 'foo', userId: user1.id });

              case 11:
                post1 = _context10.sent;
                _context10.next = 14;
                return adapter.create(Comment, { content: 'test1', postId: post1.id, userId: post1.userId });

              case 14:
                _context10.next = 16;
                return adapter.create(User, { name: 'Sally' });

              case 16:
                user2 = _context10.sent;
                _context10.next = 19;
                return adapter.create(Post, { content: 'bar', userId: user2.id });

              case 19:
                post2 = _context10.sent;
                _context10.next = 22;
                return adapter.create(Comment, { content: 'test2', postId: post2.id, userId: post2.userId });

              case 22:
                _context10.next = 24;
                return adapter.findAll(User, { 'profile.email': 'foo@test.com' });

              case 24:
                users = _context10.sent;

                assert.equal(users.length, 1);
                assert.equal(users[0].profileId, profile1.id);
                assert.equal(users[0].name, 'John');

              case 28:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      })));

      it('should filter through multiple hasOne/belongsTo relations', asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
        var profile1, user1, post1, profile2, user2, post2, comments;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Profile');
                this.toClear.push('Comment');
                _context11.next = 5;
                return adapter.create(Profile, { email: 'foo@test.com' });

              case 5:
                profile1 = _context11.sent;
                _context11.next = 8;
                return adapter.create(User, { name: 'John', profileId: profile1.id });

              case 8:
                user1 = _context11.sent;
                _context11.next = 11;
                return adapter.create(Post, { content: 'foo', userId: user1.id });

              case 11:
                post1 = _context11.sent;
                _context11.next = 14;
                return adapter.create(Comment, { content: 'test1', postId: post1.id, userId: post1.userId });

              case 14:
                _context11.next = 16;
                return adapter.create(Profile, { email: 'bar@test.com' });

              case 16:
                profile2 = _context11.sent;
                _context11.next = 19;
                return adapter.create(User, { name: 'Sally', profileId: profile2.id });

              case 19:
                user2 = _context11.sent;
                _context11.next = 22;
                return adapter.create(Post, { content: 'bar', userId: user2.id });

              case 22:
                post2 = _context11.sent;
                _context11.next = 25;
                return adapter.create(Comment, { content: 'test2', postId: post2.id, userId: post2.userId });

              case 25:
                _context11.next = 27;
                return adapter.findAll(Comment, { 'user.profile.email': 'foo@test.com' });

              case 27:
                comments = _context11.sent;

                assert.equal(comments.length, 1);
                assert.equal(comments[0].userId, user1.id);
                assert.equal(comments[0].content, 'test1');

              case 31:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      })));

      it('should filter using multiple hasOne/belongsTo relations', asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
        var profile1, user1, post1, profile2, user2, post2, comments;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this.toClear.push('Post');
                this.toClear.push('Profile');
                this.toClear.push('Comment');
                _context12.next = 5;
                return adapter.create(Profile, { email: 'foo@test.com' });

              case 5:
                profile1 = _context12.sent;
                _context12.next = 8;
                return adapter.create(User, { name: 'John', profileId: profile1.id });

              case 8:
                user1 = _context12.sent;
                _context12.next = 11;
                return adapter.create(Post, { content: 'foo', userId: user1.id });

              case 11:
                post1 = _context12.sent;
                _context12.next = 14;
                return adapter.create(Comment, { content: 'test1', postId: post1.id, userId: post1.userId });

              case 14:
                _context12.next = 16;
                return adapter.create(Profile, { email: 'bar@test.com' });

              case 16:
                profile2 = _context12.sent;
                _context12.next = 19;
                return adapter.create(User, { name: 'Sally', profileId: profile2.id });

              case 19:
                user2 = _context12.sent;
                _context12.next = 22;
                return adapter.create(Post, { content: 'bar', userId: user2.id });

              case 22:
                post2 = _context12.sent;
                _context12.next = 25;
                return adapter.create(Comment, { content: 'test2', postId: post2.id, userId: post2.userId });

              case 25:
                _context12.next = 27;
                return adapter.findAll(Comment, { 'user.name': 'John', 'user.profile.email': 'foo@test.com' });

              case 27:
                comments = _context12.sent;

                assert.equal(comments.length, 1);
                assert.equal(comments[0].userId, user1.id);
                assert.equal(comments[0].content, 'test1');

              case 31:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      })));
    }

    it('should allow passing limit and offset as strings', asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return adapter.findAll(User, { limit: '10', offset: '20' });

            case 2:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, this);
    })));

    if (options.hasFeature('findAllGroupedWhere')) {
      it('should support filtering grouped "where" clauses', asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
        var posts, query;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                this.toClear.push('Post');
                _context14.next = 3;
                return adapter.createMany(Post, [{ status: 'draft', content: 'foo' }, { status: 'broken', content: 'bar' }, { status: 'published', content: 'hi' }, { status: 'flagged', content: 'hello world' }, { status: 'flagged', content: 'test' }]);

              case 3:
                posts = _context14.sent;
                query = {
                  where: [[{
                    content: {
                      '=': 'foo'
                    },
                    status: {
                      '=': 'draft'
                    }
                  }, 'or', {
                    status: {
                      '=': 'published'
                    }
                  }], 'or', {
                    content: {
                      '=': 'test'
                    },
                    status: {
                      '=': 'flagged'
                    }
                  }],
                  orderBy: 'status'
                };
                _context14.t0 = assert;
                _context14.next = 8;
                return adapter.findAll(Post, query);

              case 8:
                _context14.t1 = _context14.sent;
                _context14.t2 = [posts[0], posts[4], posts[2]];

                _context14.t0.objectsEqual.call(_context14.t0, _context14.t1, _context14.t2);

              case 11:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      })));
    }
  });
};

/* global assert:true */
var sumTest = function (options) {
  describe('Adapter#sum', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.sum), 'function', 'adapter should have a "sum" method');
    });
    it('should sum users\' age', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, props, sum, user, user2;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John', age: 30 };


              assert.debug('sum', User.name, {});
              _context.next = 6;
              return adapter.sum(User, 'age');

            case 6:
              sum = _context.sent;

              assert.debug('summed', User.name, sum);
              assert.equal(sum, 0);

              assert.debug('sum', User.name, { name: 'John' });
              _context.next = 12;
              return adapter.sum(User, 'age', { name: 'John' });

            case 12:
              sum = _context.sent;

              assert.debug('summed', User.name, sum);
              assert.equal(sum, 0);

              assert.debug('sum', User.name, { name: 'Sally' });
              _context.next = 18;
              return adapter.sum(User, 'age', { name: 'Sally' });

            case 18:
              sum = _context.sent;

              assert.debug('summed', User.name, sum);
              assert.equal(sum, 0);

              assert.debug('create', User.name, props);
              _context.next = 24;
              return adapter.create(User, props);

            case 24:
              user = _context.sent;

              assert.debug('created', User.name, user);

              assert.debug('sum', User.name, {});
              _context.next = 29;
              return adapter.sum(User, 'age');

            case 29:
              sum = _context.sent;

              assert.debug('summed', User.name, sum);
              assert.equal(sum, 30);

              assert.debug('sum', User.name, { name: 'John' });
              _context.next = 35;
              return adapter.sum(User, 'age', { name: 'John' });

            case 35:
              sum = _context.sent;

              assert.debug('summed', User.name, sum);
              assert.equal(sum, 30);

              assert.debug('sum', User.name, { name: 'Sally' });
              _context.next = 41;
              return adapter.sum(User, 'age', { name: 'Sally' });

            case 41:
              sum = _context.sent;

              assert.debug('summed', User.name, sum);
              assert.equal(sum, 0);

              assert.debug('create', User.name, { name: 'Sally' });
              _context.next = 47;
              return adapter.create(User, { name: 'Sally', age: 27 });

            case 47:
              user2 = _context.sent;

              assert.debug('created', User.name, user2);

              assert.debug('sum', User.name, {});
              _context.next = 52;
              return adapter.sum(User, 'age');

            case 52:
              sum = _context.sent;

              assert.debug('summed', User.name, sum);
              assert.equal(sum, 57);

              assert.debug('sum', User.name, { name: 'John' });
              _context.next = 58;
              return adapter.sum(User, 'age', { name: 'John' });

            case 58:
              sum = _context.sent;

              assert.debug('summed', User.name, sum);
              assert.equal(sum, 30);

              assert.debug('sum', User.name, { name: 'Sally' });
              _context.next = 64;
              return adapter.sum(User, 'age', { name: 'Sally' });

            case 64:
              sum = _context.sent;

              assert.debug('summed', User.name, sum);
              assert.equal(sum, 27);

            case 67:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should sum users\' age and return raw', asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var adapter, User, props, user, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John', age: 30 };


              assert.debug('create', User.name, props);
              _context2.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context2.sent;

              assert.debug('created', User.name, user);

              assert.debug('sum', User.name, props);
              _context2.next = 11;
              return adapter.sum(User, 'age', props, { raw: true });

            case 11:
              result = _context2.sent;

              assert.debug('summed', User.name, result);
              assert.equal(result.data, 30, 'result.data');

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
  });
};

/* global assert:true */
var updateTest = function (options) {
  describe('Adapter#update', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.update), 'function', 'adapter should have a "update" method');
    });
    it('should update a user', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, props, user, foundUser, updatedUser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              assert.debug('create', User.name, props);
              _context.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context.sent;

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.debug('find', User.name, user[User.idAttribute]);
              _context.next = 13;
              return adapter.find(User, user[User.idAttribute]);

            case 13:
              foundUser = _context.sent;

              assert.debug('found', User.name, foundUser);

              assert.equal(foundUser.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(foundUser[User.idAttribute], 'new user should have an id');
              assert.equal(foundUser[User.idAttribute], user[User.idAttribute]);

              assert.debug('update', User.name, user[User.idAttribute], { name: 'Johnny' });
              _context.next = 21;
              return adapter.update(User, user[User.idAttribute], { name: 'Johnny' });

            case 21:
              updatedUser = _context.sent;

              assert.debug('updated', User.name, updatedUser);
              assert.equal(updatedUser.name, 'Johnny');
              assert.equal(updatedUser[User.idAttribute], user[User.idAttribute]);

              assert.debug('find', User.name, user[User.idAttribute]);
              _context.next = 28;
              return adapter.find(User, user[User.idAttribute]);

            case 28:
              foundUser = _context.sent;

              assert.debug('found', User.name, foundUser);
              assert.equal(foundUser.name, 'Johnny');
              assert.equal(foundUser[User.idAttribute], user[User.idAttribute]);

            case 32:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should update a user and return raw', asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var adapter, User, props, user, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John' };


              assert.debug('create', User.name, props);
              _context2.next = 6;
              return adapter.create(User, props);

            case 6:
              user = _context2.sent;

              assert.debug('created', User.name, user);

              assert.equal(user.name, props.name, 'name of user should be "' + props.name + '"');
              assert.isDefined(user[User.idAttribute], 'new user should have an id');

              assert.debug('update', User.name, user[User.idAttribute], { name: 'Johnny' });
              _context2.next = 13;
              return adapter.update(User, user[User.idAttribute], { name: 'Johnny' }, { raw: true });

            case 13:
              result = _context2.sent;

              assert.debug('updated', User.name, result);
              assert.isDefined(result.data, 'result.data is defined');
              assert.isDefined(result.updated, 'result.updated is defined');
              assert.equal(result.data.name, 'Johnny', 'result.data.name should be "Johnny"');
              assert.equal(result.data[User.idAttribute], user[User.idAttribute], 'result.data.' + User.idAttribute + ' should be ' + user[User.idAttribute]);
              assert.equal(result.updated, 1, 'result.updated should be 1');

            case 20:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('should throw when updating non-existent row', asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var adapter, User;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;


              assert.debug('update', 'non-existent-id', { name: 'Johnny' });
              _context3.prev = 3;
              _context3.next = 6;
              return adapter.update(User, 'non-existent-id', { name: 'Johnny' });

            case 6:
              throw new Error('update should have failed!');

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3['catch'](3);

              assert.debug('correctly threw error', _context3.t0.message);
              assert.isDefined(_context3.t0.message, 'err.message is defined');
              assert.equal(_context3.t0.message, 'Not Found', 'err.message should be "Not Found"');

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[3, 9]]);
    })));
    it('should keep relations specified by "with"', asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var adapter, store, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              adapter = this.$$adapter;
              store = this.$$container;


              sinon.stub(adapter, '_update').callsFake(function (mapper, id, props, opts) {
                assert.deepEqual(props.posts, [{
                  id: 1234,
                  userId: 1
                }]);
                assert.deepEqual(props.profile, {
                  id: 238,
                  userId: 1
                });
                assert.equal(props.address, undefined);
                assert.equal(props.organization, undefined);
                return [props, {}];
              });

              assert.debug('update', 1, { id: 1 });
              _context4.next = 6;
              return store.update('user', 1, {
                id: 1,
                posts: [{
                  id: 1234,
                  userId: 1
                }],
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
              }, { with: ['posts', 'profile'] });

            case 6:
              result = _context4.sent;

              assert.debug('updated', 1, result);
              adapter._update.restore();

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
  });
};

/* global assert:true */
var updateAllTest = function (options) {
  describe('Adapter#updateAll', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.updateAll), 'function', 'adapter should have a "updateAll" method');
    });
    it('should update multiple users', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, props, user1, userId1, user2, userId2, users, users2, users3, users4;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              props = { name: 'John', age: 20 };


              assert.debug('create', User.name, props);
              _context.next = 6;
              return adapter.create(User, props);

            case 6:
              user1 = _context.sent;

              assert.debug('created', User.name, user1);
              userId1 = user1[User.idAttribute];


              props = { name: 'John', age: 30 };

              assert.debug('create', User.name, props);
              _context.next = 13;
              return adapter.create(User, props);

            case 13:
              user2 = _context.sent;

              assert.debug('created', User.name, user2);
              userId2 = user2[User.idAttribute];


              assert.debug('findAll', User.name, { name: 'John' });
              _context.next = 19;
              return adapter.findAll(User, { name: 'John' });

            case 19:
              users = _context.sent;

              assert.debug('found', User.name, users);
              users.sort(function (a, b) {
                return a.age - b.age;
              });
              assert.equal(users[0].name, 'John');
              assert.equal(users[0].name, 'John');
              assert.equal(users.filter(function (x) {
                return x[User.idAttribute] === userId1;
              }).length, 1);
              assert.equal(users.filter(function (x) {
                return x[User.idAttribute] === userId2;
              }).length, 1);
              assert.equal(users.filter(function (x) {
                return x.age === 20;
              }).length, 1);
              assert.equal(users.filter(function (x) {
                return x.age === 30;
              }).length, 1);

              assert.debug('updateAll', User.name, { name: 'Johnny' }, { name: 'John' });
              _context.next = 31;
              return adapter.updateAll(User, { name: 'Johnny' }, { name: 'John' });

            case 31:
              users2 = _context.sent;

              assert.debug('updated', User.name, users2);
              users2.sort(function (a, b) {
                return a.age - b.age;
              });
              assert.equal(users2[0].name, 'Johnny');
              assert.equal(users2[0].name, 'Johnny');
              assert.equal(users2.filter(function (x) {
                return x[User.idAttribute] === userId1;
              }).length, 1);
              assert.equal(users2.filter(function (x) {
                return x[User.idAttribute] === userId2;
              }).length, 1);
              assert.equal(users2.filter(function (x) {
                return x.age === 20;
              }).length, 1);
              assert.equal(users2.filter(function (x) {
                return x.age === 30;
              }).length, 1);

              assert.debug('findAll', User.name, { name: 'John' });
              _context.next = 43;
              return adapter.findAll(User, { name: 'John' });

            case 43:
              users3 = _context.sent;

              assert.debug('found', User.name, users3);
              assert.equalObjects(users3, []);
              assert.equal(users3.length, 0);

              assert.debug('findAll', User.name, { name: 'Johnny' });
              _context.next = 50;
              return adapter.findAll(User, { name: 'Johnny' });

            case 50:
              users4 = _context.sent;

              assert.debug('found', User.name, users4);

              users4.sort(function (a, b) {
                return a.age - b.age;
              });
              assert.equal(users4[0].name, 'Johnny');
              assert.equal(users4[0].name, 'Johnny');
              assert.equal(users4.filter(function (x) {
                return x[User.idAttribute] === userId1;
              }).length, 1);
              assert.equal(users4.filter(function (x) {
                return x[User.idAttribute] === userId2;
              }).length, 1);
              assert.equal(users4.filter(function (x) {
                return x.age === 20;
              }).length, 1);
              assert.equal(users4.filter(function (x) {
                return x.age === 30;
              }).length, 1);

            case 59:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
  });
};

/* global assert:true */
var updateManyTest = function (options) {
  describe('Adapter#updateMany', function () {
    it('should exist', function () {
      assert.equal(_typeof(this.$$adapter.updateMany), 'function', 'adapter should have a "updateMany" method');
    });
    it('should update multiple users', asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var adapter, User, user1, userId1, user2, userId2, users, users2, users3, users4;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              adapter = this.$$adapter;
              User = this.$$User;
              _context.next = 4;
              return adapter.create(User, { name: 'John', age: 20 });

            case 4:
              user1 = _context.sent;
              userId1 = user1.id;
              _context.next = 8;
              return adapter.create(User, { name: 'John', age: 30 });

            case 8:
              user2 = _context.sent;
              userId2 = user2.id;
              _context.next = 12;
              return adapter.findAll(User, { name: 'John' });

            case 12:
              users = _context.sent;

              users.sort(function (a, b) {
                return a.age - b.age;
              });
              assert.equal(users[0].name, 'John');
              assert.equal(users[0].name, 'John');
              assert.equal(users.filter(function (x) {
                return x.id === userId1;
              }).length, 1);
              assert.equal(users.filter(function (x) {
                return x.id === userId2;
              }).length, 1);
              assert.equal(users.filter(function (x) {
                return x.age === 20;
              }).length, 1);
              assert.equal(users.filter(function (x) {
                return x.age === 30;
              }).length, 1);

              user1.age = 101;
              user2.age = 202;
              _context.next = 24;
              return adapter.updateMany(User, [user1, user2]);

            case 24:
              users2 = _context.sent;

              users2.sort(function (a, b) {
                return a.age - b.age;
              });
              assert.equal(users2.filter(function (x) {
                return x.id === userId1;
              }).length, 1);
              assert.equal(users2.filter(function (x) {
                return x.id === userId2;
              }).length, 1);
              assert.equal(users2.filter(function (x) {
                return x.age === 101;
              }).length, 1);
              assert.equal(users2.filter(function (x) {
                return x.age === 202;
              }).length, 1);

              _context.next = 32;
              return adapter.findAll(User, { age: 20 });

            case 32:
              users3 = _context.sent;

              assert.objectsEqual(users3, []);
              assert.equal(users3.length, 0);

              _context.next = 37;
              return adapter.findAll(User, { age: 101 });

            case 37:
              users4 = _context.sent;

              users4.sort(function (a, b) {
                return a.age - b.age;
              });
              assert.equal(users4.filter(function (x) {
                return x.id === userId1;
              }).length, 1);
              assert.equal(users4.filter(function (x) {
                return x.id === userId2;
              }).length, 0);
              assert.equal(users4.filter(function (x) {
                return x.age === 101;
              }).length, 1);
              assert.equal(users4.filter(function (x) {
                return x.age === 202;
              }).length, 0);

            case 43:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
  });
};

chai.assert.equalObjects = function (a, b, m) {
  chai.assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b));
};

chai.assert.objectsEqual = function (a, b, m) {
  chai.assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b));
};

var debug = false;

chai.assert.debug = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (debug) {
    var _console;

    args.forEach(function (arg, i) {
      args[i] = JSON.stringify(arg, null, 2);
    });
    (_console = console).log.apply(_console, ['DEBUG (TEST):'].concat(args));
  }
};

var prefix = 'TestRunner.init(options): options';

var index = {
  init: function init(options) {
    options = options || {};
    debug = !!options.debug;
    options.hasMethod = function (method) {
      options.methods || (options.methods = 'all');
      options.xmethods || (options.xmethods = []);
      return (options.methods === 'all' || options.methods.indexOf(method) !== -1) && options.xmethods.indexOf(method) === -1;
    };
    options.hasFeature = function (feature) {
      options.features || (options.features = 'all');
      options.xfeatures || (options.xfeatures = []);
      return (options.features === 'all' || options.features.indexOf(feature) !== -1) && options.xfeatures.indexOf(feature) === -1;
    };
    if (!options.Adapter || typeof options.Adapter !== 'function') {
      throw new Error(prefix + '.Adapter: Expected function, Actual: ' + _typeof(options.Adapter));
    }
    beforeEach(function () {
      this.$$adapter = new options.Adapter(options.adapterConfig);
      this.$$container = new options.JSData.Container(options.containerConfig || {
        mapperDefaults: {
          debug: false
        }
      });
      this.$$store = new options.JSData.DataStore(options.storeConfig || {
        mapperDefaults: {
          debug: false
        }
      });
      this.$$container.registerAdapter('adapter', this.$$adapter, { 'default': true });
      this.$$store.registerAdapter('adapter', this.$$adapter, { 'default': true });
      var userOptions = {
        name: 'user',
        relations: {
          hasMany: {
            post: {
              localField: 'posts',
              foreignKey: 'userId'
            }
          },
          hasOne: {
            profile: {
              localField: 'profile',
              foreignKey: 'userId'
            },
            address: {
              localField: 'address',
              foreignKey: 'userId'
            }
          },
          belongsTo: {
            organization: {
              localField: 'organization',
              foreignKey: 'organizationId'
            }
          }
        }
      };
      var organizationOptions = {
        name: 'organization',
        relations: {
          hasMany: {
            user: {
              localField: 'users',
              foreignKey: 'organizationId'
            }
          }
        }
      };
      var postOptions = {
        name: 'post',
        relations: {
          belongsTo: {
            user: {
              localField: 'user',
              foreignKey: 'userId'
            }
          },
          hasMany: {
            comment: {
              localField: 'comments',
              foreignKey: 'postId'
            },
            tag: {
              localField: 'tags',
              localKeys: 'tagIds'
            }
          }
        }
      };
      var commentOptions = {
        name: 'comment',
        relations: {
          belongsTo: {
            post: {
              localField: 'post',
              foreignKey: 'postId'
            },
            user: {
              localField: 'user',
              foreignKey: 'userId'
            }
          }
        }
      };
      var tagOptions = {
        name: 'tag',
        relations: {
          hasMany: {
            post: {
              localField: 'posts',
              foreignKeys: 'tagIds'
            }
          }
        }
      };
      this.$$User = this.$$container.defineMapper('user', options.userConfig || options.JSData.utils.copy(userOptions));
      this.$$store.defineMapper('user', options.userConfig || options.JSData.utils.copy(userOptions));
      this.$$Organization = this.$$container.defineMapper('organization', options.organizationConfig || options.JSData.utils.copy(organizationOptions));
      this.$$store.defineMapper('organization', options.organizationConfig || options.JSData.utils.copy(organizationOptions));
      this.$$Profile = this.$$container.defineMapper('profile', options.profileConfig || {});
      this.$$store.defineMapper('profile', options.profileConfig || {});
      this.$$Address = this.$$container.defineMapper('address', options.addressConfig || {});
      this.$$store.defineMapper('address', options.addressConfig || {});
      this.$$Post = this.$$container.defineMapper('post', options.postConfig || options.JSData.utils.copy(postOptions));
      this.$$store.defineMapper('post', options.postConfig || options.JSData.utils.copy(postOptions));
      this.$$Comment = this.$$container.defineMapper('comment', options.commentConfig || options.JSData.utils.copy(commentOptions));
      this.$$store.defineMapper('comment', options.commentConfig || options.JSData.utils.copy(commentOptions));
      this.$$Tag = this.$$container.defineMapper('tag', options.tagConfig || options.JSData.utils.copy(tagOptions));
      this.$$store.defineMapper('tag', options.tagConfig || options.JSData.utils.copy(tagOptions));
      this.toClear = ['User'];
    });

    describe('js-data-adapter-tests', function () {
      if (options.hasMethod('beforeCreate')) {
        beforeCreateTest(options);
      }
      if (options.hasMethod('count')) {
        countTest(options);
      }
      if (options.hasMethod('create')) {
        createTest(options);
      }
      if (options.hasMethod('afterCreate')) {
        afterCreateTest(options);
      }
      if (options.hasMethod('createMany')) {
        createManyTest(options);
      }
      if (options.hasMethod('extend')) {
        extendTest(options);
      }
      if (options.hasMethod('find')) {
        findTest(options);
      }
      if (options.hasMethod('findAll')) {
        findAllTest(options);
      }
      if (options.hasMethod('destroy')) {
        destroyTest(options);
      }
      if (options.hasMethod('destroyAll')) {
        destroyAllTest(options);
      }
      if (options.hasMethod('beforeUpdate')) {
        beforeUpdateTest(options);
      }
      if (options.hasMethod('sum')) {
        sumTest(options);
      }
      if (options.hasMethod('update')) {
        updateTest(options);
      }
      if (options.hasMethod('afterUpdate')) {
        afterUpdateTest(options);
      }
      if (options.hasMethod('updateAll')) {
        updateAllTest(options);
      }
      if (options.hasMethod('updateMany')) {
        updateManyTest(options);
      }
    });

    afterEach(asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var Test, toClear, promise;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Test = this;
              toClear = [];

              if (Test.toClear.indexOf('Tag') !== -1) {
                toClear.push('Tag');
              }
              if (Test.toClear.indexOf('Comment') !== -1) {
                toClear.push('Comment');
              }
              if (Test.toClear.indexOf('Post') !== -1) {
                toClear.push('Post');
              }
              if (Test.toClear.indexOf('Profile') !== -1) {
                toClear.push('Profile');
              }
              if (Test.toClear.indexOf('User') !== -1) {
                toClear.push('User');
              }
              if (Test.toClear.indexOf('Address') !== -1) {
                toClear.push('Address');
              }
              promise = Promise.resolve();

              toClear.forEach(function (Mapper) {
                promise = promise.then(function () {
                  return Test.$$adapter.destroyAll(Test['$$' + Mapper]);
                });
              });
              _context.next = 12;
              return promise;

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
  },
  assert: chai.assert,
  sinon: sinon$1,
  fail: function fail(msg) {
    chai.assert.equal('should not reach this!: ' + msg, 'failure');
  },
  TYPES_EXCEPT_STRING: [123, 123.123, null, undefined, {}, [], true, false, function () {}],
  TYPES_EXCEPT_STRING_OR_ARRAY: [123, 123.123, null, undefined, {}, true, false, function () {}],
  TYPES_EXCEPT_STRING_OR_NUMBER: [null, undefined, {}, [], true, false, function () {}],
  TYPES_EXCEPT_STRING_OR_OBJECT: [123, 123.123, null, undefined, [], true, false, function () {}],
  TYPES_EXCEPT_STRING_OR_NUMBER_OBJECT: [null, undefined, [], true, false, function () {}],
  TYPES_EXCEPT_STRING_OR_ARRAY_OR_NUMBER: [null, undefined, {}, true, false, function () {}],
  TYPES_EXCEPT_NUMBER: ['string', null, undefined, {}, [], true, false, function () {}],
  TYPES_EXCEPT_OBJECT: ['string', 123, 123.123, null, undefined, true, false, function () {}],
  TYPES_EXCEPT_BOOLEAN: ['string', 123, 123.123, null, undefined, {}, [], function () {}],
  TYPES_EXCEPT_FUNCTION: ['string', 123, 123.123, null, undefined, {}, [], true, false]
};

return index;

})));
//# sourceMappingURL=js-data-adapter-tests.js.map
