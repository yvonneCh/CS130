'use strict';

/** Songkick adapter providing interface to interact with external songkick API
 * @module adapters/songkick
 * @requires request
 */

 /**
 * Songkick object
 * @type {object}
 * @const
 * @namespace SongkickAdapter
 */

 /**
 * request module
 * @const
 */
const request = require('request');
const config = require('../config');

/**
 * Get a list of events by Metro area
 * 
 * @name getAccessToken
 * @function
 * @memberof module:adapters/songkick~SongkickAdapter
 * @param {string} metro_area - metro area code
 * @returns {Promise} - A promise which resolves to a JSON object containing a list of events
 */
function getEventsByMetroArea(metro_area) {
    var apiUrl = config.songkick.url.base + config.songkick.key;
    var options = {
        url: apiUrl,
        json: true
    };

    // use the access token to access the Spotify Web API
    return new Promise(function(resolve, reject) {
        request.get(options, function(error, response, body) {
            resolve(body);
        });
    });
}

module.exports = {
    getEventsByMetroArea
};