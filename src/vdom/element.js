/**
 * 模拟 dom 对象
 */
var _=require("../util/util.js");

function Element (tagName, props, children) {
    if (!(this instanceof Element)) {
        if (!_.isArray(children) && children != null) {
            children = _.slice(arguments, 2).filter(_.truthy)
        }
        return new Element(tagName, props, children)
    }

    if (_.isArray(props)) {
        children = props
        props = {}
    }
    this.tagName = tagName;
    this.props = props;
    this.children = children;
    this.key = props ? props.key: void 0;
    var count = 0
    if(_.isArray(this.children)){
        _.each(this.children, function (child, i) {
            if (child instanceof Element) {
                count += child.count
            } else {
                children[i] = '' + child
            }
            count++
        });
    }
    this.count = count;
    console.log(this);
}

/**
 * 获取需要渲染的元素集合
 */
Element.prototype = {
    render:function(){
        var el =document.createElement(this.tagName);
        var props =this.props;
        for (var propName in props){
            var propValue = props[propName];
            _.setAttr(el,propName,propValue);
        }        
        if(_.isArray(this.children)){
            //遍历子节点
            _.each(this.children,function(child){
                // 如果子节点也是虚拟DOM，递归构建DOM节点
                // 如果字符串，只构建文本节点
                var childEl =(child instanceof Element) ? child.render():document.createTextNode(child);
                el.appendChild(childEl);
            });
        }
        return el;
    }
};

module.exports = function (tagName, props, children) {
    return new Element(tagName, props, children);
};
