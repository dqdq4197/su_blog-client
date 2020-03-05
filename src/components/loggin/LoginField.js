import React,{useReducer} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {  Checkbox } from 'semantic-ui-react'
import {Input,Button }from '../../lib/AuthInput';
import axios from 'axios';
import {SocialIcon} from 'react-social-icons';





function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

const LoginField = ({onSubmitHandler}) => {

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
      <> 
       <h2 style={{fontSize:50,marginBottom:30}}>Sing in to Su_blog</h2>
       <h5>Login using social networks</h5>
       <span style={{backgroundColor:"yellow", width:50, height:50, cursor:"pointer"}} onClick={()=> window.location = "/auth/kakao"}>Kakao</span>
       <SocialIcon network="facebook" onClick={()=> window.location = "/auth/facebook"}/>
        <form onSubmit={handleLogin}>
          <Input name="email" style={{color:"palevioletred"}} value={email} onChange={onChangeHandler}/>
          <Input type="password" name="password"  value={password} onChange={onChangeHandler} />
          <div>
            <Checkbox label='I agree to the Terms and Conditions' />
          </div>
            <Button width="15%" height="40px" type='submit' className="submitbtn">SingIn</Button>
        </form>
      </>
      
    )
}

export default LoginField;