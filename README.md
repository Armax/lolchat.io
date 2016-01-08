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
```javascript
getFriendJid(friend)
```
friend: summoner name<br><br>
```javascript
sendMsg(to, msg)
```
to: must be a valid jid<br>
msg: message<br><br>
```javascript
editStatus(status)
```
status: must be a valid status<br>
<br>
Available Commands:
* ```xml<profileIcon>``` | Integer | Sets your summoner icon, LEGACY.
* ```xml<statusMsg>``` | String |Your normal status message, can be anything but has an ingame length limit
* ```xml<level>``` | Integer between -30 to 30 | Your level.
* ```xml<wins>``` | Positive Integer | Your amount of normal wins.
* ```xml<leaves>``` | Positive Integer |The amount of leaves will never show. LEGACY.
* ```xml<queueType>``` | RANKED_SOLO_5x5 | NORMAL | NIGHTMARE_BOT
* ```xml<gameQueueType>``` | RANKED_SOLO_5x5 | NORMAL | NIGHTMARE_BOT
* ```xml<rankedWins>``` | Positive Integer | Your amount of ranked wins,
* ```xml<rankedLosses>``` | Positive Integer | Your amount of ranked losses,
* ```xml<rankedRating>``` | Positive Integer | Ranked rating, LEGACY.
* ```xml<gameStatus>``` | Online | Chatty | Away | outOfGame | inGame |
* ```xml<rankedLeagueName>``` | Name of an EXISTING league |
* ```xml<rankedLeagueDivision>``` | String | Can be long but too long (300+ words) will disconnect you.
* ```xml<rankedLeagueTier>``` | CHALLENGER | DIAMOND | PLATINUM | GOLD | SILVER | BRONZE |
* ```xml<timeStamp>``` | Integer | The time the current game started.
* ```xml<skinname>``` | EXISTING Champion Name | The champion you are currently playing.
Example Status
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

```javascript
getCurrentStatus(status)
```
status: must be a valid status<br><br>
```javascript
getAllFriends()
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
