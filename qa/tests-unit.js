var fortune = require('./../src');
var expect = require('chai').expect;

suite('Тесты печений-предсказаний', function () {
    test('getRandomFortune() должна возвращать предсказание', function () {
        expect(typeof fortune.getRandomFortune() === 'string');
    });
});
