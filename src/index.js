import fnName from 'fn.name'
import invariant from 'invariant'
import isDeepEqual from 'deep-eql'
import compareErrors from 'compare-errors'

const not = (test) => (obj) =>
  test({ ...obj, assert: obj.assert.not })

const equal = (expected) => ({ actual, assert, stringify }) =>
  assert(actual === expected,
    `Expected ${stringify(actual)} to equal ${stringify(expected)}`,
    `Expected ${stringify(actual)} not to equal ${stringify(expected)}`,
    expected)

const deepEqual = (expected) => ({ actual, assert, stringify }) =>
  assert(isDeepEqual(actual, expected),
    `Expected ${stringify(actual)} to deep equal ${stringify(expected)}`,
    `Expected ${stringify(actual)} not to deep equal ${stringify(expected)}`)

const beTrue = ({ actual, assert, stringify }) =>
  assert(actual === true,
    `Expected ${stringify(actual)} to be true`,
    `Expected ${stringify(actual)} not to be true`)

const beFalse = ({ actual, assert, stringify }) =>
  assert(actual === false,
    `Expected ${stringify(actual)} to be false`,
    `Expected ${stringify(actual)} not to be false`)

const beTruthy = ({ actual, assert, stringify }) =>
  assert(!!actual,
    `Expected ${stringify(actual)} to be truthy`,
    `Expected ${stringify(actual)} not to be truthy`)

const beFalsy = ({ actual, assert, stringify }) =>
  assert(!actual,
    `Expected ${stringify(actual)} to be falsy`,
    `Expected ${stringify(actual)} not to be falsy`)

const beUndefined = ({ actual, assert, stringify }) =>
  assert(actual === undefined,
    `Expected ${stringify(actual)} to be undefined`,
    `Expected ${stringify(actual)} not to be undefined`)

const beNull = ({ actual, assert, stringify }) =>
  assert(actual === null,
    `Expected ${stringify(actual)} to be null`,
    `Expected ${stringify(actual)} not to be null`)

const exist = ({ actual, assert, stringify }) =>
  assert(actual != null,
    `Expected ${stringify(actual)} to exist`,
    `Expected ${stringify(actual)} not to exist`)

const beEmpty = ({ actual, assert, stringify }) =>
  assert(actual.length === 0,
    `Expected ${stringify(actual)} to be empty`,
    `Expected ${stringify(actual)} not to be empty`)

const contain = (item) => ({ actual: arr, assert, stringify }) =>
  assert(arr.indexOf(item) > -1,
    `Expected ${stringify(arr)} to contain ${stringify(item)}`,
    `Expected ${stringify(arr)} not to contain ${stringify(item)}`)

const beInstanceOf = (expected) => ({ actual, assert, stringify }) =>
  assert(actual instanceof expected,
    `Expected ${stringify(actual)} to be instance of ${fnName(expected)}`,
    `Expected ${stringify(actual)} not to be instance of ${fnName(expected)}`)

const beType = (type) => ({ actual, assert, stringify }) =>
  assert(typeof actual === type,
    `Expected ${stringify(actual)} to be of type ${stringify(type)}, but was "${typeof actual}"`,
    `Expected ${stringify(actual)} not to be of type ${stringify(type)}, but was "${typeof actual}"`)

const match = (regex) => ({ actual, assert, stringify }) =>
  assert(regex.test(actual),
    `Expected ${stringify(actual)} to match ${stringify(regex)}`,
    `Expected ${stringify(actual)} not to match ${stringify(regex)}`)

const throws = (expected, message) => ({ actual: fn, assert, stringify }) => {
  invariant(typeof fn === 'function',
    `expected function as input to assertion`)

  let didThrow = false
  try {
    fn()
  } catch (e) {
    didThrow = true

    if (expected != null || message != null) {
      const res = compareErrors(expected, message)(e)

      if (res.type === 'instance' || res.type === 'constructor') {
        return assert(res.matches,
          `Expected to throw ${res.expected} but ${res.actual} was thrown`,
          `Expected not to throw ${res.expected}`)
      }

      return assert(res.matches,
        `Expected to throw error matching ${res.expected} but got ${res.actual}`,
        `Expected not to throw error matching ${res.expected}`)
    }
  }

  return assert(didThrow,
    `Expected function to throw`,
    `Expected function not to throw`)
}

export { not, equal, deepEqual, beTrue, beFalse, beTruthy, beFalsy, beNull, beUndefined, exist, beEmpty, contain, beInstanceOf, beType, match, throws }
