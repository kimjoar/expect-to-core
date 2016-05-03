/* eslint-env mocha */

import assert from 'assert'
import sinon from 'sinon'
import {
  not,
  be,
  deepEqual,
  exist,
  contain,
  beTruthy,
  beFalsy,
  beEmpty,
  beInstanceOf,
  beType,
  match,
  throwError
} from './src'

const extractAssert = (spy) => spy.args[0][0]

describe('expect-to-core', () => {
  describe('#not', () => {
    it('should set value of `not` in object', () => {
      const spy = sinon.spy()

      const _assert = {
        not: {}
      }
      const actual = {}

      not(spy)({
        actual: actual,
        assert: _assert
      })

      const args = spy.firstCall.args

      assert.equal(args.length, 1)
      assert.strictEqual(args[0].actual, actual)
      assert.strictEqual(args[0].assert, _assert.not)
      assert.strictEqual(args[0].not, true)
    })
  })

  describe('#be', () => {
    it('succeeds when strings are strictly equal', () => {
      const spy = sinon.spy()

      be('test')({
        actual: 'test',
        assert: spy
      })

      sinon.assert.calledWithExactly(
        spy,
        true,
        ['Expected %j to be %j', 'test', 'test'],
        ['Expected %j not to be %j', 'test', 'test'],
        'test'
      )
    })

    it('fails when strings are not strictly equal', () => {
      const spy = sinon.spy()

      be('test')({
        actual: 'testing',
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })

    it('with not succeeds when strings are not equal', () => {
      const spy = sinon.spy()

      not(be('test'))({
        actual: 'testing',
        assert: { not: spy }
      })

      assert.equal(extractAssert(spy), false)
    })

    it('with not fails when strings are equal', () => {
      const spy = sinon.spy()

      not(be('test'))({
        actual: 'test',
        assert: { not: spy }
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds when booleans are be', () => {
      const spy = sinon.spy()

      be(true)({
        actual: true,
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('fails when booleans are not equal', () => {
      const spy = sinon.spy()

      be(true)({
        actual: false,
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })

    it('succeeds when same reference', () => {
      const test = { name: 'kim' }
      const spy = sinon.spy()

      be(test)({
        actual: test,
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('fails when different references', () => {
      const ref1 = { name: 'kim' }
      const ref2 = { name: 'kim' }

      const spy = sinon.spy()

      be(ref1)({
        actual: ref2,
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })
  })

  describe('#deepEqual', () => {
    it('succeeds when deeply equal', () => {
      const ref1 = { name: 'kim', arr: [1, 2, 3] }
      const ref2 = { name: 'kim', arr: [1, 2, 3] }
      const spy = sinon.spy()

      deepEqual(ref1)({
        actual: ref2,
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('handles regexes', () => {
      const ref1 = /test/
      const ref2 = /adsf/
      const spy = sinon.spy()

      deepEqual(ref1)({
        actual: ref2,
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })

    it('handles arrays vs objects', () => {
      const ref1 = []
      const ref2 = {}
      const spy = sinon.spy()

      deepEqual(ref1)({
        actual: ref2,
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })

    it('fails when not deeply equal', () => {
      const obj1 = { name: 'kim', arr: [1, 2] }
      const obj2 = { name: 'kim', arr: [1, 2, 3] }

      const spy = sinon.spy()

      deepEqual(obj1)({
        actual: obj2,
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })
  })

  describe('#beTruthy', () => {
    it('succeeds when true', () => {
      const spy = sinon.spy()

      beTruthy({
        actual: true,
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds when non-empty string', () => {
      const spy = sinon.spy()

      beTruthy({
        actual: 'test',
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('fails when false', () => {
      const spy = sinon.spy()

      beTruthy({
        actual: false,
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })

    it('fails when empty string', () => {
      const spy = sinon.spy()

      beTruthy({
        actual: '',
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })
  })

  describe('#beFalsy', () => {
    it('succeeds when false', () => {
      const spy = sinon.spy()

      beFalsy({
        actual: false,
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds when empty string', () => {
      const spy = sinon.spy()

      beFalsy({
        actual: '',
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds when null', () => {
      const spy = sinon.spy()

      beFalsy({
        actual: null,
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds when undefined', () => {
      const spy = sinon.spy()

      beFalsy({
        actual: undefined,
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds when number 0', () => {
      const spy = sinon.spy()

      beFalsy({
        actual: 0,
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('fails when true', () => {
      const spy = sinon.spy()

      beFalsy({
        actual: true,
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })

    it('fails when non-empty string', () => {
      const spy = sinon.spy()

      beFalsy({
        actual: 'test',
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })
  })

  describe('#exist', () => {
    it('succeeds when string', () => {
      const spy = sinon.spy()

      exist({
        actual: 'test',
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('fails when undefined', () => {
      const spy = sinon.spy()

      exist({
        actual: undefined,
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })

    it('fails when null', () => {
      const spy = sinon.spy()

      exist({
        actual: null,
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })
  })

  describe('#beEmpty', () => {
    it('succeeds when array is empty', () => {
      const spy = sinon.spy()

      beEmpty({
        actual: [],
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('fails when array contains any items', () => {
      const spy = sinon.spy()

      beEmpty({
        actual: [1],
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })
  })

  describe('#contain', () => {
    it('succeeds when array contains item', () => {
      const spy = sinon.spy()

      contain(1)({
        actual: [1, 2, 3],
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('fails when array does not contain item', () => {
      const spy = sinon.spy()

      contain(4)({
        actual: [1, 2, 3],
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })
  })

  describe('#beInstanceOf', () => {
    it('succeeds for dates', () => {
      const spy = sinon.spy()

      beInstanceOf(Date)({
        actual: new Date(),
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds for objects', () => {
      const spy = sinon.spy()

      beInstanceOf(Object)({
        actual: {},
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds for constructor functions', () => {
      function C () {}
      var o = new C()

      const spy = sinon.spy()

      beInstanceOf(C)({
        actual: o,
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('fails when type does not match', () => {
      const spy = sinon.spy()

      beInstanceOf(String)({
        actual: {},
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })

    it('fails when different constructor function', () => {
      function C () {}
      function D () {}
      var o = new C()

      const spy = sinon.spy()

      beInstanceOf(D)({
        actual: o,
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })
  })

  describe('#beType', () => {
    it('succeeds for objects', () => {
      const spy = sinon.spy()

      beType('object')({
        actual: {},
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds for date', () => {
      const spy = sinon.spy()

      beType('object')({
        actual: new Date(),
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds for string', () => {
      const spy = sinon.spy()

      beType('string')({
        actual: 'test',
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds for undefined', () => {
      const spy = sinon.spy()

      beType('undefined')({
        actual: undefined,
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('succeeds for boolean', () => {
      const spy = sinon.spy()

      beType('boolean')({
        actual: true,
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })
  })

  describe('#match', () => {
    it('succeeds when strings match', () => {
      const spy = sinon.spy()

      match(/hello/i)({
        actual: 'Hello',
        assert: spy
      })

      assert.equal(extractAssert(spy), true)
    })

    it('fails when strings does not match', () => {
      const spy = sinon.spy()

      match(/hello/i)({
        actual: 'hola',
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })
  })

  describe('#throwError', () => {
    it('fails when not given function as actual value', () => {
      const spy = sinon.spy()

      assert.throws(
        () =>
          throwError()({
            actual: 'test',
            assert: spy
          }),
        (err) => err.message === 'Expected function as input to assertion'
      )

      sinon.assert.notCalled(spy)
    })

    it('succeeds when function throws', () => {
      const spy = sinon.spy()

      throwError()({
        actual: () => { throw new Error() },
        assert: spy
      })

      sinon.assert.calledWithExactly(
        spy,
        true,
        'Expected function to throw',
        'Expected function not to throw'
      )
    })

    it('succeeds when function throws expected error', () => {
      const spy = sinon.spy()

      throwError(Error)({
        actual: () => { throw new Error() },
        assert: spy
      })

      sinon.assert.calledWithExactly(
        spy,
        true,
        ['Expected to throw %s but %s was thrown', 'Error', 'Error'],
        ['Expected not to throw %s', 'Error']
      )
    })

    it('succeeds when function throws expected message', () => {
      const spy = sinon.spy()

      throwError('foo')({
        actual: () => { throw new Error('foo') },
        assert: spy
      })

      sinon.assert.calledWithExactly(
        spy,
        true,
        ['Expected to throw error matching %s but got %s', 'foo', 'foo'],
        ['Expected not to throw error matching %s', 'foo']
      )
    })

    it('succeeds when function throws expected regex message', () => {
      const spy = sinon.spy()

      throwError(/foo/)({
        actual: () => { throw new Error('foo') },
        assert: spy
      })

      sinon.assert.calledWithExactly(
        spy,
        true,
        ['Expected to throw error matching %s but got %s', /foo/, 'foo'],
        ['Expected not to throw error matching %s', /foo/]
      )
    })

    it('fails when functions does not throw', () => {
      const spy = sinon.spy()

      throwError()({
        actual: () => {},
        assert: spy
      })

      sinon.assert.calledWithExactly(
        spy,
        false,
        'Expected function to throw',
        'Expected function not to throw'
      )
    })

    it('fails when expecting the wrong type', () => {
      const spy = sinon.spy()

      throwError(RangeError)({
        actual: () => { throw new Error() },
        assert: spy
      })

      sinon.assert.calledWithExactly(
        spy,
        false,
        ['Expected to throw %s but %s was thrown', 'RangeError', 'Error'],
        ['Expected not to throw %s', 'RangeError']
      )
    })

    it('fails when expecting the wrong message', () => {
      const spy = sinon.spy()

      throwError(RangeError)({
        actual: () => { throw new Error() },
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })

    it('fails when not matching expecting message', () => {
      const spy = sinon.spy()

      throwError(/bar/)({
        actual: () => { throw new Error('foo') },
        assert: spy
      })

      assert.equal(extractAssert(spy), false)
    })
  })
})
