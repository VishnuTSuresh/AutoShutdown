import * as $ from 'jquery';
import * as moment from 'moment';
var indextemplate = require("./UI/index.handlebars");

$(()=>{
    var infopane=$("<div></div>").appendTo("body");
    $.get("info",function(info){
        infopane.html(indextemplate({
            from:{
                hour:info.from.hour,
                minute:info.from.minute
            }
        }))
    })
})