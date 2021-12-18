import React,{useReducer,useState} from 'react';
import {Input ,Button} from '../../lib/AuthInput';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';
import {signupAPI} from '../../lib/api/CommonAPI/auth';
import {device} from '../../lib/MediaStyled';
import {Link} from 'react-router-dom';

function reducer(state, action) { 
  return {
    ...state,
    [action.name]: action.value
  };
}

const SignupField = ({onclick}) => {
  const {email,password,Nickname} = state;
  const [verify, setVerify] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    email:'',
    password: '',
    Nickname: '',
  });

  const onChangeHandler = (e) => {
    dispatch(e.target);
  }

  const mailTest = async(e) => {
    e.preventDefault();
    let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if(exptext.test(email)===false){
      alert("이메일형식이 올바르지 않습니다.");
      return false;
    }
    await signupAPI({email,password,Nickname})
    .then((res) => {
      if(res.data === 'sent') {
        setVerify(true);
      } else if(res.data.massage) {
        alert(res.data.massage);
      } else if(res.data === 'error') {
        alert('이메일을 다시한번 확인해주세요!');
      }
    }).catch((error) => {
      console.log(error.response);
    })
  }

  return ( 
    <SignUpContainer>
      <h2 style={{fontSize:50,marginBottom:30}}>회원가입</h2>
        { verify 
          ? <Verifybox >
              <Icon name="envelope open outline" />
              입력하신 메일주소로 인증메일을 요청했습니다.<br/> 해당 메일에서 인증을 완료해주세요!
            </Verifybox>
          : <form onSubmit={mailTest}>
              <Input className="input" width={'95%'} type="email" name="email" value={email} onChange={onChangeHandler}/>
              <Input className="input" width={'95%'} type="password" name="password" value={password} onChange={onChangeHandler}/>
              <Input className="input" width={'95%'} name="Nickname" value={Nickname} onChange={onChangeHandler}/>
              <Button onClick={mailTest} width="150px" height="40px">가입하기</Button>
            </form>
        }
      <div className="signInBtn">
        <p>이미 회원이신가요? 
          <button onClick={onclick}>
            <Link to="/">
              로그인
            </Link>
          </button>
        </p>
      </div>
    </SignUpContainer>
  ) 
}

export default SignupField;

const SignUpContainer = styled.div`
  .signInBtn {
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
`
const Verifybox = styled.div`
  position: relative;
  left:50%;
  padding:30px;
  transform: translateX(-50%);
  max-height:200px;
  background-color:rgba(13,72,50,.08);
  color:rgb(13,72,50);
  border-radius:5px;
  font-size:1.5em;
`