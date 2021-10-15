let {lookupChar} = require('./charLookup');
let {assert} = require('chai');

describe('lookupChar', ()=>{
    it('should return undefined with a non-string first param', ()=>{
        assert.equal(undefined, lookupChar(5,0));
    });
    it('should return undefined with a non-number second param', ()=>{
        assert.equal(undefined, lookupChar('Pesho','Gosho'));
    });
    it('should return undefined with a floating-point as a second param', ()=>{
        assert.equal(undefined, lookupChar('Pesho',5.17));
    });
    it('should return incorrect index with an incorrect index value', ()=>{
        assert.equal('Incorrect index', lookupChar('Pesho',15));
    });
    it('should return incorrect index with a negative index value', ()=>{
        assert.equal('Incorrect index', lookupChar('Pesho',-3));
    });
    it('should return incorrect index with an index value equal to string length', ()=>{
        assert.equal('Incorrect index', lookupChar('Pesho',5));
    });
    it('should return correct value with correct parameters', ()=>{
        assert.equal('P', lookupChar('Pesho',0));
    });
    it('should return correct value with correct parameters2', ()=>{
        assert.equal('s', lookupChar('Pesho',2));
    });
});