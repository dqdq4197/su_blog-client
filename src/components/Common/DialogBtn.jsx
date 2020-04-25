import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import Dialog from '../Common/Dialog';

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
    const session = sessionStorage.getItem("aboutModal");
    const [visible, setVisible] = useState(session? false : true);
    
    useEffect(() => {
        if(visible){
            document.getElementById('head').style.zIndex=0;
        } else {
            document.getElementById('head').style.zIndex=111;
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
            <Dialog onConfirm={onConfirm} confirmtext={'확인'} visible={visible} />
        </>

    )
}

export default SignInBtn;