let mathEnforcer = require('./mathEnforcer');
let {assert} = require('chai');
let {expect} = require('chai');

describe ('MathEnforcer', ()=>{
    describe('addFive', ()=>{
        it('should return undefined when parameter is not a number', ()=>{
            assert.equal(undefined, mathEnforcer.addFive('Pesho'));
        });
   
        it('should return correct value when parameter is a positive number', ()=>{
            assert.equal(10, mathEnforcer.addFive(5));
        });
   
        it('should return correct value when parameter is a negative number', ()=>{
            assert.equal(0, mathEnforcer.addFive(-5));
        });
  
        it('should return correct value when parameter is a floating-point number', ()=>{
            assert.equal(10.51, mathEnforcer.addFive(5.51));
        });
        it('should return correct value when parameter is a negative number', ()=>{
            assert.equal(5, mathEnforcer.addFive(0));
        });
        it('should return correct result if parameter is a float number with closeTo ', () => {
            expect(mathEnforcer.addFive(5.3339)).to.be.closeTo(10.33, 0.01);
        })
    });
  
   describe('subtractTen', ()=>{
        it('should return undefined when parameter is not a number', ()=>{
            assert.equal(undefined, mathEnforcer.subtractTen('Pesho'));
        });
  
        it('should return correct value when parameter is a positive number', ()=>{
            assert.equal(-5, mathEnforcer.subtractTen(5));
        });
    
        it('should return correct value when parameter is a negative number', ()=>{
            assert.equal(-15, mathEnforcer.subtractTen(-5));
        });
    
        it('should return correct value when parameter is a floating-point number', ()=>{
            assert.equal(-4.49, mathEnforcer.subtractTen(5.51));
        });
        it('should return correct value when parameter is a floating-point number', ()=>{
            assert.equal(-10, mathEnforcer.subtractTen(0));
        });
        it('should return correct value when parameter is a floating-point number', ()=>{
            assert.equal(0, mathEnforcer.subtractTen(10));
        });
        it('should return correct result if parameter is a float number with closeTo', ()=>{
            expect(mathEnforcer.subtractTen(10.3339)).to.be.closeTo(0.33, 0.01);
 
        });
    });
    describe('sum', ()=>{
        it('should return undefined when parameter1 is not a number', ()=>{
            assert.equal(undefined, mathEnforcer.sum('Pesho', 5));
        });
   
        it('should return undefined when parameter2 is not a number', ()=>{
            assert.equal(undefined, mathEnforcer.sum(5, 'Gosho'));
        });
    
        it('should return undefined when parameter1 and parameter2 are not numbers', ()=>{
            assert.equal(undefined, mathEnforcer.sum('Pesho', 'Gosho'));
        });
  
        it('should return correct value when parameter1 and parameter2 are positive numbers', ()=>{
            assert.equal(3, mathEnforcer.sum(1, 2));
        });
    
        it('should return correct value when parameter1 and parameter2 are negative numbers', ()=>{
            assert.equal(-3, mathEnforcer.sum(-1, -2));
        });
    
        it('should return correct value when parameter1 and parameter2 are floating-point numbers', ()=>{
            assert.equal(3.8, mathEnforcer.sum(1.5, 2.3));
        });
    
        it('should return correct value when parameter1 is a positive number and parameter2 is a negative number', ()=>{
            assert.equal(-1, mathEnforcer.sum(1, -2));
        });
    
        it('should return correct value when parameter2 is a positive number and parameter1 is a negative number', ()=>{
            assert.equal(1, mathEnforcer.sum(-1, 2));
        });
    
        it('should return correct value when parameter1 is a floating-point number and parameter2 is a positive Integer number', ()=>{
            assert.equal(3.5, mathEnforcer.sum(1.5, 2));
        });
    
        it('should return correct value when parameter2 is a floating-point number and parameter1 is a positive Integer number', ()=>{
            assert.equal(3.5, mathEnforcer.sum(1, 2.5));
        });
        it('sum should return correct result if param is a float number with closeTo', ()=>{
            expect(mathEnforcer.sum(10.3339,10)).to.be.closeTo(20.33, 0.01); 
        });
    });

});