import TimeTool from "./TimeTool";
import {expect} from "chai";

describe("TimeTool",()=>{
    let t1,t2;
    describe("shouldShutdown",()=>{
        beforeEach(()=>{
            t1=new TimeTool(1,0,6,0);
            t2=new TimeTool(23,0,5,0);
        });
        it("returns true when time is between shutdown time",()=>{
            expect([t1.shouldShutdown(2,0),t2.shouldShutdown(2,0)]).to.eql([true,true]);
        });
        it("returns false when time is outside shutdown time",()=>{
            expect([t1.shouldShutdown(7,0),t2.shouldShutdown(18,0)]).to.eql([false,false]);
        });
    });
    describe("shouldShowPopup (popup time starts 15 minutes before shutdown time and ends after wakeup time)",()=>{
        beforeEach(()=>{
            t1=new TimeTool(1,0,6,0);
            t2=new TimeTool(1,0,6,0);
        });
        function f(t1h,t1m,t2h,t2m){
            return [t1.shouldShowPopup(t1h,t1m),t2.shouldShowPopup(t2h,t2m)]
        }
        it("returns true if time is within popup time",()=>{
            expect(f(0,50,3,50)).to.eql([true,true]);
        });
        it("returns false if time is outside popup time",()=>{
            expect(f(0,40,6,10)).to.eql([false,false]);
        });
        it("returns true only once even if within popup time",()=>{
            expect([t1.shouldShowPopup(0,50),t1.shouldShowPopup(0,55)]).to.eql([true,false]);
        });
    }); 
}); 
