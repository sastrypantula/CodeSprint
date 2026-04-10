const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
     socket: {
       host: 'redis-19327.c8.us-east-1-4.ec2.cloud.redislabs.com',
        port: 19327
    }
});

module.exports = redisClient;