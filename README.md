# DogeLib

A client-side implementation of the DogeHouse API designed to be simple to use and incredibly powerful.

## Get Started

### Installation

Install with npm:

```shell
npm install dogelib
```

### Basic Usage

```javascript
// require it
const DogeLib = require("dogelib");

// initialise the client
const bot = new DogeLib.Client();

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

  console.log(rooms);
});
```
