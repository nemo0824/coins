const { add } = require('../server');  

describe('Server Functions', () => {
  test('add function should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);  // add 함수 테스트
  });
});