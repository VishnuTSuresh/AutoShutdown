import { spawn } from 'child_process';
import * as open from 'open';
import * as moment from 'moment';
import * as jsonfile from 'jsonfile';
import * as _ from 'lodash';
import { TimeTool } from './TimeTool';
import { Server } from "./Server";

let settings = jsonfile.readFileSync("settings.json");
let from = settings.from;
let to = settings.to;

let app_start_time = moment();

let timetool = new TimeTool(from.hour, from.minute, to.hour, to.minute);

function tick() {
    const now_time = moment();
    if (now_time.diff(app_start_time, "minutes") >= 1) {
        if (timetool.shouldShowPopup(now_time)) {
            open("https://output.jsbin.com/popapi");
        }
        if (timetool.shouldShutdown(now_time)) {
            spawn("shutdown", ["-s"]);
        }
    }
}
var server = new Server();
server.start();
tick()
setInterval(tick, 1000);
