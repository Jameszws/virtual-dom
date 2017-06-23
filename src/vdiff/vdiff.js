/**
 * differ算法
 */
var _ = require("../util/util.js");
var diffType = require("./diffType.js");
var diffOp = require("./diffOp.js");

function diff(oldTree,newTree){
    //差异
    var diff={};
    var index =0;
    compareOldWithNew(oldTree,newTree,index,diff);    
    return diff;
}

//比较函数
//old and new
function compareOldWithNew(oldNode,newNode,index,diff){
    var currentDiff=[];
    if(!newNode){
        
    } else if (_.isString(oldNode) && _.isString(newNode)){ // 节点相同，oldNode 和 newNode都是文本
        if(newNode !== oldNode){    //子节点内容被改变时候
            currentDiff.push(diffOp.diffText(newNode));
        }
    } else if (oldNode.tagName == newNode.tagName &&　oldNode.key == newNode.key){   //节点相同， 属性/子节点 不同
        var propsDiff=diffOp.diffProps(oldNode,newNode);
        if(propsDiff){ //属性不同
            currentDiff.push(propsDiff);
        }
        if(!isIgnoreChildren(newNode)){  //子节点不同
            diffOp.diffChildren(oldNode.children,newNode.children,index,diff,currentDiff,function(child, newChild, currentNodeIndex, diff){
                compareOldWithNew(child, newChild, currentNodeIndex, diff);
            });
        }
    } else { //节点不相同
        currentDiff.push(diffOp.diffNode(newNode));
    }

    if (currentDiff.length) {
        diff[index] = currentDiff;
    }
}

function isIgnoreChildren (node) {
    return (node.props && node.props.hasOwnProperty('ignore'))
}

module.exports = diff;