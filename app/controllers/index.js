'use strict';

/**
 * module variables
 */
var config;
var apiHandler;

/**
 * variable assignments
 */
config = require( '../config' );
apiHandler = require( '../handlers/api/api-handler' );

/**
 * @returns {{}|*}
 */
function getOptions() {
  var options;

  options = {};

  options.method = 'get';
  //{
  //  url: options.url,
  //    headers: options.headers,
  //  qs: options.qs,
  //  timeout: options.timeout
  //}

  options.url = config.api.endpoints.search;
  options.timeout = config.request.timeout;

  options.headers = {};
  options.headers[ 'user-agent' ] = config.request.agent;

  options.qs = {};
  options.qs.pretty = false;

  // 89242; // individual object - https://catalog.archives.gov/id/89242
  //    //naIds: 89117, // its parentSeries naId
  //      // had an itemAvCount of 703
  //    //naIds: 809, // its parentCollection naId
  //      // had no itemAvCount
  //  // naIds: 533461 // American Unofficial Collection of World War I Photographs, 1917 - 1918
  //  //naIds: 24608, // Historical Films, ca. 1914 - ca. 1936
  //    //naIds: 24609 // item in the collection - From Forest to France
  //    //naIds: 440 // parentRecordGroup - Records of the Office of the Chief Signal Officer
  //  //naIds: 198606
  //  // naIds: 6789282 harry s truman wwi
  //  // naIds: 533104 // British Photographs of World War I, 1914 - 1918
  //  // naIds: 533181 // German Military Activities and Personnel, 1917 - 1918
  options.qs.naIds = 89242;

  // q: 'wwi trenches',
  // q: 'world war i films',
  // q: '*:*',
  // q: 'wwi',
  //options.qs.q = 'wwi';

  //'description.series.itemAvCount': 'range(1,30)',
  //'description.itemAv.parentSeries.naId': 24608,
  //'description.itemAv.parentSeries.naId': 89117,
  //options.qs[ 'description.itemAv.parentSeries.naId' ] = 89117;

  options.qs.rows = 10;

  return options;
}

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
module.exports = function ( req, res, next ) {
  apiHandler( getOptions() )
    .then( function ( result ) {
      if ( !result ) {
        result = '{}';
      }

      res.send( JSON.parse( result ) );
    } )
    .catch( function ( err ) {
      next( err );
    } );
};