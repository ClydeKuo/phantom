


var $config={
    env:process.env.HOSTNAME,
    thread:Number(process.argv[2]||5),
    order:process.argv[3]||"save_time",
    wait:Number(process.argv[4]||0)
}

module.exports=$config
