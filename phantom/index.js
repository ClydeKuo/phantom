import $api from '../config.js'
import {exec} from 'child_process'
import path from 'path'
console.log(__dirname)
var count=0
let urlList=[
    "http://ptp.chinaexpats.cn/index.php?s=tuiguang&id=5d3Khdp/pNMKvg"
]

var timeOut = time => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time * 1000)
    })
}
var  getList=async ()=>{
    try{
       let list=await $api('select?name=free_ipproxy&order=save_time&sort=desc&count=1')
        return list
    }catch(e){}
}

var surfing=async ()=>{
    try{
        let list =await getList()
        for(let i=0,len=list.length;i<len;i++){
            // console.log(list[i])
            let protocol=list[i].https==='yes'?'https':'http'
            let proxy=`${protocol}://${list[i].ip}:${list[i].port}/`
            // console.log(proxy)
            for(let j=0,len2=urlList.length;j<len2;j++){
                console.log(count++)
                let tempUrl=encodeURIComponent(urlList[j])
                await execPhantom(proxy,tempUrl)
            }
        }
    }catch(e){}
    surfing()
}
var execPhantom=async (proxy,tempUrl)=>{
    return new Promise((resolve,reject)=>{
        let programPath=path.join(__dirname,'phantom','phantom.js')
        // console.log(programPath)
        exec('phantomjs '+programPath+" "+proxy+" "+tempUrl,function(error,stdout,stderr){
            console.log(stdout)
            resolve()
            if(error) {
                console.info('stderr : '+stderr);
            }
        });
    })
}
(async()=>{
    // await timeOut(30)
    console.log("start")
    surfing()
})()


