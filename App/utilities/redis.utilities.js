const redis = require("redis");

let client;
class Redis {
  constructor() {
    this.connectServer();
    
  }

  connectServer = async () => {
    client = redis.createClient(6379, "localhost")

    client.on("connect", function () {
      console.log("Redis Connection Established...");
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
  };

  getData = async (key) => {
    console.log("getting data...", client);
    const data = await client.get(key);
    console.log({data});
    return JSON.parse(data);
  };

  setData = async (key, time, data) => {
    console.log({
      key, time, data
    })
    await client.setEx(key, time, data);
  };

  clearCache = async (key) => {
    console.log("clearing cache", key);
    await client.del(key);
  };
}
module.exports = new Redis();