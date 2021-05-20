const { channel } = require('diagnostic_channel');
const tmi = require('tmi.js');
require('dotenv').config();


// create twitch bot
const client = new tmi.Client({
    connection:{
        secure: true,
        reconnect: true,
        timeout: 180000,
        reconnectInterval:1000
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


// EVENTS
// client connection attempt
client.on('connecting', (address, port) =>{ 
    onConnectingHandler(address, port);
});

// on connection to server
client.on('connected', (address, port) => {
    onConnectedHandler(address, port);
});

//disconnected from server
client.on('disconnected', (reason) => {
    onDisconnectHandler(reason);
});

// user joins the chat. Use this to catalog user data. 
client.on('join', (username) => {
    onJoinHandler(username);
});

//on host by another streamer
client.on('hosted', (username, viewers, autohost) => {
    onHostHandler(username, viewers, autohost);
});

// on subscription 
// username, method used to subscribe (primer, paid, gifted...), custom message
client.on('subscription', (username, method, message, userstate) => {
   onSubscriptionHandler(username, method, message, userstate); 
});



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
        if ((tags.mod || tags.username === 'berdron') && message.length > 5) {
            // parse the message, take of the command and save the rest
            var m = message.slice(5);
            // set the currentBrew to the new string
            currentBrew = m;
            console.log(`Setting currentBrew to: ${currentBrew}.`);
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


// EVENT HANDLERS

function currentBrewResponse(channel) {
    var mes = `Berdron is drinking ${currentBrew}. berdroNCheers berdroNCheers berdroNCheers`;
    client.say(channel, mes);
};


function onConnectingHandler(address, port) {
    console.log(`Connecting to ${address}:${port}...`)
};

function onConnectedHandler(address, port) {
    console.log('Connected to the chat successfully!')
}