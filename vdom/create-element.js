/**
 * 模拟 dom 对象
 */
var element = require('element.js');
element.prototype={
    
}

module.exports=function(tagName,props,children){
    return new createElement(tagName,props,children);
};
