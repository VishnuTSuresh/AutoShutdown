import TimeTool from "./TimeTool";
import {expect} from "chai";

describe("TimeTool",()=>{
    describe("shouldShutdown",()=>{
        let timetool_before_midnight,timetool_after_midnight;
        beforeEach(()=>{
            timetool_after_midnight=new TimeTool(1,0,6,0);
            timetool_before_midnight=new TimeTool(23,0,5,0);
        });
        it("returns true when time is between shutdown time and shutdown time comes before wakeup time",()=>{
            
            expect(timetool_after_midnight.shouldShutdown(2,0)).to.be.true;
        });
        it("returns true when time is between shutdown time and shutdown time comes after wakeup time",()=>{
            expect(timetool_before_midnight.shouldShutdown(2,0)).to.be.true;
        });
        it("returns false when time is outside shutdown time and shutdown time comes before wakeup time",()=>{
            
            expect(timetool_after_midnight.shouldShutdown(7,0)).to.be.false;
        });
        it("returns false when time is outside shutdown time and shutdown time comes after wakeup time",()=>{
            expect(timetool_before_midnight.shouldShutdown(18,0)).to.be.false;
        });
    });
    describe("shouldShowPopup (popup time starts 15 minutes before shutdown time and ends after wakeup time)",()=>{
        let t1,t2;
        beforeEach(()=>{
            t1=new TimeTool(1,0,6,0);
            t2=new TimeTool(1,0,6,0);
        });
        it("returns true if time is within popup time",()=>{
            expect([t1.shouldShowPopup(0,50),t2.shouldShowPopup(3,50)]).to.eql([true,true]);
        });
        it("returns false if time is outside popup time",()=>{
            expect([t1.shouldShowPopup(0,40),t2.shouldShowPopup(6,10)]).to.eql([false,false]);
        });
        it("returns true only once even if within popup time",()=>{
            expect([t1.shouldShowPopup(0,50),t1.shouldShowPopup(0,55)]).to.eql([true,false]);
        });
    });
});
