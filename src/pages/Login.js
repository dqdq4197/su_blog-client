import React, {useState} from 'react';
import '../components/loggin/Loggin.css';
import {Link, useHistory} from 'react-router-dom';
import HomeButton from '../components/loggin/HomeButton';
import {loginRequest, login_info_save} from '../actions/authentication';
import { useDispatch} from 'react-redux';
import LoginField from '../components/loggin/LoginField';
import SignupField from '../components/singup/SignupField';
import storage from '../lib/storage';
import styled,{keyframes} from 'styled-components';
import {Button} from '../lib/AuthInput'


const AuthContainer = styled.div`
  text-align:center;
  display:flex;
  height: 100vh;
  width:100%;
  overflow:hidden;
`
const SignInContainer = styled.div`
  opacity: ${props => (props.ani ==="signin" ? 1 : 0)}
  overflow:hidden;
  position:relative;
  top:50%;
  left: ${props => (props.ani ==="signin" ? 0 : "50%")}
  transform:translateY(-25%);
  flex : ${props => (props.ani ==="signin" ? 2 : 1)}
  width:100%;
  height:100vh;
  z-index:${props=> (props.ani ==="signin"? 100:0)};
  transition:all 1s, opacity .9s ease-in-out;
  `
const SignUpContainer = styled.div`
  
  opacity: ${props => (props.ani ==="signup" ? 1 : 0)}
  overflow:hidden;
  position:relative;
  top:50%;
  transform:translateY(-25%);
  right: ${props => (props.ani ==="signup" ? 0 : "50%")}
  flex:${props => (props.ani ==="signin" ? 1: 2)};
  width:100%;
  height:100vh;
  transition:all 1s, opacity .9s ease-in-out;
  ` 

const Loggin = () => {

  const [active, setActive] = useState(false);
  const [ani , setAni] = useState("signin");
  const [formSwitch, setFormSwitch] = useState(
    {
      left:"67%",
      active:"signin"
    }
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmitHandler = async(email,password) => {
    
    await dispatch(loginRequest(email,password,history));
    const loginInfo = storage.get('loginInfo');
    dispatch(login_info_save(loginInfo));
  }   
  const transClick = () => {
    formSwitch.active === "signin" ? setFormSwitch(state=> ({...state, left:0, active:"signup"})) : setFormSwitch(state=>({...state,left:"67%", active:"signin"}));
    setActive(true);
    ani === "signin" ? setAni("signup") : setAni("signin")
    
  }
  
  const toggleSwitch = keyframes`
    0% {left: ${ani ==="signin" ? 0 : "67%" }};
    40%{left: ${ani ==="signin" ? "20%" : "23%" }; width:65%};
    50% {width:65%};
    60%{left: ${ani ==="signin" ? "23%" : "20%" }; width:65%};
    100% {
      left: ${formSwitch.left}; 
      width:33%;
    };
  `
  const signinAniprev = keyframes`
    0%{right:0%};
    50%{right:-30%};
    100%{right:-30%};
  `
  const signinAninext = keyframes`
    0%{right:-30%};
    50%{right:-30%};
    100%{right:0%};
  `
  const signupAniprev = keyframes`
    0%{left:0%};
    50%{left:-30%};
    100%{left:-30%};
  `
  const signupAninext = keyframes`
    0%{left:-30%};
    50%{left:-30%};
    100%{left:0};
  `
  const Switch = styled.div`
    animation:${active ? toggleSwitch: ""} 1s linear;
    position:absolute;
    left: ${formSwitch.left};
    box-shadow: 0px 0px 44px 2px rgba(0,0,0,0.59);
    overflow:hidden;
    background-color:rgb(13, 72, 50);
    z-index:1000;
    height:100vh;
    width:33%;
    color: white;
    .signinWrapper {
      position:fixed;
      top:40%;
      right:${ani==="signin" ? 0 : "-30%"};
      z-index:100;
      width:33%;
      height:100vh;
      animation: ${active && ani==="signup" ? signinAniprev : (active && signinAninext)} 1s ease-in-out;
    }
    .signupWrapper {
      position:fixed;
      left:${ani==="signup" ? "0" : "-30%"};
      top:40%;
      z-index:100;
      width:33%;
      height:100vh;
      animation: ${active && ani==="signin" ? signupAniprev : (active && signupAninext)} 1s ease-in-out;
    }
  `  
  
 

  return (
    <AuthContainer>
      <Switch className="switch">
        <div className="signinWrapper">
          <h1>Welcome to my blog</h1>
          <p>로그인을 하면 더 많은 기능을 제공합니다</p>
          <Button size="1.3rem" hover="rgba(233,233,233)" bgcolor="white" color="rgba(13,72,50,.8)" width="30%" height= "40px" onClick={transClick}>회원가입</Button>
        </div>
        <div className="signupWrapper">
          <h1>회원가입</h1>
          <p>If you already have an account, just sign in. We've missed you!</p>
          <Button size="1.3rem" hover="rgba(233,233,233)" bgcolor="white" color="rgba(13,72,50,.8)" width="30%" height= "40px" onClick={transClick}>로그인</Button>
        </div>
      </Switch>
      <SignInContainer ani={ani}>
        <LoginField onSubmitHandler={onSubmitHandler} />
        <Link to='/Home'><HomeButton/></Link>
      </SignInContainer>
      <SignUpContainer ani={ani}>
        <SignupField />
      </SignUpContainer>
    </AuthContainer>
  );
};

export default Loggin;