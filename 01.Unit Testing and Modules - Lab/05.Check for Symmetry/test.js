let assert =require('chai').assert;
let {isSymmetric} = require('./Check for Symmetry');

describe('test if is summetric', () => {
    it('should return false if the arg is a number', () => {
        assert.equal(false, isSymmetric(5));
    });
    it('should return false if the arg is a string', () => {
        assert.equal(false, isSymmetric('test'));
    });  
    it('should return false if the arg is an obj', () => {
        assert.equal(false, isSymmetric({}));
    });
    it('should return false if the arg is an obj', () => {
        assert.equal(false, isSymmetric(1, 2, 3, 2, 1));
    });  
    it('should return false if the arg is an array which elements are differen number', () => {
        assert.equal(false, isSymmetric([1, 2, 3, 4, 5]));
    });
    it('should return false if the arg is an array which elements are differen strings', () => {
        assert.equal(false, isSymmetric(['test1', 'test2', 'text']));
    });
    it('should return true if the arg is an array which elements are equal numbers', () => {
        assert.equal(true, isSymmetric([1, 1, 1, 1, 1]));
    });
    it('should return true if the arg is an array which elemnts are one and the same strings', () => {
        assert.equal(true, isSymmetric(['test', 'test', 'test']));
    });
    it('should return true', () => {
        assert.equal(true, isSymmetric([1, 2, 1, 2, 1]));
    });
    it('should return true', () => {
        assert.equal(true, isSymmetric(['test', 'test1', 'test']));
    });
    it('should return true', () => {
        assert.equal(true, isSymmetric([1, 'test', 1, 'test', 1]));
    });
    it('should return true', () => {
        assert.equal(true, isSymmetric([1]));
    });
    it('should return true', () => {
        assert.equal(true, isSymmetric([1, 2, 3, 2, 1]));
    });
    it('should return true', () => {
        assert.equal(true, isSymmetric([1, 2, 3, 3, 2, 1]));
    });
    it('should return true', () => {
        assert.equal(true, isSymmetric([1, 'test', {name: 'Stamat'}, 'test', 1]));
    });
    it('should return true', () => {
        assert.equal(true, isSymmetric([1, 'test', {name: 'Stamat'}, new Date(), {name: 'Stamat'}, 'test', 1]));
    });
});