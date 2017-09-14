


var $config={
    env:process.env.HOSTNAME,
    thread:Number(process.argv[2]||5),
    sort:process.argv[3]||"desc",
    order:process.argv[4]||"save_time",
    wait:Number(process.argv[5]||0)
}
module.exports=$config
