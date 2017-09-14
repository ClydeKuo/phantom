import $api from '../api.js'
import $config from '../config.js'
import {exec} from 'child_process'
import path from 'path'
var count = 0
let urlList = [
    "http://ptp.chinaexpats.cn/index.php?s=tuiguang&id=5d3Khdp/pNMKvg"
]
var target="http://ptp.chinaexpats.cn/index.php?s=tuiguang&id=5d3Khdp/pNMKvg"

var timeOut = time => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time * 1000)
    })
}
var getList = async() => {
    try {
        let number ={"mysql":1000,"centos6":1000} [$config.env]||5
        console.log("mysql number:"+number)
        console.log("order:"+$config.order)
        let list = await $api('select?name=free_ipproxy&order=save_time&sort=desc&'+$config.order+'='+ number)
        return list
    } catch (e) {}
}

var surfing = async() => {
    try {
        let list = await getList()
        console.log("thread:"+$config.thread)
        for (var i = 0, len = list.length; i < len; i+=$config.thread) {
            /* for (let j = 0, len2 = urlList.length; j < len2; j++) {
                console.log(count++)
                
                let tempUrl = encodeURIComponent(urlList[j])
                await execPhantom(proxy, tempUrl)
            } */
            
            let proxyArr=[]
            for(let k=i ;k<$config.thread+i;k++){
                console.log("times:"+ ++count)
                proxyArr.push(formatUrl(list[k]))
            }
            let tempUrl = encodeURIComponent(target)
            let targetArr=proxyArr.map((item)=>execPhantom(item, tempUrl))
            console.log(targetArr)
            await Promise.all(targetArr)
        }
    } catch (e) {
        console.log(e)
    }
    // surfing()
}
var formatUrl=data=>{
    let protocol = data.https === 'yes' ? 'https' : 'http'
    let proxy = `${protocol}://${data.ip}:${data.port}/`
    console.log('proxy：'+proxy)
    return proxy
}
var execPhantom = async(proxy, tempUrl) => {
    return new Promise((resolve, reject) => {
        let programPath = path.join(PATH, '../phantom', 'phantom.js')
        // console.log(programPath)
        exec('phantomjs ' + programPath + " " + proxy + " " + tempUrl, function (error, stdout, stderr) {
            console.log(stdout)
            resolve(111)
            if (error) {
                console.info('stderr : ' + stderr);
            }
        });
    })
}
(async() => {
    console.log("wait:"+$config.wait+"s")
    await timeOut($config.wait)
    surfing()
})()