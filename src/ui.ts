import * as $ from 'jquery';
import * as moment from 'moment';
// class UI{
//     settings

//     get(url:string,callback){
//         this.ajax("GET",url,callback);
//     }
//     post(url:string,callback){
//         this.ajax("POST",url,callback);
//     }
//     ajax(method:string,url:string,callback){
//         $.ajax({
//             method:method,
//             url:url,
//         }).done(function( data ) {
//             callback(data)
//         })
//     }
//     render(){
//         let {from,is_snooze_enabled}=settings;
//         var body=$("body").empty();
//         if(from){
//             body.html(indextemplate({
//                 from:{
//                     hour:from.hour,
//                     minute:from.minute,
//                 },
//                 is_snooze_enabled:is_snooze_enabled
//             }))
//             if(!is_snooze_enabled){
//                 body.find("#snooze").click(()=>{
//                     snooze();
//                 });
//             }
//         }
//     }
//     fetch_settings_from_server_and_render(){
//         this.get("info",(info)=>{
//             this.settings={
//                 from:info.from,
//                 is_snooze_enabled:info.is_snooze_enabled||false
//             };
//             this.render();
//         });
//     }
//     snooze(){
//         this.post("snooze",()=>{ 
//             this.fetch_settings_from_server_and_render();
//         });
//     }
// }
var indextemplate = require("./UI/index.handlebars");
var settings={
    from:undefined,
    is_snooze_enabled:false
};;
function fetch_settings_from_server_and_render(resolve?){
    $.get("info",(info)=>{
        settings={
            from:info.from,
            is_snooze_enabled:info.is_snooze_enabled||false
        };
        render();
    });
}
function snooze(){
    $.post("snooze",()=>{ 
        fetch_settings_from_server_and_render();
    });
}
function render(){
    let {from,is_snooze_enabled}=settings;
    var body=$("body").empty();
    if(from){
        body.html(indextemplate({
            from:{
                hour:from.hour,
                minute:from.minute,
            },
            is_snooze_enabled:is_snooze_enabled
        }))
        if(!is_snooze_enabled){
            body.find("#snooze").click(()=>{
                snooze();
            });
        }
    }
}
$(()=>{
    render();
    fetch_settings_from_server_and_render();
})