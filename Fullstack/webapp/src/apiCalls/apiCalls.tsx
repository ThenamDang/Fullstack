import axios from "axios";
import { trueCodeValidModal, trueInUseTag, updateMenuData } from '../store/apiDataSlice'
import store from '../store';
import { openVerification, closeSignUp, closeVerification, openAccount } from "../store/accountSlice";
import { trueloggedIN, updateUserName, updateUserPhoneNumber, falseLoginOpen, trueSnack, updateUserEmail } from "../store/loginSlice";

let BASE_URL = `${process.env.REACT_APP_BASE_URL}`
let USER = `${process.env.REACT_APP_USER}`
let PSWD = `${process.env.REACT_APP_PSWD}`

//Get all menu items
async function GetMenu() {
    axios({
        method: 'get',
        url: BASE_URL + '/menu',
        auth: {
            username: USER,
            password: PSWD
        },
    }).then(function (res) {
        store.dispatch(updateMenuData(res.data))
    });
}

//send verificaiton code
async function SendCode() {
    const phone = store.getState().apiData.signUpPhone
    axios({
        method: 'post',
        url: BASE_URL + '/twilio-sms/send-otp',
        auth: {
            username: USER,
            password: PSWD
        },
        data: {
            phoneNumber: phone
        }
    });
}

//get user by phone number
async function GetByPhoneLogin() {
    const phone = store.getState().login.userPhoneNumber

    axios({
        method: 'get',
        url: `${BASE_URL}/users/byPhone/${phone}`,
        auth: {
            username: USER,
            password: PSWD
        },
    }).then(function (res) {
        store.dispatch(updateUserName(res.data.name))
        store.dispatch(updateUserPhoneNumber(res.data.phoneNumber))
        store.dispatch(updateUserEmail(res.data.email))
        store.dispatch(trueloggedIN())
        store.dispatch(falseLoginOpen())
    }).catch(function (error) {
        if (error.response) {
            store.dispatch(trueSnack())
        }
    })
}

//check if phone number is used, embedded with sendCode api call
async function GetByPhoneSignUp() {
    const phone = store.getState().apiData.signUpPhone

    axios({
        method: 'get',
        url: `${BASE_URL}/users/byPhone/${phone}`,
        auth: {
            username: USER,
            password: PSWD
        },
    }).then(function (res) {
        store.dispatch(trueInUseTag())
    }).catch(function (error) {
        if (error.response) {
            store.dispatch(openVerification())

            // send verificaiton code
            SendCode()
        }
    });
}

//Create new user
async function CreateUser() {
    const phone = store.getState().apiData.signUpPhone
    const name = store.getState().apiData.signUpName
    const email = store.getState().apiData.signUpEmail

    axios({
        method: 'post',
        url: BASE_URL + '/users',
        auth: {
            username: USER,
            password: PSWD
        },
        data: {
            name: name,
            phoneNumber: phone,
            email: email,
        }
    });
}

//verify code, embeded with createUser call
async function VerifyCode() {
    const phone = store.getState().apiData.signUpPhone
    const code = store.getState().apiData.signUpCode

    axios({
        method: 'post',
        url: BASE_URL + '/twilio-sms/verify-otp',
        auth: {
            username: USER,
            password: PSWD
        },
        data: {
            phoneNumber: phone,
            code: code,
        }
    }).then(function (res) {
        if (res.data.valid) {
            //create user
            CreateUser();
            store.dispatch(closeVerification())
            store.dispatch(closeSignUp())
            store.dispatch(openAccount())
        }
    }).catch(function (error) {
        if (error.response) {
            store.dispatch(trueCodeValidModal())
        }
    });
}

export { GetMenu, SendCode, GetByPhoneSignUp, CreateUser, VerifyCode, GetByPhoneLogin }
