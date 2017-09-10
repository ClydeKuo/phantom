var casper = require('casper').create();
casper.start('http://www.baidu.com/', function() {
  this.echo(this.getTitle());
});

casper.run();