import { get, post } from './utils/httpHelper';

const config = require('./config');
const serverBaseURL = `http://${config.server.host}:${config.server.port}`;

/** API
 * @module api
 * @description Client side handler for API requests
 */


export function getUsername() {
    return get(`${serverBaseURL}/user/name`).then(res => res);
}

/**
 * Authorize user
 * @name authorize
 * @function
 * @memberof module:api
 */
export function authorize(code) {
    return post(`${serverBaseURL}/user/create`, {code: code}).then(res => res);
}