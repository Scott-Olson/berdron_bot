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

// reconnecting to server
client.on('reconnect', () => {
    onReconnectHandler();
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

//on raid from another streamer
client.on('raided', (username, viewers) => {
    onRaidHandler(username, viewers);
});

//cheering by viewer
client.on('cheer', (userstate, message) => {
    onCheerHandler(userstate, message);
});

//upgrading gifted sub to selfpaid sub
client.on('giftpaidupgrade', (username, sender, userstate) => {
    onGiftUpgradeHandler(username, sender, userstate);
});

//on Berdron hosting another channel
client.on('hosting', (target, viewers) => {
    onHostingHandler(target, viewers);
});

//resub event
//username of resub, months as sub, sub message, userstate, method of subscription 
client.on('resub', (username, months, message, userstate, methods) => {
    onResubhandler(username, months, message, userstate, methods);
});

//subgift event
//username of gift sender, number of months for recipient, username of recipient, method of sub
// userstate:
//  userstate["msg-param-recipient-display-name"]: String - The display name of the recipient
//  userstate["msg-param-recipient-id"]: String - The ID of the recipient
//  userstate["msg-param-recipient-user-name"]: String - The login of the recipient
//  userstate["msg-param-sender-count"] : Boolean or String - The count of giftsubs the sender has sent
client.on('subgift', (username, streakMonths, recipient, methods, userstate) => {
    onSubgiftHandler(username, streakMonths, recipient, methods, userstate);
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
};


function onDisconnectHandler() {

};
function onReconnectHandler() {
 
};
function onJoinHandler() {

};
function onHostHandler() {

};
function onSubscriptionHandler() {

};
function onRaidHandler() {

};
function onCheerHandler() {

};
function onGiftUpgradeHandler() {

};
function onHostingHandler() {

};
function onResubhandler() {

};
function onSubgiftHandler() {

};