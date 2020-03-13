import storage from '../lib/storage';
import dotenv from 'dotenv';
import {authLogOutAPI} from '../lib/api/auth';
import {authLoginAPI, setProfileAPI, removeProfileAPI} from '../lib/api/CommonAPI/auth';


import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    AUTH_PROFILE_IMG_CHANGE_SUCCESS,
    AUTH_LOGIN_INFO_SAVE,
} from './ActionTypes';

//  LOGIN
export function loginRequest(email,password,history) {

    return async(dispatch) => {
        dispatch(login());
        return await authLoginAPI({email,password})
        .then((response) => {
            const id = response.data.id;
            const nick = response.data.nick;
            const profile_img_path = response.data.profile_img;
            dispatch(loginSuccess(id,email,nick,profile_img_path));
            storage.set('loginInfo',response.data);
            history.push('/home');
        }).catch((error) => {
            dispatch(loginFailure());
            alert(error.response.data.message);
            
        });
    };
}   
export function logoutRequest() {
    return (dispatch) => {
        return authLogOutAPI.get()
        .then((response) => {
            dispatch(logout())
        }).catch((error) => {
            console.log(error.response);
        })
    }
}

export function profile_img_change(formdata,nick) {
    return (dispatch) => {
        if(formdata=== 'basic.gif') {
            return removeProfileAPI({page:nick,formdata})
            .then((res) => {
                dispatch(profile_img_change_success(res.data.path))
                let info = storage.get('loginInfo');
                info.profile_img=res.data.path;
                storage.set('loginInfo',info);
                return res.data.path
            }).catch((error) => {
                console.log("action profile_img_change_error")
            })
        }else {
            return setProfileAPI({page:nick,formdata})
            .then((res) => {
                dispatch(profile_img_change_success(res.data.path))
                let info = storage.get('loginInfo');
                info.profile_img=res.data.path;
                storage.set('loginInfo',info);
                return res.data.path
            }).catch((error) => {
                console.log("action profile_img_change_error")
            })
        }
    }
}
export function login() {
    return {
        type: AUTH_LOGIN_REQUEST
    };
}

export function loginSuccess(id,email,nick,path) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        id,
        email,
        nick,
        path
    };
}

export function loginFailure() { 
    return{
        type: AUTH_LOGIN_FAILURE
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}
export function profile_img_change_success(path) {
    return {
        type: AUTH_PROFILE_IMG_CHANGE_SUCCESS,
        path
    }
}
export function login_info_save(userinfo) {
    return {
        type: AUTH_LOGIN_INFO_SAVE,
        userinfo
    }
}