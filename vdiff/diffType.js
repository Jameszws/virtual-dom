/**
 * differ算法 类型
 */
var diffType={
    REPLACE: 0, //替换掉原来的节点
    REORDER : 1, //移动、删除、新增子节点
    PROPS : 2,  //修改了节点的属性
    TEXT : 3    //对于文本节点，文本内容可能会改变
};

module.exports=diffType;