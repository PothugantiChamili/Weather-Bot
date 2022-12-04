const request = require('request');
const token = '5611906004:AAE6t6TNNBeSg22IdBzl6urC8syOrAWgo-4';
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});


bot.on('message', function(mg){
  request('http://api.weatherapi.com/v1/current.json?key=ec69799c1b854433b6d35627221711&q='+mg.text+'&aqi=no',function(error,response,body){
    
      if("error" in JSON.parse(body)){
        if((JSON.parse(body).error.code.toString()).length > 0){
            bot.sendMessage(mg.chat.id,"Send Valid Location: "+JSON.parse(body).error.message);
        }
      }
      else{
        let data = JSON.parse(body)
        bot.sendMessage(mg.chat.id,"Temperature: "+data.current.temp_f);
        bot.sendMessage(mg.chat.id,"Country Name: "+data.location.country);
        bot.sendMessage(mg.chat.id,"Location Name: "+data.location.name);
        
        
      }
    })
})
      

