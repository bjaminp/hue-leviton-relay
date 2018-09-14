const Switch = require('./switch');

function Residence(session, residenceId) {
    Residence.prototype.getSwitches = async function () {
        let data = await session.callApi("/Residences/" + residenceId + "/iotSwitches", null, "GET");
        return data.map(d => new Switch(session, d));
    }
}

module.exports = Residence;