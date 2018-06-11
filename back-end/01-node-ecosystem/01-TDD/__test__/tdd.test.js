'use strict';

describe('Showcasing TDD with Jest', () => {
  test('Different ways to use the expect function with a number', () => {
    const aNumber = 5;
    expect(aNumber).toEqual(5);
  });

  test('Different ways to use the expect function with null', () => {
    const aNullValue = null;
    expect(aNullValue).toBeNull();
  });

  it('should be used to showcase how to add another test with it block', () => {
    const aTruthyValue = 'hi';
    expect(aTruthyValue).toBeTruthy();

    const aFalsyValue = 0;
    expect(aFalsyValue).toBeFalsy();
    expect(aFalsyValue).not.toBeTruthy();
  });
});
