let assert = require('chai').assert;
let {createCalculator} = require('./Add-Subtract');

describe('createCalculator', () => {
    it('get the internal sum', () => {
        let result = createCalculator();
        assert.equal(0, result.get());
    });
    it('get the internal sum', () => {
        let result = createCalculator();
        result.add(1);
        assert.equal(1, result.get());
    });
    it('get the internal sum', () => {
        let result = createCalculator();
        result.add('1');
        assert.equal(1, result.get());
    });
    it('get the internal sum', () => {
        let result = createCalculator();
        result.add('-1');
        assert.equal(-1, result.get());
    });
    it('get the internal sum', () => {
        let result = createCalculator();
        result.subtract(1);
        assert.equal(-1, result.get());
    });
    it('get the internal sum', () => {
        let result = createCalculator();
        result.subtract('1');
        assert.equal(-1, result.get());
    });
    it('get the internal sum', () => {
        let result = createCalculator();
        result.subtract('-1');
        assert.equal(1, result.get());
    });
});