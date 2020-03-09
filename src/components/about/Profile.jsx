import React,{useEffect, useState} from 'react';
import ProfilePoster from './ProfilePoster';
import styled from 'styled-components';
import {Button} from '../../lib/AuthInput';
import {Icon} from 'semantic-ui-react';
import {Link , useLocation, Switch, Route} from 'react-router-dom';
import SecretPost from './SecretPost';
import {device} from '../../lib/MediaStyled';
import ProfileInfo from './ProfileInfo';
import storage from '../../lib/storage';
import {getDataAPI} from '../../lib/api/about';


const ProfileContainer = styled.div`
    width:1300px;
    background-color:#f9f9f9;
    margin:0 auto;
    @media ${device.laptopL} {
        width:100%;
    }
    padding-top:60px;
    .profile_box {
        display:flex;
        @media ${device.laptop} {
            display:block;
        }
        @media ${device.mobileXL} {
            margin-top:10px;
        }
        height:100%;
        margin-top:30px;
        padding:0 10px;
        .profile_card {
            position:relative;
            width:330px;
            @media ${device.laptop} {
                width:100%;
            }
            .profile {
                @media ${device.laptop} {
                    width:100%;
                }
                width:330px;
                display:block;
                text-align:center;
                .leftTop {
                    .detailInfo{
                        @media ${device.laptop} {
                            display:none;
                        }
                        .myIntro {
                            h4 {

                                font-weight:600;
                            }
                        }
                    }
                    .profile_info {
                        p {
                            @media ${device.mobileXL}{
                                margin:10px 0;
                            }
                        }
                    }
                    background-color:white;
                    padding: 25px 30px 16px;
                    box-shadow: 0 0 3px rgba(0,0,0,.2);
                    border-radius:5px;
                    @media ${device.laptop} {
                        padding:0;
                        background-color:transparent;
                        box-shadow:none;
                    }
                    .profile_pic {
                        @media ${device.mobileXL} {
                            width:100px;
                            height:100px;
                        }
                        width:110px;
                        height:110px;
                        border-radius:110px;
                        margin:0 auto;
                        background:url(${props => props.img});
                        background-size:cover;
                        background-position:center center;
                    }
                    p {
                        text-align:center;
                        color:black;
                        margin-top:20px;
                        font-weight:400;
                        b {
                            font-size:1.5rem;
                        }
                    }
                    p.skillTitle {
                        font-size:1.5rem;
                        font-weight:600;
                    }
                    ul {
                        margin:0;
                        padding:0;
                    }
                    ul li {
                        display:inline-block;
                        width: auto;
                        background-color: transparent;
                        list-style:none;
                        border: 1px solid #E1E7EB;
                        border-radius: 5px;
                        margin: 0 0 3px 5px;
                        padding: 3px 8px;
                        color:#90A4AE;
                    }
                    .socialUtil {
                        font-size:1.8rem;
                        font-weight:600;
                    }
            }
        }
    }
    .FeedBox {
        hr {
            margin-top:5px;
        }
        .util {
            a {
                color:black;
                text-decoration:none;
                margin-right:10px;
            }
            @media ${device.laptop} {
                text-align:center
                border-radius:5px;
                -webkit-box-shadow: 0px -15px 23px -7px rgba(232,232,232,1);
                -moz-box-shadow: 0px -15px 23px -7px rgba(232,232,232,1);
                box-shadow: 0px -15px 23px -7px rgba(232,232,232,1);
                padding:10px;
            }
            font-size: 1.1rem;
            font-weight: 700;
        
        }
        margin-left:30px;
        @media ${device.laptop} {
            margin:0;
            margin-top:20px;
        }
        background-color:transparent;
        border-radius:5px;
        height:auto;
        .info {
            display: none;
            @media ${device.laptop} {
                display:inline;
            }
        }
        .basic {
            color:${props => props.pathCase ? 'black' : null}
        }
        .time {
            color:${props => props.pathCase ? null : 'black'}
        }
    }

`
const Profile = ({profile,nick}) => {
    const userInfo = storage.get('loginInfo');
    const [info, setInfo] = useState(null);
    const [activeTap, setActiveTap] = useState(true);
    const location = useLocation();
    useEffect(() => {
        getData();
        if(location.pathname.indexOf('/timeline') > -1) {
            setActiveTap(false);
        }
    },[])
    const getData = () => {
        getDataAPI.get({page:nick}).then((res) => {
            setInfo(res.data);
        })
    }
    return (
        <>
            {info ? <>
            <ProfileContainer img={'img/'+info.profile_img} pathCase={activeTap}>
                <div className="profile_box">
                    <div className="profile_card">
                        <div className="profile">
                            <div className="leftTop">
                                <div className="profile_info">
                                    <div className="profile_pic"/>
                                    <p>
                                        <b>{nick.substr(1,nick.length+1)}</b><br/>
                                        {info.email}<br/>
                                    </p>
                                    <Button><a style={{color:'white', textDecoration:'none'}} href={`mailto:${info.email}`}>메일보내기</a></Button>
                                </div>
                                <div className="detailInfo">
                                    <hr/>
                                    <p className="skillTitle">기술 스택</p>
                                    <ul>{info.skills ? info.skills.split(',').map((key,i) => <li key={i}>{key}</li>): '등록 된 기술이 없습니다.'}</ul>
                                    <hr/>
                                    <div className="socialUtil">
                                        <p className="skillTitle">소셜 정보</p>
                                        <Icon name="facebook"></Icon>
                                        <Icon name="github"></Icon>
                                        <Icon name="instagram"></Icon>
                                        <Icon name="blogger"></Icon>
                                    </div>
                                    <hr/>
                                    <div className="myIntro">
                                        <h4>나의 소개</h4>
                                        <p>{info.intro}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="FeedBox">
                    <div className="util"> 
                        <Link to={`/about/@${info.nick}/info`}><span className="info">소개</span></Link>
                        <Link to={`/about/@${info.nick}`}><span className="basic">글</span></Link>
                        {info.id===userInfo.id ? <Link to={`/about/@${info.nick}/secret`}><span className="time">나만 보기</span></Link> : null}
                    </div>
                    <hr/>
                    <Switch location={location}>
                        <Route path="/about/:nick/info">
                            <ProfileInfo data={info} />
                        </Route>
                        <Route path="/about/:nick" exact>
                            <ProfilePoster data={info.posters} />
                        </Route>
                        {info.id===userInfo.id ? 
                            <Route path="/about/:nick/secret">
                                <SecretPost data={info.posters}/>
                            </Route>
                        :null }
                    </Switch>
                </div>
                    
                </div>
            </ProfileContainer> 
            </> : null}
        </>
    )
}

export default Profile;