const expect = require('chai').expect;
const PaymentPackage = require('./PaymentPackage');


describe('PaymentPackage', function() {

    it('should test if first parameter is a number', () => {
        expect(() => new PaymentPackage(1, 2)).to.Throw('Name must be a non-empty string');
    });

    it('should test if first parameter is an empty string', () => {
        expect(() => new PaymentPackage('', 2)).to.Throw('Name must be a non-empty string');
    });

    it('should test if first parameter is a string', () => {
        let obj = new PaymentPackage('test', 2);
        expect(obj.name).to.equal('test');
    });

    it('should test if first parameter is a string and is changed', () => {
        let obj = new PaymentPackage('test', 2);
        expect(obj.name = 'newName').to.equal('newName');
    });

    it('should test if second parameter is a string', () => {
        expect(() => new PaymentPackage('test', 'test')).to.Throw('Value must be a non-negative number');
    });

    it('should test if second parameter is a negative number', () => {
        expect(() => new PaymentPackage('test', -2)).to.Throw('Value must be a non-negative number');
    });

    it('should test if second parameter is a positive number', () => {
        let obj = new PaymentPackage('test', 2);
        expect(obj.value).to.equal(2);
    });

    it('should test if second parameter is a positive number and is changed', () => {
        let obj = new PaymentPackage('test', 2);
        expect(obj.value = 3).to.equal(3);
    });

    it('should test if VAT is a default value', () => {
        let obj = new PaymentPackage('test', 2);
        expect(obj.VAT).to.equal(20);
    });

    it('should test if VAT is not a number', () => {
        let obj = new PaymentPackage('test', 2);
        expect(() => obj.VAT = 'VAT').to.Throw('VAT must be a non-negative number');
    });

    it('should test if VAT is a negative number', () => {
        let obj = new PaymentPackage('test', 2);
        expect(() => obj.VAT = -20).to.Throw('VAT must be a non-negative number');
    });

    it('should test if VAT is a positive number and is changed', () => {
        let obj = new PaymentPackage('test', 2);
        expect(obj.VAT = 10).to.equal(10);
    });

    it('should test if active is a default value', () => {
        let obj = new PaymentPackage('a', 1);
        expect(obj.active).to.equal(true);
    });

    it('should test if active is a string', () => {
        let obj = new PaymentPackage('test', 2);
        expect(() => obj.active = 'test').to.Throw('Active status must be a boolean');
    });

    it('should test if active is set to false', () => {
        let obj = new PaymentPackage('test', 2);
        expect(obj.active = false).to.equal(false);
    });

    it("test toString", () => {
        let obj = new PaymentPackage('HR Services', 1500);
        expect(obj.toString()).to.equal('Package: HR Services\n- Value (excl. VAT): 1500\n- Value (VAT 20%): 1800');
    });
    it("test toString", () => {
        let obj = new PaymentPackage('HR Services', 1500);
        obj.active = false;
        expect(obj.toString()).to.equal('Package: HR Services (inactive)\n- Value (excl. VAT): 1500\n- Value (VAT 20%): 1800');
    });
    it("test toString", () => {
        let obj = new PaymentPackage('HR Services', 1500);
        obj.VAT = 0;
        expect(obj.toString()).to.equal('Package: HR Services\n- Value (excl. VAT): 1500\n- Value (VAT 0%): 1500');
    });
    it("test toString", () => {
        let obj = new PaymentPackage('HR Services', 0);
        obj.VAT = 0;
        expect(obj.toString()).to.equal('Package: HR Services\n- Value (excl. VAT): 0\n- Value (VAT 0%): 0');
    });
});