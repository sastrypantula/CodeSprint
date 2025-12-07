const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
     socket: {
        host: 'redis-18011.c281.us-east-1-2.ec2.cloud.redislabs.com',
        port: 18011
    }
});

module.exports = redisClient;