'use strict';

/**
 * module variables
 */
var config;

/**
 * variable assignments
 */
config = {
  api: {
    endpoints: {
      login: 'https://catalog.archives.gov/api/v1/login',
      search: 'https://catalog.archives.gov/api/v1/',
      tags: {
        record: 'https://catalog.archives.gov/api/v1/id/%s/tags',
        object: 'https://catalog.archives.gov/api/v1/id/%s/objects/%s/tags'
      },
      transcriptions: 'https://catalog.archives.gov/api/v1/id/%s/objects/%s/transcriptions'
    },
    password: 'password',
    username: 'username'
  },
  ip_address: process.env.NODE_IP_ADDRESS,
  port: 3000,
  request_timeout: ( 1000 * 15 ),
  ssl: {
    key: process.env.SSL_KEY.toString(),
    crt: process.env.SSL_CRT.toString()
  }
};

module.exports = config;