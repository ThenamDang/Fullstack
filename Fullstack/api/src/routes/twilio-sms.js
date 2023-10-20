const express = require('express');
require('dotenv').config();

//const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env;
const processes = require('../../processes.json')
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = processes.apps[0].env;

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
})

// Routing functions

// Requires phone number for verification
// Sends a 6-digit code to the given phone number
const sendOTP = async (req, res, next) => {
    const phoneNumber = req.body.phoneNumber;

    try {
        const otpResponse = await client.verify
            .services(TWILIO_SERVICE_SID)
            .verifications.create({
                to: JSON.stringify(phoneNumber),
                channel: 'sms',
            });

        delete otpResponse.sid;
        delete otpResponse.serviceSid;
        delete otpResponse.accountSid;

        res.status(200).json(otpResponse);
    } catch (err) {
        res.status(err?.status || 400).send(err?.message || 'Something went wrong');
    }
}

// Requires original phone number receiving code and the code
// Checs with twilio service if the code and phone number are correct
// returns a json with details
const verifyOTP = async (req, res, next) => {
    const { phoneNumber, code } = req.body;

    console.log("verifyOTP with " + phoneNumber + " of " + code);

    try {
        const verifiedResponse = await client.verify
            .services(TWILIO_SERVICE_SID)
            .verificationChecks.create({
                to: phoneNumber,
                code: code,
            });

        delete verifiedResponse.sid;
        delete verifiedResponse.serviceSid;
        delete verifiedResponse.accountSid;

        res.status(200).json(verifiedResponse);
    } catch (err) {
        res.status(err?.status || 400).send(err?.message || 'Something went wrong');
    }
}

// Routes

const router = express.Router();

router.route('/send-otp').post(sendOTP);
router.route('/verify-otp').post(verifyOTP);

module.exports = router;