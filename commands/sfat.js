const request = require('request');

exports.run = (message, bot, send) => {
    let cn = request("http://api.adviceslip.com/advice", function(err, res, body) {
        try {
            let cnj = JSON.parse(body)
            message.channel.send(cnj.slip.advice)
        } catch (e) {
            return message.channel.send("**Masinaria de sfaturi s-a stricat! :sad:**")
        }
    });
}
exports.help = {
  name: "sfat"
}
