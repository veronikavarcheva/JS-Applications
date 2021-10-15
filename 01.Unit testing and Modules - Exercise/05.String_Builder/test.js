const StringBuilder = require('./StringBuilder');
let assert = require('chai').assert;
let expect = require('chai').expect;

describe('StringBuilder', ()=>{
    describe ('constructor', ()=>{      
        it('should test with string argument', ()=> {
            let obj = new StringBuilder('text');
            expect(obj).to.have.property('_stringArray').with.lengthOf(4);
            
        });
        it('should test without argument', ()=> {
            let obj = new StringBuilder();
            expect(obj).to.have.property('_stringArray').with.lengthOf(0);
        
        });
        it('should test with wrong parameter', ()=> {
            expect(() => new StringBuilder(5)).to.Throw('Argument must be string');
        });
        
    });
    describe ('append', ()=>{
        it('should test if added at the end', ()=> {
            let obj = new StringBuilder('text');
            obj.append('s');
            expect(obj._stringArray[4]).to.equal('s');
        });
        it('should test the new length after added at the end', ()=> {
            let obj = new StringBuilder('text');
            obj.append('s');
            expect(obj).to.have.property('_stringArray').with.lengthOf(5);
            
        });
        it('should test with wrong parameter', ()=> {
            let obj = new StringBuilder('text');
            expect(() => obj.append(5)).to.Throw('Argument must be string');
        });
    });
    describe ('prepend', ()=>{
        it('should test if added at the beginning', ()=> {
            let obj = new StringBuilder('text');
            obj.prepend('a');
            expect(obj._stringArray[0]).to.equal('a');
        });
        it('should test the new length after added at the beginning', ()=> {
            let obj = new StringBuilder('text');
            obj.prepend('a');
            expect(obj).to.have.property('_stringArray').with.lengthOf(5);
          
        });
        it('should test with wrong parameter', ()=> {
            let obj = new StringBuilder('text');
            expect(() => obj.prepend(5)).to.Throw('Argument must be string');
        });
    });
    describe ('insertAt', ()=>{
        it('should test if inserted at index', ()=> {
            let obj = new StringBuilder('txt');
            obj.insertAt('е', 1);
            expect(obj._stringArray[1]).to.equal('е');
       
        });
        it('should test the new length after inserted at index', ()=> {
            let obj = new StringBuilder('txt');
            obj.insertAt('e');
            expect(obj).to.have.property('_stringArray').with.lengthOf(4);
           
        });
        it('should test with wrong parameter', ()=> {
            let obj = new StringBuilder('txt');
            expect(() => obj.insertAt(1, 5)).to.Throw('Argument must be string');
        });
    });
    describe ('remove', ()=>{
        it('should test if removed at index the number of length elments', ()=>{
            let obj = new StringBuilder('text');
            obj.remove(1,2);
            expect(obj._stringArray.join('')).to.equal('tt');
        });
        it('should test the length after removed at index the number of length elments', ()=>{
            let obj = new StringBuilder('text');
            obj.remove(1, 2);                                                                                      
            expect(obj).to.have.property('_stringArray').with.lengthOf(2);
        });
        it('should test with wrong parameter', ()=> {
            let obj = new StringBuilder('text');
            obj.remove(2,2);
            expect(obj).to.have.property('_stringArray').with.lengthOf(2);
        });
    })
   

    describe('toString',  ()=> {
        it('should test if joined',  () => {
            let obj = new StringBuilder('text');
            expect(obj.toString()).to.equal('text');
        });
    });

    it('should have the correct function properties', function () {
        assert.isFunction(StringBuilder.prototype.append);
        assert.isFunction(StringBuilder.prototype.prepend);
        assert.isFunction(StringBuilder.prototype.insertAt);
        assert.isFunction(StringBuilder.prototype.remove);
        assert.isFunction(StringBuilder.prototype.toString);
    });

    it('full test', function () {
        let str = new StringBuilder('text');
        str.append(', please');
        str.prepend('Read, ');
        str.insertAt('the book ', 6);
        str.remove(9, 5);
        expect(str.toString()).to.equal('Read, the text, please');
    });
});
