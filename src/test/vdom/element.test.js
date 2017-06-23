/**
 *  create element test·
 */
var el = require('../../vdom/element.js');
var assert = require('chai').assert;
var expect = require('chai').expect;
describe('element.js unit test', function() {  
    it('#Element()', function() {        
        expect(
            el('ul',{id:"aa1"},[
                el('li',{class:"cs"}),
                el('li',{class:"cs"}),
                el('li',{class:"cs"})
            ])
        ).to.be.equal(2);
    });
});