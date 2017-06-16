

var util={
    
    type : function (obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    },

    isFunction:function(func){
        return this.type(func) === "Function";
    },

    isArray : function(list) {
       return this.type(list) === 'Array';
    },

    slice :function (arrayLike, index) {
        return Array.prototype.slice.call(arrayLike, index);
    },
    
    truthy : function (value) {
        return !!value;
    },
    
    isString :function (list) {
        return this.type(list) === 'String';
    },

    each : function (array, fn) {
        for (var i = 0, len = array.length; i < len; i++) {
            fn(array[i], i);
        }
    },

    toArray : function(listLike) {
        if (!listLike) {
            return [];
        }

        var list = [];

        for (var i = 0, len = listLike.length; i < len; i++) {
            list.push(listLike[i]);
        }

        return list;
    },

    setAttr : function(node, key, value) {
        switch (key) {
            case 'style':
                node.style.cssText = value;
                break;
            case 'value':
                var tagName = node.tagName || '';
                tagName = tagName.toLowerCase()
                if(tagName === 'input' || tagName === 'textarea') {
                    node.value = value;
                } else {                    
                    node.setAttribute(key, value);
                }
                break;
            default:
                node.setAttribute(key, value);
                break;
        }
    }
};

module.exports=util;