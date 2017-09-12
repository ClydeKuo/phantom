import $api from '../config.js'
import {exec} from 'child_process'

var timeOut = time => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time * 1000)
    })
}
var  getList=async ()=>{
    try{
       let list=await $api('select?name=free_ipproxy&order=save_time&sort=desc&count=100')
        return list
    }catch(e){}
}

var surfing=async ()=>{
    let list =await getList()
    for(let i=0,len=list.length;i<len;i++){
        // console.log(list[i])
        let protocol=list[i].https==='yes'?'https':'http'
        let proxy=`${protocol}://${list[i].ip}:${list[i].port}/`
        console.log(proxy)
        await timeOut(5)
        exec('phantomjs ../phantom/phantom.js '+proxy,function(error,stdout,stderr){
            console.log(stdout)
            if(error) {
                console.info('stderr : '+stderr);
            }
        });
    }
    surfing()
}
(async()=>{
    await timeOut(30)
    console.log("start")
    surfing()
})()



