var page = require('webpage').create();
page.open('http://www.7k77.tk/cssjs/miner.html', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('example.png');
  }
//   phantom.exit();
});