import request from 'request'
var url="http://45.78.43.138:8000/"
console.log('This platform is linux:' + (process.platform == 'linux'));
if (ENV() == 'pd') {
    url = "http://127.0.0.1:8000/"
}
let $api=(path)=>{
    try{
        return new Promise((resolve,reject)=>{
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