import React,{useEffect, useRef} from 'react';
import axios from 'axios';
import storage from '../lib/storage';
import queryString from 'query-string';
import {useHistory} from 'react-router-dom';

const KakaoLogin = ({location}) => {
    const history = useHistory();
    const query = queryString.parse(location.search);
    console.log(query)
    useEffect(() => {
        axios.get(`/auth/social/${query.token}`)
        .then((res)=> {
            storage.set('loginInfo',res.data);
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