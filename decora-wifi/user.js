const Account = require('./account');

function User(session, userId) {
    User.prototype.getResidentialPermissions = async function () {
        var data = await session.callApi('/Person/' + userId + '/residentialPermissions', null, 'GET');
        return new Account(session, data[0].residentialAccountId);
    }
}

module.exports = User;