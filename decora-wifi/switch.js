function Switch(session, data) {
    this.data = data;
    Switch.prototype.updateBrightness = async function (value) {
        this.data = await session.callApi("/IotSwitches/" + this.data.id, { brightness: value }, 'PUT');
    }

    Switch.prototype.refresh = async function () {
        this.data = await session.callApi("/IotSwitches/" + this.data.id, null, 'GET');
    }

    Switch.prototype.updatePower = async function (value) {
        this.data = await session.callApi("/IotSwitches/" + this.data.id, { power: value }, 'PUT')
    }
}

module.exports = Switch;