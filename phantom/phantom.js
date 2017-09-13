var page = require('webpage').create()
var system = require('system')
if (system.args.length === 1) {
    console.log('Usage: phantoms.js <some URL>');
    // phantom.exit();
}
var proxy = system.args[1]
var url=decodeURIComponent(system.args[2])
// console.log("proxy:"+proxy)
page.setProxy(proxy)
page.cookiesEnabled =true
page.settings.userAgent="Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
page.settings.resourceTimeout=20000
page.onResourceTimeout = function(request) {
    console.log('Response (#' + request.id + ')');
};
page.open(url, function(status) {
    if(status === "success") {
        // page.render('example.png');
      }
  console.log(url.slice(-10)+" Status: " + status);
  phantom.exit();
});