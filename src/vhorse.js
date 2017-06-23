
var element=require('./vdom/element.js')
var patch=require('./vrender/patch.js')
var vdiff=require('./vdiff/vdiff.js')

module.exports={
    createElement:element,
    patch:patch,
    vdiff:vdiff
};