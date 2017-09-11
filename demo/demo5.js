var casper = require('casper').create({
    pageSettings:{
        loadImages:  true,       
        loadPlugins: true,
        userAgent:"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        logLevel: "debug"   
    },
    verbose:true
});

/* Casper.prototype.setProxy = function setProxy(proxy) {
    "use strict";
    this.checkStarted();
    this.page.settings.proxy = proxy;

    this.emit('http.proxy', this.page.settings.proxy);
    this.log("Setting HTTP proxy " + this.page.settings.proxy, "info");
    return this;
};
casper.setProxy("socks://127.0.0.1:1080/") */
phantom.setProxy("http://127.0.0.1:9999/")
casper.start('https://www.baidu.com/', function() {
    this.echo("title: "+this.getTitle());
    this.capture('chinaexpats.png')
    // this.clear();
    // this.clearCache();
});

// casper.thenOpen('http://phantomjs.org/', function() {
//     this.echo(this.getTitle());
// });

casper.run();