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

// generic welcoming message
client.on('message', (channel, tags, message, self) => {
    // protect against loop on bot messages
    if (self) return;

    if (message.toLowerCase() === "!hello") {
        console.log(tags, self)
        client.say(channel, `@${tags.username}, Hi! berdroNCheers`);
    }

})