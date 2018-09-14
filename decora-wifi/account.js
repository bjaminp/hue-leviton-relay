const Residence = require('./residence');

function Account(session, accountId) {
    Account.prototype.getResidences = async function () {
        let data = await session.callApi('/ResidentialAccounts/' + accountId + '/residences', null, "GET");
        return new Residence(session, data[0].id);
    }
}

module.exports = Account;