expect-to-core
==============

Core assertions for [expect-to](https://github.com/kjbekkelund/expect-to).

Installation
------------

```
npm install --save-dev expect-to-core
```

Assertions
----------

- `be` — does a `===` check

  ```javascript
  expect('test').to(be('test'));
  ```
- `deepEqual` — does a deeply equal check using [`deep-eql`](https://www.npmjs.com/package/deep-eql)

  ```javascript
  expect({ foo: 'bar' }).to(deepEqual({ foo: 'bar' }));
  ```
- `not`

  ```javascript
  expect('test').to(not(be('testing')));
  ```
- `beTruthy`

  ```javascript
  expect('test').to(beTruthy);
  expect(null).to(not(beTruthy));
  ```
- `beFalsy`

  ```javascript
  expect('').to(beFalsy);
  expect('foo').to(not(beFalsy));
  ```
- `exist` (i.e. neither `null` nor `undefined`)

  ```javascript
  expect('test').to(exist);
  expect(null).to(not(exist));
  ```
- `beEmpty`

  ```javascript
  expect([]).to(beEmpty);
  ```
- `contain`

  ```javascript
  expect([1,2,3]).to(contain(2));
  ```
- `beInstanceOf`

  ```javascript
  expect(new Date()).to(beInstanceOf(Date));
  ```
- `beType`

  ```javascript
  expect(true).to(beType('boolean'));
  expect('foo').to(beType('string'));
  ```
- `match`

  ```javascript
  expect('TeSt').to(match(/test/i));
  ```
- `throwError`

  ```javascript
  expect(() => {
    throw new Error()
  }).to(throws()),

  expect(() => {
    throw new Error()
  }).to(throws(Error)),

  expect(() => {
    throw new Error('foo')
  }).to(throws(Error, 'foo')),

  expect(() => {
    throw new Error('foo')
  }).to(throws('foo')),

  expect(() => {
    throw new Error('foo')
  }).to(throws(/foo/)),
  ```

