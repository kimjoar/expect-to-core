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

- `equal`

  ```javascript
  expect('test').to(equal('test'));
  ```
- `deepEqual`

  ```javascript
  expect({ foo: 'bar' }).to(deepEqual({ foo: 'bar' }));
  ```
- `not`

  ```javascript
  expect('test').to(not(equal('testing')));
  ```
- `beTrue`

  ```javascript
  expect(true).to(beTrue);
  ```
- `beFalse`

  ```javascript
  expect(false).to(beFalse);
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
- `beUndefined`

  ```javascript
  expect(undefined).to(beUndefined);
  ```
- `beNull`

  ```javascript
  expect(null).to(beNull);
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
- `throws`

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

I don't particularly like the name `throws`, so I'm open to suggestions.
`throw` is sadly [not possible](http://es5.github.io/x7.html#x7.6.1.1).
