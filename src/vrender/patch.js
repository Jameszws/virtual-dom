

var _ = require("../util/util.js");
var type = require("../vdiff/diffType.js");
var renderOp =require("./renderOp.js");

function patch(node,patches){
    var walker={index:0};
    dfsWalk(node,walker,patches);
}


function dfsWalk (node, walker, patches) {
    var currentPatches = patches[walker.index];
    var len = node.childNodes ? node.childNodes.length: 0 ;
    for (var i = 0; i < len; i++) {
        var child = node.childNodes[i];
        walker.index++;
        dfsWalk(child, walker, patches);
    }
    if (currentPatches) {
        applyPatches(node, currentPatches);
    }
}

function applyPatches (node, currentPatches) {
    _.each(currentPatches, function (currentPatch) {
        switch (currentPatch.type) {
            case type.REPLACE:
                renderOp.replace(currentPatch,node);                
                break;
            case type.REORDER:
                renderOp.reorder(node, currentPatch.moves);
                break;
            case type.PROPS:
                renderOp.props(node, currentPatch.props);
                break;
            case type.TEXT:
                renderOp.text(node,currentPatch);
                break;
            default:
                throw new Error('Unknown patch type ' + currentPatch.type);
        }
    });
}


module.exports = patch