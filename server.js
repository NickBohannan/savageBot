require('dotenv').config()
const Discord = require('discord.io');
const logger = require('winston');
const fetch = require('node-fetch');

const quotes = require('./quotes.js')
const pics = require('./pics.js')
const bio = require('./bio.js')

function fahrenheit(kelvin) {
    return Math.floor((kelvin - 273) * (9/5) + 32)
}

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
let bot = new Discord.Client({
   token: process.env.TOKEN,
   autorun: true
});

let quotesLength = quotes.length
let picsLength = pics.length

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {

    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ');
        let cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'savagequote':
                let quote = quotes[Math.floor(Math.random() * quotesLength)]
                bot.sendMessage({
                    to: channelID,
                    message: quote
                });
                break;
            case 'savagepic':
                let pic = pics[Math.floor(Math.random() * picsLength)]
                bot.sendMessage({
                    to: channelID,
                    message: "OOOOOH YEAH! SOMEONE WANTS A PIC OF THE GREATEST FORCE IN SPORTS ENTERTAINMENT!"
                });
                bot.sendMessage({
                    to: channelID,
                    message: pic
                });
                break;
            case 'savagebio':
                bot.sendMessage({
                    to: channelID,
                    message: bio
                });
                break;
            case 'savagedickpic':
                bot.sendMessage({
                    to: channelID,
                    message: "http://3.bp.blogspot.com/-oqwTL8ny-yo/Tfj67Ipc8xI/AAAAAAAAAoo/CZXBUBQoWd8/s1600/SavageBlog.jpg"
                });
                break;
            case 'savageweather':
                    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${args[0]},us&appid=${process.env.APIKEY}`)
                    .then(w => w.json())
                    .then(weatherJSON => {
                        console.log(weatherJSON)
                        
                        let wString = `OOOOOOH YEAH! You want the weather, PUMPKIN?! WELL HERE YOU GO. It's ${fahrenheit(weatherJSON.main.temp)} °F right now in ${weatherJSON.name} and the cream RIIIIISES to the TOP of ${fahrenheit(weatherJSON.main.temp_max)} °F and lets check the sky... ${weatherJSON.weather[0].main}!`
                        
                        bot.sendMessage({
                            to: channelID,
                            message: wString
                        }) 
                    })
            default:
                break;
         }
     }
});