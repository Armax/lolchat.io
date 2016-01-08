// Code by @Arm4x

var Client = require('node-xmpp-client')
var EventEmitter = require('events').EventEmitter

// Basic infoz
var p_prefix = "AIR_";
var xiff = 'xiff';
var domain = 'pvp.net'
var port = 5223
var allFriends = {}; // JID
var onlineFriends = {}; // SummonerName

// Servers
var SERVERS = {
  eu_west: 'chat.euw1.lol.riotgames.com',
  eu_ordic: 'chat.eun1.riotgames.com',
  us: 'chat.na1.lol.riotgames.com',
  pbe: 'chat.pbe1.lol.riotgames.com',
  oceania: 'chat.oc1.lol.riotgames.com',
  brazil: 'chat.br.lol.riotgames.com',
  turkey: 'chat.tr.lol.riotgames.com',
  russia: 'chat.ru.lol.riotgames.com',
  latin_america_north: 'chat.la1.lol.riotgames.com',
  latin_america_south: 'chat.la2.lol.riotgames.com'
}

var status = "<body>\
              <profileIcon>973</profileIcon>\
              <level>30</level>\
              <statusMsg>node.js chat lib</statusMsg>\
              <rankedWins>1337</rankedWins>\
              <gameStatus>outOfGame</gameStatus>\
              <rankedLeagueName>Twitch&apos;s Commanders</rankedLeagueName>\
              <rankedLeagueDivision>Zero</rankedLeagueDivision>\
              <rankedLeagueTier>DIAMOND</rankedLeagueTier>\
              </body>\
            ";

// Functionz
function getRoster(connection_object) {
  var roster = new Client.Element('iq', { id: 'roster_0', type: 'get' });
  roster.c('query', { xmlns: 'jabber:iq:roster' });
  connection_object.send(roster);
}

function Chat() {
  // Setup
  var self = this
  var client;
  var events;
  self.events = new EventEmitter();

  // Core function
  self.connect = function(username,password,server) {

    // Creating client
    var client = new Client({
      jid: username+'@'+domain+'/'+xiff,
      password: p_prefix + password,
      host: SERVERS[server],
      port: port,
      legacySSL: true,
      status: status
    });

    self.client = client;

    // Online
    client.on('online', function(data) {
      client.send(new Client.Element('presence', { })
        .c('status').t(status)
      )
      self.events.emit('connected')
      if(client.connection.socket) {
        client.connection.socket.setTimeout(0);
        client.connection.socket.setKeepAlive(true, 10000);
      }

      getRoster(client);
    });

    // Handling  room
    client.on('stanza', function(stanza) {
      // Getting all friends
      if(stanza.is('iq')) {
        for (var f in stanza.children[0].children) {
          allFriends[stanza.children[0].children[f].attrs.jid] = stanza.children[0].children[f].attrs.name;
        }
      }

      // Online friends
      if (stanza.is('presence')) {
        try {
          var friendname = allFriends[stanza.attrs.from.split('/')[0]];
          var toSplit = stanza.attrs.from.split('/');
          var friend = toSplit[0];
          if (stanza.attrs.type && stanza.attrs.type === 'unavailable') {
            delete onlineFriends[friendname];
          }
          else if (stanza.children.length > 0) {
            var friendstuff = {
              status: stanza.children[0].children[0],
              body: stanza.children[1].children[0]
            };
            var name = allFriends[friend];
            var body = friendstuff.body;
            var info;
            addInfo = {
              status: friendstuff.status,
              body: friendstuff.body,
              jid: friend
            }
            if (name) {
                self.events.emit('onlineUpdate', name);
            }
          }
        }
        catch(ex) {
          //todo
        }
      }

      // Getting message
      if(stanza.is('message')) {
        if(stanza.attrs.type == 'chat') {
          var body = stanza.getChild('body');
          if(body) {
            var msg = body.getText();
            var author = stanza.attrs.from;
            var id = author.split('/')[0];
            var friendName = allFriends[id];
            console.log('['+friendName+'] ' + msg);
          }
        }
      }

    });

    // Handling messages
    client.on('receiveMessage', function(from, msg) {
      console.log('['+author+'] ' + msg);
    });

    // Error & Disconnected handlers
    client.on('error', function(err) {
      console.log('[!] ' + err);
    });

    client.on('close', function() {
      console.log('[!] Disconnected');
    });

  }

  self.sendMsg = function(to, msg) {
    to += '/xiff';
    var stanza = new Client.Element('message', { to: to, type: 'chat' });
    stanza.c('body').t(msg);
    self.client.send(stanza);
  }

  self.getFriendJid = function(friend) {
    for(var x in allFriends) {
      if(allFriends[x].toLowerCase()==friend.toLowerCase()) {
          return(x);
      }
    }
  }

  self.editStatus = function(status) {
    status = status;
    self.client.send(new Client.Element('presence', { })
      .c('status').t(status)
    )
  }

  self.getAllFriends = function() {
    return allFriends;
  }

  self.getOnlineFriends = function() {
    return onlineFriends;
  }

  self.getCurrentStatus = function() {
    return status;
  }
}


module.exports = new Chat();
module.exports.Chat = Chat;
