'use strict';

/**
 * module variables
 */
var config;

/**
 * module assignments
 */
config = require( '../config' );

module.exports = function () {
  var options;

  options = {};
  options.method = 'post';
  options.url = config.api.endpoints.login;
  options.timeout = config.request.timeout;

  options.headers = {};
  options.headers[ 'user-agent' ] = config.request.agent;

  options.form = {};
  options.form.user = config.api.username;
  options.form.password = config.api.password;

  return options;
};