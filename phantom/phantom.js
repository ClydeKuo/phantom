var page = require('webpage').create()
var system = require('system')
if (system.args.length === 1) {
    console.log('Usage: phantoms.js <some URL>');
    // phantom.exit();
}
var proxy = system.args[1]
console.log("proxy:"+proxy)
page.setProxy(proxy)
page.cookiesEnabled =true
page.settings.userAgent="Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
page.open('http://ptp.chinaexpats.cn/index.php?s=tuiguang&id=5d3Khdp/pNMKvg', function(status) {
    if(status === "success") {
        // page.render('example.png');
      }
  console.log("Status: " + status);
  phantom.exit();
});