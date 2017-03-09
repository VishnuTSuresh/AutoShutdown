const spawn = require('child_process').spawn;
const open = require('open');
const moment = require('moment');
const jsonfile = require('jsonfile');
const _ = require('lodash');

let _time=_.memoize(function(hour,minute){
    return moment().hour(hour).minute(minute);
});
function time(hour,minute){
    return _time(hour,minute,moment().dayOfYear(),moment().year());
};

let settings=jsonfile.readFileSync("settings.json");
let from=settings.from;
let to=settings.to;

let popup_showed=false;
let app_start_time=moment();

function tick() {
    const now_time=moment();
    if(now_time.diff(app_start_time,"minutes")>=1){
        const shutdown_time=time(from.hour,from.minute);
        const wakeup_time=time(to.hour,to.minute);
        const popup_time=shutdown_time.clone().subtract(15,"minutes");

        if(now_time.isBetween(popup_time,shutdown_time)){
            if(popup_showed===false){
                popup_showed=true;
                open("https://output.jsbin.com/popapi");
            }
        }else{
            if(popup_showed===true){
                popup_showed=false;
            }
        }

        let shutdown=false;
        if(shutdown_time.isBefore(wakeup_time)){
            if(now_time.isBetween(shutdown_time,wakeup_time)){
                shutdown=true;
            }
        }else{
            if(now_time.isBefore(wakeup_time)||now_time.isAfter(shutdown_time)){
                shutdown=true;
            }
        }
        if(shutdown){
            spawn("shutdown",["-s"]);
        }
    }
}
tick()
setInterval(tick, 1000);
