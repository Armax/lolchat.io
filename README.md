# lolchat.io
League Of Legends chat node.js module

## Usage
### Basics
First require the module in your code
```javascript
var Chat = require('./lolchat.io')
```
Then connect to the server
```javascript
Chat.connect('user', 'password', 'eu_west');
```
user and password are self-explanatory, the last argument must be a valid server string
* eu_west
* eu_ordic
* us
* pbe
* oceania
* brazil
* turkey
* russia
* latin_america_north
* latin_america_south

### Functions
most of them are self-explanatory
<br>
##### Get JID of a friend
```javascript
getFriendJid(friend)
```
friend: summoner name<br>
##### Send message
```javascript
sendMsg(to, msg)
```
to: must be a valid jid<br>
msg: message<br>
##### Edit online status
```javascript
editStatus(status)
```
status: must be a valid status<br>
<br>
Available Commands:
* ```<profileIcon>``` | Integer | Sets your summoner icon, LEGACY.
* ```<statusMsg>``` | String |Your normal status message, can be anything but has an ingame length limit
* ```<level>``` | Integer between -30 to 30 | Your level.
* ```<wins>``` | Positive Integer | Your amount of normal wins.
* ```<leaves>``` | Positive Integer |The amount of leaves will never show. LEGACY.
* ```<queueType>``` | RANKED_SOLO_5x5 | NORMAL | NIGHTMARE_BOT
* ```<gameQueueType>``` | RANKED_SOLO_5x5 | NORMAL | NIGHTMARE_BOT
* ```<rankedWins>``` | Positive Integer | Your amount of ranked wins,
* ```<rankedLosses>``` | Positive Integer | Your amount of ranked losses,
* ```<rankedRating>``` | Positive Integer | Ranked rating, LEGACY.
* ```<gameStatus>``` | Online | Chatty | Away | outOfGame | inGame |
* ```<rankedLeagueName>``` | Name of an EXISTING league |
* ```<rankedLeagueDivision>``` | String | Can be long but too long (300+ words) will disconnect you.
* ```<rankedLeagueTier>``` | CHALLENGER | DIAMOND | PLATINUM | GOLD | SILVER | BRONZE |
* ```<timeStamp>``` | Integer | The time the current game started.
* ```<skinname>``` | EXISTING Champion Name | The champion you are currently playing.<br>
Example Status:<br>
A common status that will set you up to be lv30, out of game and in the league Twitch's Commanders in Diamond DIvision Zero with 1337 ranked wins and the status message "XMPP Client".
```xml
<body>
  <profileIcon>1</profileIcon>
  <level>30</level>
  <statusMsg>XMPP Client</statusMsg>
  <rankedWins>1337</rankedWins>
  <gameStatus>outOfGame</gameStatus>
  <rankedLeagueName>Twitch&apos;s Commanders</rankedLeagueName>
  <rankedLeagueDivision>Zero</rankedLeagueDivision>
  <rankedLeagueTier>DIAMOND</rankedLeagueTier>
</body>
```
from: http://leagueoflegends.wikia.com/wiki/User:Sevenix/XMPP_Chat
<br>
##### Get current status
```javascript
getCurrentStatus(status)
```
status: must be a valid status<br>
##### Get full friends list
```javascript
getAllFriends()
```
##### Get online friends
```javascript
getOnlineFriends()
```

### Events
```javascript
// Connect event
Chat.events.on('connected', function(data) {
  console.log('[i] Connected!');
})

// Update friends
Chat.events.on('onlineUpdate', function(name) {
  console.log('[i] update: ' + name);
});
```

### Contact me
[@Arm4x](https://twitter.com/Arm4x)
Feel free to contact me for help or anything else
