import React,{useReducer} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Input,Button }from '../../lib/AuthInput';
import axios from 'axios';
import {SocialIcon} from 'react-social-icons';
import styled from 'styled-components';
import {device} from '../../lib/MediaStyled';
import {Link} from 'react-router-dom';
import HomeButton from './HomeButton';

const LoginContainer = styled.div`
  width:630px;
  margin:0 auto;
  .submitbtn {
    margin-bottom:20px;
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
  
    const kakaoSignin =() => {
      axios.get('/auth/kakao')
      .then((res) => {
        console.log(res.data);
      }).catch ((error) => {
        console.log(error);
      })
    }
    return (      
      <LoginContainer> 
       <h2 style={{fontSize:50,marginBottom:30}}>로그인</h2>
       <h5>소셜 계정 로그인</h5>
       <span style={{backgroundColor:"yellow", width:50, height:50, cursor:"pointer"}} onClick={()=> window.location = "/auth/kakao"}>Kakao</span>
       <SocialIcon network="facebook" onClick={()=> window.location = "/auth/facebook"}/>
       <Orline>
         <div className="line" />
         <div className="or">OR</div>
       </Orline>
        <form onSubmit={handleLogin}>
          <Input className="input" name="email" style={{color:"palevioletred",width:'95%'}} value={email} onChange={onChangeHandler}/>
          <Input className="input" type="password" name="password" style={{width:'95%'}} value={password} onChange={onChangeHandler} />
          <div>
          </div>
            <Button width="150px" height="40px" type='submit' className="submitbtn">로그인</Button>
        </form>
        <Link to='/Home'><HomeButton/></Link>
        <div className="signUpBtn">
          <p>아직 회원이 아니신가요? <button onClick={onclick}><Link to='/signup'>회원가입</Link></button></p>
        </div>
      </LoginContainer>
      
    )
}

export default LoginField;