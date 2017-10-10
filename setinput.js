var request = require("request");
var fs = require('fs');

var j = request.jar();

// RegExp to extract the filename from Content-Disposition
var regexp = /\w+\.\w+/gi;

var baseUrl = "http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport";
var heades = {
    "User-Agent": "request",
    // "Origin": "http://raspisanie.mslu.by",
    // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Accept": "text/javascript, text/html, application/xml, text/xml, */*",
    // "X-Prototype-Version": "1.7",
    // "X-DevTools-Emulate-Network-Conditions-Client-Id": "aa256f53-b6f2-4f36-8f7b-43a7cf1c385a",
    "X-Requested-With": "XMLHttpRequest",
    // "DNT": "1",
    // "Referer": "http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport",
    // "Accept-Language": "en-US,en;q=0.8,ru;q=0.6",
    "Cookie": "JSESSIONID=A0437C2385AFE15EACD3F822F9B87779",
}

function callbackWrap(msg, cb) {
    return function callback(error, response, body) {
        console.log("Status code: ", response.statusCode);

        if (!error && response.statusCode == 200) {
            // var info = JSON.parse(body);
            // console.log(info.zones);
            // console.log(info.stargazers_count + " Stars");
            // console.log(info.forks_count + " Forks");
            console.log(msg);

            if (cb) {
                cb();
            }
        }
    }
}

function setInputValue(input, cb) {
    return request.post(
        { url: baseUrl + "." + input + ":change", headers: heades },
        // { url: baseUrl + "." + input + ":change", headers: heades, jar: j },
        cb
    )
}

function setFaculty() {
    setInputValue("faculty", callbackWrap("faculty:change", setCource))
    .form({
        "t:formcomponentid": "reports/publicreports/ScheduleListForGroupReport:printform",
        "t:formid": "printForm",
        "t:selectvalue": "5",
        "t:zoneid": "studyGroupZone"
    });
}

function setCource() {
    setInputValue("course", callbackWrap("course:change", setYear))
    .form({
        "t:formcomponentid": "reports/publicreports/ScheduleListForGroupReport:printform",
        "t:formid": "printForm",
        "t:selectvalue": "4",
        "t:zoneid": "studyWeekZone"
    });
}

function setYear() {
    setInputValue("studyyears", callbackWrap("studyyears:change", setWeek))
    .form({
        "t:formcomponentid": "reports/publicreports/ScheduleListForGroupReport:printform",
        "t:formid": "printForm",
        "t:selectvalue": "2017",
        "t:zoneid": "studyWeekZone"
    });
}

function setWeek() {
    setInputValue("studyweeks", callbackWrap("studyweeks:change", setGroup))
    .form({
        "t:formcomponentid": "reports/publicreports/ScheduleListForGroupReport:printform",
        "t:formid": "printForm",
        "t:selectvalue": "318",
        "t:zoneid": "buttonZone"
    });
}

function setGroup() {
    setInputValue("studygroups", callbackWrap("studygroups:change", saveFile)
    )
    .form({
        "t:formcomponentid": "reports/publicreports/ScheduleListForGroupReport:printform",
        "t:formid": "printForm",
        "t:selectvalue": "974",
        "t:zoneid": "buttonZone"
    });
}

function saveFile() {
        
    request(
        {
            headers: {
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "DNT": "1",
                "Referer": "http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport",
                "Accept-Encoding": "deflate",
                "Accept-Language": "en-US,en;q=0.8,ru;q=0.6",
                "Cookie": "JSESSIONID=A0437C2385AFE15EACD3F822F9B87779",
            },
            uri: 'http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport.printreport',
            method: 'GET'
        })
        .on('response', function( res ){

            console.log(res.headers);

            if (res.headers['content-disposition'] ) {
                // extract filename
                var filename = regexp.exec( res.headers['content-disposition'] )[0];

                // create file write stream
                var fws = fs.createWriteStream('./' + filename);

                // // setup piping
                res.pipe( fws );
            }


        res.on( 'end', function(){
            // go on with processing
            console.log("file saved!");
        });
    });
}

function main() {

    // request({ url: urle, jar: j}, (error, resp, html) => {
    //     if(!error) {
    //         var cookie_string = j.getCookieString(urle); // "key1=value1; key2=value2; ..."
    //         var cookies = j.getCookies(urle);
    //         var sessionId = cookie.parse(cookies.toString()).JSESSIONID;

    //         console.log("SessionId: ", sessionId);
    //     }
    // });

    setFaculty();

}

main();
