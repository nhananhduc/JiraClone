import { USER_SIGNIN_API, USER_SIGNUP_API } from "../constants/CyberBugs/CyberBugs";

export const signinCyberBugsAction = (email, password) => ({
    type: USER_SIGNIN_API,
    userLogin: {
        email: email,
        password: password
       
    }
})

export const userSignUpAction = (email, password, name, phoneNumber) => ({
    type: USER_SIGNUP_API,
    userSignup: {
        email,
        password,
        name,
        phoneNumber
    }
})