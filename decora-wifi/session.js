const request = require('request-promise');
const User = require('./user');

const LEVITON_ROOT = 'https://my.leviton.com/api';

function Session() {
    this.user = null;
    this.authToken = null;

    Session.prototype.login = async function (email, password) {
        let payload = {
            email: email,
            password: password,
            clientId: 'levdb-echo-proto',
            registeredVia: 'myLeviton'
        };

        let userData = await this.callApi('/Person/Login', payload, 'POST');
        this.user = new User(this, userData.userId);
        this.authToken = userData.id;
        console.log(userData);
    }

    Session.prototype.callApi = async function (api, payload, method) {
        console.log('calling api', api, method);
        if (method === 'GET') {
            return await request({ url: LEVITON_ROOT + api, method: 'GET', json: true, headers: { authorization: this.authToken } });
        } else {
            return await request({ url: LEVITON_ROOT + api, method: method, body: payload, json: true, headers: { authorization: this.authToken } });
        }
    }
}
module.exports = Session;