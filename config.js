


var $config={
    env:process.env.HOSTNAME,
    thread:Number(process.argv[2]||5),
    wait:Number(process.argv[3]||0)
}
module.exports=$config
