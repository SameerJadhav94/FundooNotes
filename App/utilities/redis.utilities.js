/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
const redis = require('redis');

let client;
class Redis {
  constructor() {
    this.connectServer();
  }

  connectServer = async () => {
    client = redis.createClient(6379, 'localhost');

    client.on('connect', () => {
      console.log('Redis Connection Established...');
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
  };

  getData = async (key) => {
    const data = await client.get(key);
    return JSON.parse(data);
  };

  setData = async (key, time, data) => {
    await client.setEx(key, time, data);
  };

  clearCache = async (key) => {
    await client.del(key);
  };
}
module.exports = new Redis();
