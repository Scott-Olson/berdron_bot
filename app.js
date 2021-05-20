const tmi = require('tmi.js');
require('dotenv').config();


// create twitch bot
const client = new tmi.Client({
    connection:{
        secure: true,
        reconnect: true
    },
    identity: {
        username: 'berdron_bot',
        password: process.env.TOKEN
    },
    channels: ['berdron']
});

// instantiate the client connection
client.connect();

// currentBrew holds the current brew for the command !brew
var currentBrew = 'Tremor California Lager';

// monitor messages
client.on('message', (channel, tags, message, self) => {
    // protect against loop on bot messages
    if (self) return;

    // hello world 
    if (message.toLowerCase() === "!hello") {
        console.log(tags, self)
        client.say(channel, `@${tags.username}, Hi! berdroNCheers`);
    }

    // !brew returns the currently assigned brew 
    // sets the currentBrew if mod adds too message
    if (message.toLowerCase().startsWith('!brew')){
        if (tags.mod && message.length > 5) {
            // parse the message, take of the command and save the rest
            var m = message.slice(5);
            currentBrew = m;
            currentBrewResponse(channel);
        }
        else{
            currentBrewResponse(channel);
        };
    };

    if (message.toLowerCase() === '!bot') {
        client.say(channel, "Beep boop, I am a bot.");
    }

});


function currentBrewResponse(channel) {
    var mes = `Berdron is drinking ${currentBrew}. berdroNCheers berdroNCheers berdroNCheers`;
    client.say(channel, mes);
};