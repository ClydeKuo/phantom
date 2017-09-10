var page = require('webpage').create();
var Promise = require("bluebird");
page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
/* page.onResourceRequested = function (request) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
}; */

page.setProxy("socks://127.0.0.1:1080/")
// page.open('http://ptp.chinaexpats.cn/index.php?s=tuiguang&id=5d3Khdp/pNMKvg', function(status) {
//     console.log("Status: " + status);
//   });
var urlList = [
    "https://www.npmjs.com/",
    "https://www.baidu.com/",
    // "http://ptp.chinaexpats.cn/index.php?s=tuiguang&id=5d3Khdp/pNMKvg",
]
/* start()
async function start() {
    for (var i = 0, len = urlList.length; i < len; i++) {
        await surfing(urlList[i],i)
    }
} */

for(var i=0,len=urlList.length;i<len;i++){
    surfing(urlList[i],i)
}
function surfing(url,i) {
    // return new Promise(function (resolve, reject) {
        page.open(url, function (status) {
            console.log("Status: " + status);
            if (status === "success") {
                page.render(i + '.png');
            }
            /* console.log("Status: " + status);
            if (status === "success") {
                resolve()
            } else {
                page.render(i + '.png');
                reject()
            } */
        });
    // });
}