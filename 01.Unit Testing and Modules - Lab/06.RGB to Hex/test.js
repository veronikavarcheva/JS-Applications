let assert = require('chai').assert;
let {rgbToHexColor} = require('./RGB to Hex');

describe('rgbToHexColor', () => {
    it('should return undefined if red is not an integer', () => {
        assert.equal(undefined, rgbToHexColor(12.5, 15, 250));
    });
    it('should return undefined if green is not an integer', () => {
        assert.equal(undefined, rgbToHexColor(12, 15.5, 250));
    });
    it('should return undefined if blue is not an integer', () => {
        assert.equal(undefined, rgbToHexColor(12, 15, 250.77));
    });
    it('should return undefined if red and green are not integers', () => {
        assert.equal(undefined, rgbToHexColor(12.5, 15.5, 250));
    });
    it('should return undefined if red and blue are not integers', () => {
        assert.equal(undefined, rgbToHexColor(12.5, 15, 250.5));
    });
    it('should return undefined if green and blue are not integers', () => {
        assert.equal(undefined, rgbToHexColor(12.5, 15, 250.5));
    });
    it('should return undefined if red and blue are not integers', () => {
        assert.equal(undefined, rgbToHexColor(12, 15.7, 250.5));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal(undefined, rgbToHexColor(12.5, 15.77, 250.5));
    });
    it('should return undefined if red greater than 255', () => {
        assert.equal(undefined, rgbToHexColor(256, 15, 250));
    });
    it('should return undefined if red smaller than 0', () => {
        assert.equal(undefined, rgbToHexColor(-12.5, 15, 250));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal(undefined, rgbToHexColor(12, -15, 250));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal(undefined, rgbToHexColor(5, 280, 25));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal(undefined, rgbToHexColor(12, 15, -210));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal(undefined, rgbToHexColor(12, 15, 270));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal('#0A0FFA', rgbToHexColor(10, 15, 250));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal('#140FFF', rgbToHexColor(20, 15, 255));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal('#140F00', rgbToHexColor(20, 15, 0));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal('#14FFFA', rgbToHexColor(20, 255, 250));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal('#1400FA', rgbToHexColor(20, 0, 250));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal('#FF19FA', rgbToHexColor(255, 25, 250));
    });
    it('should return undefined if red, green and blue are not integers', () => {
        assert.equal('#0019FA', rgbToHexColor(0, 25, 250));
    });
});