import querystring from "querystring";
import config from "../config";

/**
 * @description Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
export function generateRandomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * @description Gets authentication url
 * @return {string} The authenticated url
 */
export function getAuthenticationURL() {
  var state = generateRandomString(16);
  var scope =
    "user-read-private user-read-email playlist-read-private user-read-recently-played user-top-read";

  return (
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: config.spotify.client_id,
      scope: scope,
      redirect_uri: config.spotify.redirect_uri,
      state: state
    })
  );
}

/**
 * @description Private method that gets paramter by input name
 * @param {string} name The name of the parameter
 * @return {string} The authenticated url
 */
function _getParameterByName(name) {
  var match = RegExp("[#&]" + name + "=([^&]*)").exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

/**
 * @description Gets access token
 * @return {string} The acess token
 */
export function getAccessToken() {
  return _getParameterByName("access_token");
}

/**
 * @description Gets id token
 * @return {string} The id token
 */
export function getIdToken() {
  return _getParameterByName("id_token");
}
