const phantom = require('phantom');
(async function() {
   const instance = await phantom.create();
   const page = await instance.createPage();
   page.setProxy("socks://127.0.0.1:1080/")
   await page.on("onResourceRequested", function(requestData) {
       console.info('Requesting', requestData.url)
   });

   const status = await page.open('https://hidemy.name/en/proxy-list/?start=1');
   console.log(status);

   const content = await page.property('content');
   console.log(content);

//    await instance.exit();
}());