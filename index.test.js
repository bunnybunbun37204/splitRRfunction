const sum = require('./index');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 4 + 5 to equal 9', () => {
    expect(sum(4, 5)).toBe(9);
});

test('adds 5 - 5 to equal 0', () => {
    expect(sum(5, -5)).toBe(0);
});

test('adds 5 - 5 to equal 0', () => {
    expect(sum(5, -5)).toBe(0);
});