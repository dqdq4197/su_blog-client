import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import Dialog from '../Common/Dialog';
import {useSelector} from 'react-redux'

const Button = styled.button`
    width:auto;
    height:30px;
    background:rgb(13,72,50);
    border:none;
    border-radius:5px;
    margin-right:10px;
    color:white;
    cursor:pointer;
    font-weight:bold;
    margin-bottom:10px;
`


const SignInBtn = () => {
    const home = useSelector(state => state.home);
    const session = sessionStorage.getItem("aboutModal");
    const [visible, setVisible] = useState(session? false : true);
    
    useEffect(() => {
        if(visible){
            document.getElementById('head').style.zIndex=0;
        } else {
            document.getElementById('head').style.zIndex=111;
        }
        let x = window.matchMedia("(max-width: 1024px)")
        if(x.matches) {
            console.log('a');
            document.getElementById('head').style.zIndex=111;
        } 
        if(!x.matches && visible) {
            console.log('b');
            document.getElementById('head').style.zIndex=0;
        } 
    },[visible])
    
    const onConfirm = () => {
        setVisible(false);
        sessionStorage.setItem('aboutModal', 'c610125be34842189b3ef9ba523f6599');
    }
    const onClickButton = () => {
        return setVisible(true);
    }
    return( 
        <>
            <Button onClick={onClickButton}>페이지 소개</Button>
            {home.isLoading ==='SUCCESS' && <Dialog onConfirm={onConfirm} confirmtext={'확인'} visible={visible} />}
        </>

    )
}

export default SignInBtn;