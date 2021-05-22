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
var streamSettings = {
    newUserGreet: false,

}

// EVENTS
// client connection attempt
client.on('connecting', (channel, address, port) =>{ 
    onConnectingHandler(channel, address, port);
});

// on connection to server
client.on('connected', (channel, address, port) => {
    onConnectedHandler(channel, address, port);
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
client.on('join', (channel, username) => {
    onJoinHandler(channel, username);
});

//on host by another streamer
client.on('hosted', (channel, username, viewers, autohost) => {
    onHostHandler(channel, username, viewers, autohost);
});

// on subscription 
// username, method used to subscribe (primer, paid, gifted...), custom message
client.on('subscription', (channel, username, method, message, userstate) => {
   onSubscriptionHandler(channel, username, method, message, userstate); 
});

//on raid from another streamer
client.on('raided', (channel, username, viewers) => {
    onRaidHandler(channel, username, viewers);
});

//cheering by viewer
client.on('cheer', (channel, userstate, message) => {
    onCheerHandler(channel, userstate, message);
});

//upgrading gifted sub to selfpaid sub
client.on('giftpaidupgrade', (channel, username, sender, userstate) => {
    onGiftUpgradeHandler(channel, username, sender, userstate);
});

//on Berdron hosting another channel
client.on('hosting', (channel, target, viewers) => {
    onHostingHandler(channel, target, viewers);
});

//resub event
//username of resub, months as sub, sub message, userstate, method of subscription 
client.on('resub', (channel, username, months, message, userstate, methods) => {
    onResubhandler(channel, username, months, message, userstate, methods);
});

//subgift event
//username of gift sender, number of months for recipient, username of recipient, method of sub
// userstate:
//  userstate["msg-param-recipient-display-name"]: String - The display name of the recipient
//  userstate["msg-param-recipient-id"]: String - The ID of the recipient
//  userstate["msg-param-recipient-user-name"]: String - The login of the recipient
//  userstate["msg-param-sender-count"] : Boolean or String - The count of giftsubs the sender has sent
client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
    onSubGiftHandler(channel, username, streakMonths, recipient, methods, userstate);
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
        client.say(channel, "Beep boop, I am a bot made by berdron.");
    }

    if (message.toLowerCase().startsWith('!setgreetingstate')) {
        var m = message.slice(17);
        setNewUserGreetingState(m);
    }


});


// EVENT HANDLERS

function currentBrewResponse(channel) {
    var mes = `Berdron is drinking ${currentBrew}. berdroNCheers berdroNCheers berdroNCheers`;
    client.say(channel, mes);
};


function onConnectingHandler(channel, address, port) {
    console.log(`Connecting to ${address}:${port}...`)
};

function onConnectedHandler(channel, address, port) {
    console.log('Connected to the chat successfully!')
};


function onDisconnectHandler(reason) {
    console.log(`Disconnected from chat, ${reason}`);
};

function onReconnectHandler() {
    console.log('Reconnected to chat successfully!')
};

function onJoinHandler(channel, username) {
    username = username.toLowerCase();
    // edge cases for broadcaster and bots
    if (username === "berdron_bot" || username === "berdron" || username === "moobot" || username === "streamlabs") return;

    if (streamSettings.newUserGreet) {
        sendSimlpeMessage('berdron', `Hi ${username}, welcome to the stream!`)
    }
    createUserValue(username);

};

// create a welcoming message when getting a host from another channel
function onHostHandler(channel, username, viewers, autohost) {
    if (autohost){
        var m = `Welcome back ${username} and your ${viewers} viewers!`;
    }
    else{
        var m = `Woah, thanks ${username} for the raid! Welcome to you and your ${viewers} viewers!`;
    }

    client.say(channel, m);
};

// create a custom message for the new sub
function onSubscriptionHandler(channel, username, method, message, userstate) {
    console.log(userstate);
};

function onRaidHandler(channel, username, viewers) {

};

function onCheerHandler(channel, userstate, message) {

};

function onGiftUpgradeHandler(channel, username, sender, userstate) {

};

function onHostingHandler(channel, target, viewers) {

};

function onResubhandler(channel, username, months, message, userstate, methods) {

};

function onSubGiftHandler(channel, username, streakMonths, recipient, methods, userstate) {

};

function sendSimlpeMessage(channel, message) {
    client.say(channel, message);
};

// if the user is new to the channel, create an entry for them in the database.
// should only be called after checking if user exists in db or not
function createUserValue(username) {
    console.log(`This will create db stuff if the user is new ${username}`);
};

function getUserColor(username) {
    console.log('This will query db for user color');
};

// check to see if the user is already in the database
function checkUserDatabaseOnJoin(username) {
    console.log(`This will check for user info in db on join: ${username}`);
};

function setNewUserGreetingState(command) {
    console.log(`Changing the greeting message state to: ${command}`);
    streamSettings.newUserGreet = command;
};