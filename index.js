var el = require("./vdom/element.js");
var vdiff = require("./vdiff/vdiff.js");
var count = 0

var oldTree = el('ul',{id:"aa1"},[    
    el('li',{class:"mmmmmmmmmm",key:'ss',style: 'color: red'},['1111111111']),        
    el('li',{class:"ms"},['222222222222'])
]);

document.body.appendChild(oldTree.render());






var ss = 
setInterval(function () {
    if(count==0){
        clearInterval(ss);
    }
    var newTree = el('ul',{id:"aa2"},[    
        el('li',{class:"sssssssssssssss",key:'ss',style: 'color: red'},['1111111111']),        
        el('li',{class:"ms"},['333333333333'])
    ]);
    var diff = vdiff(oldTree,newTree);
    console.log(diff)
}, 1000);


