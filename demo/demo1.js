var casper = require('casper').create();
casper.start('http://ptp.skillerzforum.com/promote.php?id=22979', function() {
  this.echo(this.getTitle());
});

casper.run();