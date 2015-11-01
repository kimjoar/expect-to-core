expect-to-core
==============

Core assertions for [expect-to](https://github.com/kjbekkelund/expect-to).

Assertions
----------

- `equal`

  ```javascript
  expect('test').to(equal('test'));
  ```
- `deepEqual`

  ```javascript
  expect({ name: 'kim' }).to(deepEqual({ name: 'kim' }));
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
  ```
- `beFalsy`

  ```javascript
  expect('').to(beFalsy);
  ```
- `beUndefined`

  ```javascript
  expect(undefined).to(beUndefined);
  ```
- `beNull`

  ```javascript
  expect(null).to(beNull);
  ```
- `exist`

  ```javascript
  expect('test').to(exist);
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
  ```
- `match`

  ```javascript
  expect('TeSt').to(match(/test/i));
  ```
