let assert  = require('chai').assert;
let {isOddOrEven} = require('./isOddOrEven');

describe('isOddOrEven', ()=>{
    it('should return undefined with param different from string', ()=>{
        assert.equal(undefined,isOddOrEven(5));
    });
    it('should return undefined with param different from string2', ()=>{
        assert.equal(undefined,isOddOrEven({}));
    });
    it('should return undefined with param different from string3', ()=>{
        assert.equal(undefined,isOddOrEven([]));
    });
    it('should return even', ()=>{
        assert.equal('even',isOddOrEven('pass'));
    });
    it('should return odd', ()=>{
        assert.equal('odd',isOddOrEven('check'));
    });
});