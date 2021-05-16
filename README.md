# DogeLib
A client-side implementation of the DogeHouse API designed to be simple to use and incredibly powerful.

### Written by HoloPanio

## How to setup Dogelib : 
1. Run : 

```bash
$npm i dogelib
```

2. Make an index.js file : 

```js
const { Client } = require("dogelib");
const app = new Client();

const apiKey = "YOUR BOT API KEY";

app.login(apiKey).then(async () => {
  console.log("Bot connected.");
  app.rooms.join("THE ROOM ID");
});
```

3. Edit the index.js file and fill in your BOT API KEY and your room ID [

 If you do not know how to get a bot account, see this page : https://github.com/benawad/dogehouse/blob/c9d37f707b860ea4ca151b34d1c0e9c10949184d/CREATE_BOT_ACCOUNT.MD ]
 
4. Run : 

```bash
@node index.js
```
