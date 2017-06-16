/**
 * 处理不同情况
 */

var _ = require("../util/util.js");
var diffType=require("./diffType.js");

var diffOp ={    
    //文本不同
    diffText:function(){        
        return {
            type:diffType.TEXT,
            content:newNode
        };        
    },
    
    //属性不同
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
            if(newProps[oKey] !==value){
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
        return count===0 ? null : propsDiff;
    },

    //子节点不同
    diffChildren:function(oldChildren, newChildren, index, diff, currentDiff){
        var diffs = listDiff(oldChildren, newChildren, 'key')
        newChildren = diffs.children

        if (diffs.moves.length) {
            var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
            currentPatch.push(reorderPatch)
        }        
    },

    //节点不同
    diffNode:function(newNode){
        return { type: diffType.REPLACE, node: newNode };
    }

};

module.exports= diffOp;