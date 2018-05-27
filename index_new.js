
// var lodash = require('lodash');
// console.log(lodash.without([1,2,3], 1));


var mammoth = require("mammoth");
 
mammoth.convertToHtml({path:'/Users/sandeep.a/Desktop/my_projects/curiosity/newTestFile.docx', arrayBuffer:[]})
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
       // document.getElementById('test').appendChild(html);
       console.log('html', html);
    })
    .done();