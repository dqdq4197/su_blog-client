import React,{useEffect} from 'react';
import storage from '../lib/storage';
import queryString from 'query-string';
import {useHistory} from 'react-router-dom';
import {authSocialLoginAPI} from '../lib/api/auth';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../actions/authentication';

const KakaoLogin = ({location}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const query = queryString.parse(location.search);
    useEffect(() => {
        authSocialLoginAPI.get({page:query.token})
        .then((res)=> {
            const info = res.data;
            dispatch(loginSuccess(info.id, info.email, info.nick, info.profile_img));
            storage.set('loginInfo',info);
        }).then(() => {
            history.push('/home');
        })
    },[])

    return (
        <>
        </>
    )
}

export default KakaoLogin;