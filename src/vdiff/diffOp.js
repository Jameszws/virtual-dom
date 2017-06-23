/**
* 处理不同情况
*/
var _ = require("../util/util.js");
var diffType=require("./diffType.js");
var diffChildOp =require("./diffChildOp.js");

var diffOp ={    
    /**
    * 文本不同
    */
    diffText:function(newNode){        
        return {
            type:diffType.TEXT,
            content:newNode            
        };        
    },
        
    /**
    * 属性不同
    */
    diffProps:function(oldNode,newNode){
        var count =0;
        var oldProps=oldNode.props;
        var newProps=newNode.props;
        //var key;
        var value;
        var propsDiff={};
        //遍历老的属性，获得不同属性集合
        for(oKey in oldProps){
            value=oldProps[oKey];
            if(newProps[oKey] !== value){
                count++;
                propsDiff[oKey]=newProps[oKey];
            }
        }
        //遍历新的属性，获取新增的属性集合
        for(nKey in newProps){
            value=newProps[nKey];
            if(!oldProps.hasOwnProperty(nKey)){
                count++;
                propsDiff[nKey]=value;
            }
        }
        return count===0 ? null : {type:diffType.PROPS,props:propsDiff};
    },

    /**
    * 子节点不同
    */
    diffChildren:function(oldChildren, newChildren, index, diff, currentDiff,callback){
        var diffs = diffChildOp.diff(oldChildren, newChildren, 'key');
        newChildren = diffs.children;

        if (diffs.moves.length) {
            var reorderPatch = { type: diffType.REORDER, moves: diffs.moves };
            currentDiff.push(reorderPatch);
        }
        var leftNode = null;
        var currentNodeIndex = index;
        _.each(oldChildren, function (child, i) {
            var newChild = newChildren[i];
            currentNodeIndex = (leftNode && leftNode.count) ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
            _.isFunction(callback) && callback(child, newChild, currentNodeIndex, diff);
            leftNode = child;            
        });
    },
    
    /**
    * 节点不同
    */
    diffNode:function(newNode){
        return { type: diffType.REPLACE, node: newNode };
    }

};

module.exports= diffOp;