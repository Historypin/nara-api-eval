'use strict';

/**
 * module variables
 */
var express;
var path;
var router;

/**
 * variable assignments
 */
express = require('express');
path = require( 'path' );
router = express.Router();

router.get(  '/', require( '../controllers' ) );
router.get(  '/login', require( '../controllers/login' ) );
router.get(  '/tags/create', require( '../controllers/tags/create' ) );
router.get(  '/tags/delete', require( '../controllers/tags/delete' ) );
router.get(  '/transcriptions', require( '../controllers/transcriptions' ) );

function routes( app ) {
  app.use( express.static( path.join( __dirname, '../../', 'public' ) ) );
  app.use( router );
}

module.exports = routes;