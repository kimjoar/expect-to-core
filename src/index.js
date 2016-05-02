import fnName from 'fn.name'
import isDeepEqual from 'deep-eql'
import compareErrors from 'compare-errors'

export const not = (test) => (obj) =>
  test({ ...obj, assert: obj.assert.not, not: true })

export const equal = (expected) => ({ actual, assert }) =>
  assert(actual === expected,
    ['Expected %j to equal %j', actual, expected],
    ['Expected %j not to equal %j', actual, expected],
    expected)

export const deepEqual = (expected) => ({ actual, assert }) =>
  assert(isDeepEqual(actual, expected),
    ['Expected %j to deep equal %j', actual, expected],
    ['Expected %j not to deep equal %j', actual, expected],
    expected)

export const be = (expected) => ({ actual, assert }) =>
  assert(actual === expected,
    ['Expected %j to be %j', actual, expected],
    ['Expected %j not to be %j', actual, expected],
    expected)

export const beTrue = be(true)
export const beFalse = be(false)
export const beUndefined = be(undefined)
export const beNull = be(null)

export const beTruthy = ({ actual, assert }) =>
  assert(!!actual,
    ['Expected %j to be truthy', actual],
    ['Expected %j not to be truthy', actual])

export const beFalsy = ({ actual, assert }) =>
  assert(!actual,
    ['Expected %j to be falsy', actual],
    ['Expected %j not to be falsy', actual])

export const exist = ({ actual, assert }) =>
  assert(actual != null,
    ['Expected %j to exist', actual],
    ['Expected %j not to exist', actual])

export const beEmpty = ({ actual, assert }) =>
  assert(actual.length === 0,
    ['Expected %j to be empty', actual],
    ['Expected %j not to be empty', actual])

export const contain = (item) => ({ actual: arr, assert }) =>
  assert(arr.indexOf(item) > -1,
    ['Expected %j to contain %j', arr, item],
    ['Expected %j not to contain %j', arr, item])

export const beInstanceOf = (expected) => ({ actual, assert }) =>
  assert(actual instanceof expected,
    ['Expected %j to be instance of %s', actual, fnName(expected)],
    ['Expected %j not to be instance of %s', actual, fnName(expected)])

export const beType = (type) => ({ actual, assert }) =>
  assert(typeof actual === type,
    ['Expected %j to be of type %j, but was %j', actual, type, typeof actual],
    ['Expected %j not to be of type %j, but was %j', actual, type, typeof actual])

export const match = (regex) => ({ actual, assert }) =>
  assert(regex.test(actual),
    ['Expected %j to match %j', actual, regex],
    ['Expected %j not to match %j', actual, regex])

export const throwError = (expected, message) => ({ actual: fn, assert }) => {
  if (typeof fn !== 'function') {
    throw new Error('Expected function as input to assertion')
  }

  let didThrow = false
  try {
    fn()
  } catch (e) {
    didThrow = true

    if (expected != null || message != null) {
      const res = compareErrors(expected, message)(e)

      if (res.type === 'instance' || res.type === 'constructor') {
        return assert(res.matches,
          ['Expected to throw %s but %s was thrown', res.expected, res.actual],
          ['Expected not to throw %s', res.expected])
      }

      return assert(res.matches,
        ['Expected to throw error matching %s but got %s', res.expected, res.actual],
        ['Expected not to throw error matching %s', res.expected])
    }
  }

  return assert(didThrow,
    'Expected function to throw',
    'Expected function not to throw')
}

export const throws = throwError
