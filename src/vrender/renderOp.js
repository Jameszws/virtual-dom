

var _ = require("../util/util.js");
var renderOp = {
    
    replace:function(currentPatch,node){
        var newNode = (typeof currentPatch.node === 'string') ? document.createTextNode(currentPatch.node): currentPatch.node.render();
        node.parentNode.replaceChild(newNode, node);
    },

    reorder:function(node, moves) {
        var staticNodeList = _.toArray(node.childNodes);
        var maps = {};

        _.each(staticNodeList, function (node) {
            if (node.nodeType === 1) {
                var key = node.getAttribute('key');
                if (key) {
                    maps[key] = node;
                }
            }
        });

        _.each(moves, function (move) {
            var index = move.index;
            if (move.type === 0) { // remove item
                if (staticNodeList[index] === node.childNodes[index]) { // maybe have been removed for inserting
                    node.removeChild(node.childNodes[index]);
                }
                staticNodeList.splice(index, 1);
            } else if (move.type === 1) { // insert item
                var insertNode = maps[move.item.key]
                    ? maps[move.item.key] // reuse old item
                    : (typeof move.item === 'object') ? move.item.render() : document.createTextNode(move.item);
                staticNodeList.splice(index, 0, insertNode);
                node.insertBefore(insertNode, node.childNodes[index] || null);
            }
        });
    },

    props:function(node, props){
        for (var key in props) {
            if (props[key] === void 0) {
                node.removeAttribute(key);
            } else {
                var value = props[key];
                _.setAttr(node, key, value);
            }
        }
    },

    text:function(node,currentPatch){
        if (node.textContent) {
            node.textContent = currentPatch.content;
        } else {
            // ie 兼容
            node.nodeValue = currentPatch.content;
        }
    }
};

module.exports=renderOp;