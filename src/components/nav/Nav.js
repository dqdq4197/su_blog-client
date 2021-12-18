import React  from 'react'
import { Menu } from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { logoutRequest } from '../../actions/authentication';
import styled from 'styled-components';
import storage from '../../lib/storage';




 const Nav = () =>  {
  const dispatch = useDispatch();
  const history = useHistory();
  const onclicklogout = async(e) => {
    e.preventDefault();
    dispatch(logoutRequest()).then(
      () => {
        storage.remove('loginInfo');
        history.push('/');
      } 
    )
  }
    
  const container = {
    height:'100vh',
    position:'fixed'
  };  
  const item = {
      marginTop:'60px'
  } 
  const loginButton = (
    <Link to="/">
      <Menu.Item
        name='LogIn'
        onClick={onclicklogout}
      />
    </Link>
  )
  const logoutButton = (
    <>
      <Menu.Item
          name='Logout'
          onClick={onclicklogout}
      />
      <Link to="/about">
      <Menu.Item
          name='About'
      />
      </Link>
    </>
  );

    return (
      <>
      
      <NaviContainer>
      <ul>
        <li />
        <li />
        <li />
      </ul>
        <div className="wrapper">
          <div className="logo">
            Su_blog
          </div>
          <div className="about">
            about
          </div> 
          <div className="stack">
            stack
          </div>
          <div className="tip">
            devTip
          </div>
          <Link to="/posting">
            <div className="write">
              Write
            </div>
          </Link>
          <div onClick={onclicklogout}> 
            log out
          </div>
        </div>
      </NaviContainer>
      </>
    )
}

export default Nav;

const NaviContainer = styled.div`
  position:fixed;
  text-align:center;
  width: 270px;
  left:-270px;
  height: 100vh;
  color:white;
  ul{
    z-index:1000;
    position:absolute;
    display:inline;
    margin-left:30px;
    cursor:pointer;
    list-style: none;
    top:0%;
    width:50px;
    height:28px;
    padding:0;
    transform:translateY(-50%);
    li:nth-child(1) {
        margin-top:0;
    }
    li{
        background-color:rgba(0,0,0,.7);
        border-radius:10px;
        width:50px;
        height:6px;
        margin:5px 0;
    }
  }
  a { 
    color: black;
  }
  background-color:rgb(13, 72, 50);
  .wrapper {
    position:relative;
    width:100%;
    height:100vh;
    .logo {
      font-size: 1.5rem;
      margin-top: 70px;
    }
    .about {margin-top:30px;}
    div {
      width:100%;
      height:40px;
    }
  }
`