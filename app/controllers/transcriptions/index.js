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
  var transcription;

  naid = 89242;
  objectid = 14863478;
  transcription =
    "00:00 CBS.CBSWWI.123\n\n" +

    "0:05 MALMO, SWEDEN\n" +
    "Three Kings of neutral nations meet in a historic conference to discuss the possibility of united action - the Kings of Sweden, Norway and Denmark. PATHE NEWS\n\n" +

    "00:49 JASSY, RUMANIA\n" +
    "First pictures of the visit of the U.S. Mission to the eastern front. King Ferdinand welcoming Major-General Scott. HEARST-PATHE NEWS\n\n" +

    "01:38 SALONICA, GREECE\n" +
    "The populace celebrates the union of Greece with the Allies, and the return of Ex-Premier Venizelos to power. HEARST-PATHE NEWS.\n\n" +

    "02:36 GENOA, ITALY\n" +
    "Handicapped in her fighting by the lack of supplies, Italy is doing her best to relieve the situation by building ships. HEARST-PATHE NEWS.\n\n" +

    "03:44 HEARST-PATHE NEWS\n" +
    "Speed is the essential feature of the new scouts, the latest one making 38 miles an hour.\n\n" +

    "04:12 ON THE WESTERN FRONT\n" +
    "Side by side with the Allies Poland’s patriotsare fighting to liberate Humanity.General Archinard visits their camp. HEARST-PATHE NEWS\n\n" +

    "04:43 Brave fighters, too; they know the sufferings under autocracy.";

  options = {};
  options.method = 'put';
  options.url = util.format( config.api.endpoints.transcriptions, naid, objectid );
  options.timeout = config.request.timeout;

  options.headers = {};
  options.headers[ 'user-agent' ] = config.request.agent;
  options.headers.authorization = authorization;

  options.form = {};
  options.form.text = transcription;

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