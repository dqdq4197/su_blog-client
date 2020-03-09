import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import storage from '../../lib/storage';
import ProfileFaker from './ProfileFaker';
import {device} from '../../lib/MediaStyled';
import {Icon} from 'semantic-ui-react';
import {useSelector} from 'react-redux';


const Header = () => {
        
    const [userinfo, setUserinfo] = useState('');
    const history = useHistory();
    const {status} = useSelector(state => state.authentication)


    const HeaderContainer = styled.div`
        transition:top .3s;
        z-index:100;
        position:fixed;
        top:0;
        display:flex;
        width:100%;
        height:60px;
        background-color:white;
        border-bottom:1px solid rgba(207, 201, 201,.5);
        box-shadow: 0px 12px 55px -7px rgba(0,0,0,0.12);
        
        .nav_util {
            width:1250px;
            margin:0 auto;
            padding-left:25px;
            padding-right:25px;
            display:flex;
            justify-content: space-between;
            @media ${device.laptopL} {
                width:1024px;
            }
        }
        .logo {
            display:flex;
            font-size:1.5rem;
            font-weight:500;
            @media ${device.laptop} {
                font-size:1.3rem;
            }
            cursor:pointer;
            a {
                display:flex;
                align-items:center;
                justify-content:center;
                color:black;
                text-decoration:none;
             }
        }
        .util {
            display:flex;
            justify-content:center;
            align-items:center;
            .loginBtn {
                a {
                    font-weight: 700;
                    color: rgba(0,0,0,.63);
                }
            }
            .search {
                display:none;
                font-size:1.5rem;
                color:rgba(0,0,0,.7);
                cursor:pointer;
                @media ${device.tablet} {
                    display:inline-block;
                }
            }
        }
    `
    useEffect (() => {
        setUserinfo(storage.get('loginInfo'));
        let prevScrollpos = window.pageYOffset;
        document.addEventListener('scroll',
            function() { 
                if(window.scrollY >120){
                    let currentScrollPos = window.pageYOffset;
                    if (prevScrollpos > currentScrollPos || window.scrollHeight === 0) {
                      document.getElementById("head").style.top = "0";
                    } else {
                      document.getElementById("head").style.top = "-60px";
                    }
                    prevScrollpos = currentScrollPos
                }
                if(window.scrollY === 0) {
                    document.getElementById("head").style.top = "0";
                }
            }
        );

        // return () => {document.removeEventListener('scroll', handleScroll)}
    },[status.currentUser.profile_img_path])
    const goSearch =() => {
        history.push('/search?key=');
    }
    return (
        <>
            <HeaderContainer id='head'>
                <div className="nav_util">
                    <div className="logo"><Link to='/home'>Su_blog</Link></div>
                    <div className="util">
                        <span className="search" onClick={goSearch}><Icon name="search" /></span>
                        {userinfo ? <ProfileFaker info={userinfo}/> : <span className="loginBtn"><Link to="/">로그인</Link></span>}
                    </div>
                </div>
            </HeaderContainer >
        </>
    )
}

export default Header;