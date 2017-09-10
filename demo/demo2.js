var casper = require('casper').create();
casper.start('http://www.baidu.com/', function() {
  this.echo(this.getTitle());
});

casper.then(function() {
  this.capture('baidu-homepage.png'); //  生成一个png图片
});

casper.run();