import request from 'request'
import $config from './config'
var $api=(path)=>{
    try{
        return new Promise((resolve,reject)=>{
            let url=$config.env==="mysql"?"http://127.0.0.1:8000/":"http://45.78.43.138:8000/";
            request(url+path, function (error, response, body) {
                if(error){
                    console.log('error:', error)
                    reject(error)
                }
                resolve(JSON.parse(body))
              });
        })
    }catch(e){reject(e)}
}
module.exports=$api