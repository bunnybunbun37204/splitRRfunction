const splitRR = require('./index');

test('adds 1 equal to 2', () => {
  expect(splitRR(1)).toBe(2);
});

test('adds 4 equal to 5', () => {
    expect(splitRR(4)).toBe(5);
});

test('adds 5 equal to 6', () => {
    expect(splitRR(5)).toBe(6);
});

test('adds 6 equal 7', () => {
    expect(splitRR(6)).toBe(7);
});