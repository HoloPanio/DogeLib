# DogeLib

A client-side implementation of the DogeHouse API designed to be simple to use and incredibly powerful.

## Get Started

### Installation

Install with npm:

```shell
npm install dogelib
```

### Create an Api Key

[Guide to get api key](https://github.com/benawad/dogehouse/blob/c9d37f707b860ea4ca151b34d1c0e9c10949184d/CREATE_BOT_ACCOUNT.MD)

### Basic Usage

```javascript
// require it
const { Client } = require("dogelib");

// initialise the client
const bot = new Client();

// log your bot in
bot.login("YOUR API KEY GOES HERE").then(async () => {
  // get all public rooms sorted by the amount of listeners
  const topRooms = await bot.rooms.getTop();

  // create an array of the available Rooms
  const rooms = [];
  for (const [id, room] of topRooms.entries()) {
    rooms.push({
      roomId: id,
      roomName: room.name,
    });
  }

  // join the largest room
  bot.rooms.join(rooms[0].roomId);
});
```
