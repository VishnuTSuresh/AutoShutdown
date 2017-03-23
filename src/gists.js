let _time=_.memoize(function(hour,minute,day,year){
    return moment().hour(hour).minute(minute);
});

function time(hour,minute){
    return _time(hour,minute,moment().dayOfYear(),moment().year());
};