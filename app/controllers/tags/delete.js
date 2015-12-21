'use strict';

/**
 * module variables
 */
var apiHandler;
var config;
var getLoginOptions;
var util;

/**
 * variable assignments
 */
apiHandler = require( '../../handlers/api/api-handler' );
config = require( '../../config' );
getLoginOptions = require( '../../helpers/get-login-options' );
util = require( 'util' );

function getOptions( authorization ) {
  var naid;
  var objectid;
  var options;
  var tag;

  naid = 89242;
  objectid = 14863478;
  tag = 'three kings';

  options = {};
  options.method = 'delete';
  options.url = util.format( config.api.endpoints.tags.object, naid, objectid );
  options.timeout = config.request.timeout;

  options.headers = {};
  options.headers[ 'user-agent' ] = config.request.agent;
  options.headers.authorization = authorization;

  options.form = {};
  options.form.text = tag;

  return options;
}

/**
 * @param {express.IncomingMessage} req
 * @param {express.ServerResponse} res
 * @param {Function} next
 */
module.exports = function ( req, res, next ) {
  apiHandler( getLoginOptions() )
    .then( function ( result ) {
      try {
        result = JSON.parse( result );
      } catch ( err ) {
        result = err;
      }

      if ( !result.opaResponse || !result.opaResponse.credentials ) {
        throw new Error( 'no opaResonse.credentials received' );
      }

      return apiHandler( getOptions( result.opaResponse.credentials ) );
    } )
    .then( function ( result ) {
      try {
        result = JSON.parse( result );
      } catch ( err ) {
        result = err;
      }

      res.send( result );
    } )
    .catch( function ( err ) {
      next( err );
    } );

  //{
  //  "opaResponse":{
  //    "header":{
  //      "@status":"200",
  //      "time":"2015-12-17T20:22:13.503Z",
  //      "request":{
  //        "@action":"save",
  //        "@path":"\/api\/v1\/id\/89242\/objects\/14863478\/tags",
  //        "format":"json",
  //        "pretty":true,
  //        "naId":"89242",
  //        "objectId":"14863478",
  //        "pageNum":1,
  //        "tagText":[
  //          "three kings"
  //        ]
  //      }
  //    },
  //    "tags":{
  //      "@total":"1",
  //      "tag":[
  //        {
  //          "@text":"three kings",
  //          "@pageNum":"1",
  //          "@user":"username",
  //          "@displayFullName":"false",
  //          "@isNaraStaff":"false",
  //          "@created":"2015-12-17T20:22:13.439Z"
  //        }
  //      ]
  //    }
  //  }
  //}
};