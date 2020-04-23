import React,{useReducer} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Input,Button }from '../../lib/AuthInput';
import {SocialIcon} from 'react-social-icons';
import styled from 'styled-components';
import {device} from '../../lib/MediaStyled';
import {Link} from 'react-router-dom';
import HomeButton from './HomeButton';
import kakao from '../../lib/basicTumnail/kakao.png';

const LoginContainer = styled.div`
  width:630px;
  margin:0 auto;
  .submitbtn {
    margin-bottom:20px;
  }
  .kakaoicon {
    cursor:pointer
    margin-right:15px;
    width:50px;
    height:50px;
    img {
      width:30px;
      height:30px;

    }
    &:before {
      content:'';
      width:50px;
      height:50px;
      position:absolute;
      background:#fee800;
      border-radius:50%;
      z-index:-1;
      transform:translateX(-10px);
    }
  }
  .signUpBtn {
    display:none;
    text-align:right;
    margin-top:10px;
    font-size:16px;
    button {
      border:none;
      color:rgb(13,72,50);
      background-color:transparent;
      font-weight:bold;
      margin-right:16px;
      &:hover {
        text-decoration:underline;
        
      }
      a {
        color:rgb(13,72,50);
      }
    }
    @media ${device.tablet} {
      display:block;
    }
  }
  @media ${device.laptop} {
    width:100%;
  }
  @media ${device.mobileXL} {
    .input {
      margin:0.3em;
    }
    .submitbtn {
      margin-bottom:5px;
    }

  }
`
const Orline = styled.div`
  width:95%;
  height:20px;
  margin:0 auto;
  .line {
    position:relative;
    height:1px;
    background-color:#d6d6d6;
    top:55%;
  }
  .or {
    position:absolute;
    display:inline;
    background-color:#fafbfc;
    color:black;
    width:30px;
    transform:translateX(-15px)
  }
  
`




function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

const LoginField = ({onSubmitHandler,onclick}) => {

    const [state, dispatch] = useReducer(reducer, {
      email: '',
      password: '',
    });
    const {email, password} = state;
    const onChangeHandler = (e) => {
      dispatch(e.target);
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        await onSubmitHandler(email,password);
    }
  
    return (      
      <LoginContainer> 
       <h2 style={{fontSize:50,marginBottom:30}}>로그인</h2>
       <h5>소셜 계정 로그인</h5>
       <span className="kakaoicon" onClick={()=> window.location='https://api.sublog.co/auth/kakao'}><img src={kakao} /></span>
       <SocialIcon style={{cursor:"pointer", marginLeft:5}}  network="facebook" onClick={()=> window.location = "https://api.sublog.co/auth/facebook"}/>
       <Orline>
         <div className="line" />
         <div className="or">OR</div>
       </Orline>
        <form onSubmit={handleLogin}>
          <Input className="input" name="email" style={{color:"palevioletred",width:'95%',borderRedius:0}} value={email} onChange={onChangeHandler}/>
          <Input className="input" type="password" name="password" style={{width:'95%',borderRedius:0}} value={password} onChange={onChangeHandler} />
          <div>
          </div>
            <Button width="150px" height="40px" type='submit' className="submitbtn">Login</Button>
        </form>
        <Link to='/Home'><HomeButton/></Link>
        <div className="signUpBtn">
          <p>아직 회원이 아니신가요? <button onClick={onclick}><Link to='/signup'>회원가입</Link></button></p>
        </div>
      </LoginContainer>
      
    )
}

export default LoginField;