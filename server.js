const express = require('express');
const request = require('request');
const config = require('./config');
const DecoraSession = require('./decora-wifi/session');
const app = express();
const port = 8091;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.listen(port, () => {
    console.log('we are live on port ', port);
});

app.get('/', (req, res) => {
    res.send('hello world');
});

let selectedSwitch;

let session = new DecoraSession();
session.login(config.levitonEmail, config.levitonPassword).then(() => {
    session.user.getResidentialPermissions().then(account => {
        account.getResidences().then(residenice => {
            residenice.getSwitches().then(switches => {
                selectedSwitch = switches.find(s => s.data.name = config.switchName);
                console.log(selectedSwitch);
            });
        });
    });
});


app.get('/set', (req, res) => {
    console.log(req.query);
    let light = req.query.light;
    let brightness = req.query.bri;
    let on = req.query.on;

    if (brightness) {
        selectedSwitch.updateBrightness(Math.round(brightness / 255 * 100));
    }

    if (on) {
        selectedSwitch.updatePower(on === 'True' ? "ON" : "OFF");
    }

    res.send();
});