// Code by @Arm4x

var Chat = require('./lolchat.io')

// Connection
Chat.connect('user', 'password', 'eu_west');

// Connect event
Chat.events.on('connected', function(data) {
  console.log('[i] Connected!');
})

// Update friends
Chat.events.on('onlineUpdate', function(name) {
  console.log('[i] update: ' + name);
});

// Send a message to ImNotBadJustABit every 5 seconds
// Function isn't case sensitive
setInterval(function() {
  // jid is used for xmpp communication
  x=Chat.getFriendJid('Imnotbadjustabit');
  console.log(x);
  Chat.sendMsg(x,'Hi I am a node.js bot')
}, 5000);
