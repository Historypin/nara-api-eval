'use strict';

/**
 * module variables
 */
var apiHandler;
var config;
var getLoginOptions;

/**
 * variable assignments
 */
apiHandler = require( '../../handlers/api/api-handler' );
config = require( '../../config' );
getLoginOptions = require( '../../helpers/get-login-options' );

/**
 * @param {express.IncomingMessage} req
 * @param {express.ServerResponse} res
 * @param {Function} next
 */
module.exports = function ( req, res, next ) {
  var MyPromise;

  MyPromise = apiHandler( getLoginOptions() );

  MyPromise
    .then( function ( result ) {
      if ( !result ) {
        result = '{}';
      }

      res.send( JSON.parse( result ) );
    } )
    .catch( function ( err ) {
      next( err );
    } );

  //{
  //  "opaResponse":{
  //    "header":{
  //      "@status":"200",
  //      "time":"2015-12-17T07:37:25.269Z",
  //      "request":{
  //        "@path":"\/api\/v1\/login",
  //        "action":"login",
  //        "userName":"username",
  //        "format":"json",
  //        "pretty":true
  //      }
  //    },
  //    "credentials":"credentials",
  //    "user":{
  //      "internalId":10348,
  //      "id":"username",
  //      "type":"standard",
  //      "rights":"regular",
  //      "fullName":"full_name",
  //      "email":"email_address",
  //      "displayFullName":false,
  //      "status":"active",
  //      "hasNote":false,
  //      "isNaraStaff":false,
  //      "accountCreatedTs":"2015-12-16T20:57:44.000Z",
  //      "timeout":1800,
  //      "searchMaxRecords":25000
  //    }
  //  }
  //}
};