'use strict';

var http;

http = require('http');

/**
 * @param {Error} err
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function errorLogger( err, req, res ) {
  var msg = { error: {} };

  if ( !( err instanceof Error ) ) {
    console.error( 'errorLogger(): err not provided as an Error' );
    return;
  }

  if ( !( req instanceof http.IncomingMessage ) ) {
    console.error( 'errorLogger(): req not provided as an http.IncomingMessage' );
    return;
  }

  if ( !( res instanceof http.ServerResponse ) ) {
    console.error( 'errorLogger(): res not provided as an http.ServerResponse' );
    return;
  }

  msg.error.method = req.method || null;
  msg.error.originalUrl = req.originalUrl || null;
  msg.error.status = err.status || 500;
  msg.error.date = new Date();
  msg.error.remoteAddress = req.connection.remoteAddress || null;
  msg.error.headers = req.headers || null;
  msg.error.session = req.session || null;
  msg.error.body = req.body || null;
  msg.error.err = err || null;

  console.error( msg );
}

module.exports = errorLogger;