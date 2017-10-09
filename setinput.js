var request = require("request");

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
        "Cookie": "JSESSIONID=09C4D7BD718EA0F2FD874839ECDA3DEC",
}

var options = {
    url: '.course:change;jsessionid=09C4D7BD718EA0F2FD874839ECDA3DEC',
    headers: {

    }
};

function callback(error, response, body) {
    console.log("Status code: ", response.statusCode);

    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info.zones);
        // console.log(info.stargazers_count + " Stars");
        // console.log(info.forks_count + " Forks");
    }
}

request.post({url: baseUrl + '.faculty:change', headers: heades}, callback).form({
    "t:formcomponentid": "reports/publicreports/ScheduleListForGroupReport:printform",
    "t:formid": "printForm",
    "t:selectvalue": "5",
    "t:zoneid": "studyGroupZone"
});

request.post({url: baseUrl + '.course:change', headers: heades}, callback).form({
    "t:formcomponentid": "reports/publicreports/ScheduleListForGroupReport:printform",
    "t:formid": "printForm",
    "t:selectvalue": "5",
    "t:zoneid": "studyWeekZone"
});

request.post({url: baseUrl + '.studyyears:change', headers: heades}, callback).form({
    "t:formcomponentid": "reports/publicreports/ScheduleListForGroupReport:printform",
    "t:formid": "printForm",
    "t:selectvalue": "2017",
    "t:zoneid": "studyWeekZone"
});

request.post({url: baseUrl + '.studyweeks:change', headers: heades}, callback).form({
    "t:formcomponentid": "reports/publicreports/ScheduleListForGroupReport:printform",
    "t:formid": "printForm",
    "t:selectvalue": "318",
    "t:zoneid": "buttonZone"
});

request.post({url: baseUrl + '.studygroups:change', headers: heades}, callback).form({
    "t:formcomponentid": "reports/publicreports/ScheduleListForGroupReport:printform",
    "t:formid": "printForm",
    "t:selectvalue": "974",
    "t:zoneid": "buttonZone"
});
