import TimeTool from "./TimeTool";
import {expect} from "chai";

describe("TimeTool",()=>{
    describe("shouldShutdown",()=>{
        it("returns true when time is between start and end and start time comes before end time",()=>{
            var timetool=new TimeTool(1,0,6,0);
            expect(timetool.shouldShutdown(2,0)).to.be.true;
        });
        it("returns true when time is between start and end and start time comes after end time",()=>{
            var timetool=new TimeTool(23,0,5,0);
            expect(timetool.shouldShutdown(2,0)).to.be.true;
        });
        it("returns false when time is outside start and end and start time comes before end time",()=>{
            var timetool=new TimeTool(1,0,6,0);
            expect(timetool.shouldShutdown(7,0)).to.be.false;
        });
        it("returns false when time is outside start and end and start time comes after end time",()=>{
            var timetool=new TimeTool(23,0,5,0);
            expect(timetool.shouldShutdown(18,0)).to.be.false;
        });
    });
    describe("shouldShowPopup",()=>{
        it("returns true if there is less than 15 minutes to start time",()=>{
            var timetool=new TimeTool(1,0,6,0);
            expect(timetool.shouldShowPopup(0,50)).to.be.true;
        });
        it("returns false if there is more than 15 minutes to start time",()=>{
            var timetool=new TimeTool(1,0,6,0);
            expect(timetool.shouldShowPopup(0,40)).to.be.false;
        });
        it("returns false if time is after start time",()=>{
            var timetool=new TimeTool(1,0,6,0);
            expect(timetool.shouldShowPopup(1,5)).to.be.false;
        });
        it("returns true only once even if there is less than 15 minutes to start time",()=>{
            var timetool=new TimeTool(1,0,6,0);
            expect([timetool.shouldShowPopup(0,50),timetool.shouldShowPopup(0,55)]).to.eql([true,false]);
        });
    });
});
