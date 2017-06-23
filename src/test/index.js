var horse = require("../vhorse.js");
var count = 0;

// 1. 构建虚拟DOM
var oldTree = horse.createElement('ul',{id:"aa1",zws:"ssss"},[
    'aaaaaaaaaaaaaaaaaaa',
    horse.createElement('li',{class:"c1",key:'ss',style: 'color: red'},['1111111111']),        
    horse.createElement('li',{class:"c1"},['222222222222'])
]);

// 2. 通过虚拟DOM构建真正的DOM
var root =oldTree.render();
document.body.appendChild(root);

//*
var ss = setInterval(function () {
    if(count==0){
        clearInterval(ss);
    }
    // 3. 生成新的虚拟DOM
    var newTree =horse.createElement('ul',{id:"aa2"},[
        'bbbbbbbbbbbb',
        horse.createElement('div',{class:"c2",key:'ss',style: 'color: blue'},['111111111111']),
        horse.createElement('li',{class:"c2",key:'sss'},['333333333333']),
        horse.createElement('li',{class:"c2"},['444444444444']),
        horse.createElement('div',{class:"c2"},['555555555555']),
    ]);
    // 4. 比较两棵虚拟DOM树的不同
    var patches = horse.vdiff(oldTree,newTree);
    console.log(patches);
    
    // 5. 在真正的DOM元素上应用变更
    horse.patch(root, patches);

}, 3000);
//*/
