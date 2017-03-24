import * as moment from 'moment';
import {Moment} from 'moment';
import * as _ from 'lodash';

/**
 * name
 */
class TimeTool {
    private start:Moment
    private end:Moment
    private is_snooze_enabled:boolean
    private get shutdown_time():Moment{
        return this.is_snooze_enabled?this.start.clone().add(1,"hour"):this.start.clone();
    }
    private get popup():Moment{
        return this.shutdown_time.clone().subtract(15,"minutes");
    }
    private popup_showed:boolean

    constructor(start_hour:number,start_minute:number,end_hour:number,end_minute:number) {
        this.start=moment("12-25-1995", "MM-DD-YYYY").hour(start_hour).minute(start_minute);
        this.end=moment("12-25-1995", "MM-DD-YYYY").hour(end_hour).minute(end_minute);
        this.popup_showed=false;
    }
    private getMoment(hourOrTime?:number|Moment,minute?:number):Moment{
        if(hourOrTime===undefined&&minute===undefined){
            return moment("12-25-1995", "MM-DD-YYYY");
        }else if(_.isNumber(hourOrTime)){
            return moment("12-25-1995", "MM-DD-YYYY").hour(hourOrTime).minute(minute);
        }else{
            return this.getMoment(hourOrTime.hour(),hourOrTime.minute());
        }
    }
    shouldShutdown(hour:number,minute:number):boolean;
    shouldShutdown(time:Moment):boolean;
    shouldShutdown():boolean;

    shouldShutdown(hourOrTime?:number|Moment,minute?:number):boolean{
        let shutdown=false;
        const now_time:Moment=this.getMoment(hourOrTime,minute);
        const shutdown_time:Moment=this.shutdown_time;
        const wakeup_time:Moment=this.end;
        
        if(shutdown_time.isBefore(wakeup_time)){
            if(now_time.isBetween(shutdown_time,wakeup_time)){
                shutdown=true;
            }
        }else{
            if(now_time.isBefore(wakeup_time)||now_time.isAfter(shutdown_time)){
                shutdown=true;
            }
        }
        return shutdown;
    }

    shouldShowPopup(hour:number,minute:number):boolean;
    shouldShowPopup(time:Moment):boolean;
    shouldShowPopup():boolean; 

    shouldShowPopup(hourOrTime?:number|Moment,minute?:number):boolean{
        const now_time:Moment=this.getMoment(hourOrTime,minute);
        let shouldShowPopup:boolean=false;
        const popup_time:Moment=this.popup;
        const wakeup_time:Moment=this.end;
        const shutdown_time:Moment=this.shutdown_time;
        if(now_time.isBetween(popup_time,shutdown_time)||this.shouldShutdown(now_time)){
            if(this.popup_showed===false){
                this.popup_showed=true;
                shouldShowPopup=true;
            }
        }else{
            if(this.popup_showed===true){
                this.popup_showed=false;
            }
        }
        return shouldShowPopup;
    }
    snooze():void{
        this.is_snooze_enabled=true;
    }
    getShutdownTime():Moment{
        return this.shutdown_time;
    }
}

export {TimeTool};
export default TimeTool;