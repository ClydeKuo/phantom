import $api from '../api.js'
import $config from '../config.js'
import {exec} from 'child_process'
import path from 'path'
var count = 0
var successTime=0
var sqlTimes=-1
var sqlCondition={
    order:"save_time",
    sort:"desc"
}
var target="http://www.simplyptp.com/30240"

var changeSql=()=>{
    console.log("-------------------")
    let odd=sqlTimes%2
    let orderTime=odd?((sqlTimes-1)/2)%9:(sqlTimes/2)%9
    console.log("orderTime:"+orderTime)
    sqlCondition.order=['save_time','ip','port','country','anonymity','https','speed','source','vali_count'][orderTime]
    sqlCondition.sort=['desc','asc'][odd]
}

var timeOut = time => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time * 1000)
    })
}
var getList = async() => {
    try {
        let number ={"mysql":1000,"centos6":1000} [$config.env]||20
        console.log("sql times:"+ ++sqlTimes)
        changeSql()
        console.log("mysql number:"+number)
        console.log("order:"+sqlCondition.order)
        console.log("sort:"+sqlCondition.sort)
        let sql=`select?name=free_ipproxy&order=${sqlCondition.order}&sort=${sqlCondition.sort}&count=${number}`
        console.log(sql)
        let list = await $api(sql)
        return list
    } catch (e) {}
}

var surfing = async() => {
    try {
        let list = await getList()
        console.log("thread:"+$config.thread)
        for (var i = 0, len = list.length; i < len; i+=$config.thread) {
            let proxyArr=[]
            for(let k=i ;k<$config.thread+i;k++){
                console.log("times:"+ ++count)
                proxyArr.push(formatUrl(list[k]))
            }
            let tempUrl = encodeURIComponent(target)
            let targetArr=proxyArr.map((item)=>execPhantom(item, tempUrl))
            // console.log(targetArr)
            await Promise.all(targetArr)
        }
    } catch (e) {
        console.log(e)
    }
    surfing()
}
var formatUrl=data=>{
    try{
        let protocol = data.https === 'yes' ? 'https' : 'http'
        let proxy = `${protocol}://${data.ip}:${data.port}/`
        console.log('proxy：'+proxy)
        return proxy
    }catch(e){
        console.log(e)
    }
    
}
var execPhantom = async(proxy, tempUrl) => {
    return new Promise((resolve, reject) => {
        let programPath = path.join(PATH, '../phantom', 'phantom.js')
        // console.log(programPath)
        exec('phantomjs ' + programPath + " " + proxy + " " + tempUrl, function (error, stdout, stderr) {
            console.log(stdout)
            if(stdout.match(/Status: success/)){
                console.log("success times:"+ ++successTime)
            }
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