import request from 'request'
var url="http://45.78.43.138:8000/"
if (ENV == 'pd') {
    console.log('This platform is linux:' + (process.platform == 'linux'));
    url = "http://127.0.0.1:8000/"
}

let $api=(path)=>{
    return new Promise((resolve,reject)=>{
        request(url+path, function (error, response, body) {
            if(error){
                console.log('error:', error)
                reject(error)
            }
            resolve(JSON.parse(body))
          });
    })
}

module.exports=$api