const phantom = require('phantom');
(async function () {
    const instance = await phantom.create();
    const page = await instance.createPage();
    page.property("cookiesEnabled", true)
    page.setting("userAgent","Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36")
    // page.property("setProxy","http://127.0.0.1:9999/")
    page.setProxy("sockssd://127.0.0.1:9999/")
    await page.on("onResourceRequested", function (requestData) {
        /* if (requestData.url.match(/start=/)) {
            console.info(JSON.stringify(requestData, undefined, 4))
        } */
        /* page.property("cookies").then((data)=>{
                let temp=''
                for(let i=0,len=data.length;i<len;i++){
                    temp+=JSON.stringify(data[i], undefined, 4)
                }
                console.log("cookies:"+ temp)
        }) */
        
        console.info(JSON.stringify(requestData, undefined, 4))
    });
    /* await page.on("onResourceReceived", function (response) {
        if (response.url.match(/start=/)) {
            console.log(JSON.stringify(response, undefined, 4))
        }
    }); */

    const status = await page.open('http://www.dygang.net/');
    console.log(status);
    // await timeOut(5)
    // await page.open('https://hidemy.name/en/proxy-list/?start=2');
    const content = await page.property('content');
    // console.log(content);
    //    console.log(111)

    //    await instance.exit();
}());

var timeOut = time => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(22222)
            resolve()
        }, time * 1000)
    })
}