import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import HomeIcon from '@material-ui/icons/Home';
import TwitterIcon from '@material-ui/icons/Twitter';
import {Input} from '../../lib/AuthInput';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {Popup} from 'semantic-ui-react';
import axios from 'axios';
import storage from '../../lib/storage';
import {device} from '../../lib/MediaStyled';


const SocialBox = styled.div`
    display:flex;
    margin-top:20px;
    @media ${device.tablet} {
        display:block
    }
    h5 {
        flex:2;
    }
    .info {
        flex:8;
        margin-left:10px;
        font-size:16px;
        color:#90A4AE;
        .input {
            width:150px;
                margin:0;
                padding:8px;
                font-size:1em;
        }
        .wrap {
            display:flex;
            align-items:center;
            cursor:pointer;
            padding:10px;
            border-radius:.5em;
            button {
                width:15%;
                border:none;
                background-color:transparent;
                font-size:1.1rem;
            }
            svg {
                margin-right:10px;
            }
            &:hover {
                background-color:rgba(0,0,0,0.03);

            }
            .box {
                display:flex;
                width:100%;
                font-size:14px;
                .input {
                    width:85%;
                }
            }
        }
    }
`
const SetSocial = ({info}) => {

    const [facebook,setFacebook] = useState(false);
    const [github,setGithub] = useState(false);
    const [instagram,setInstagram] = useState(false);
    const [twitter,setTwitter] = useState(false);
    const [home,setHome] = useState(false);
    const [facebookData, setFacebookData] =useState(info.social ? (info.social.facebook || null) : null);
    const [gitData, setGitData] =useState(info.social ? (info.social.git || null) : null);
    const [instaData, setInstaData] =useState(info.social ? (info.social.instagram || null) : null);
    const [twitterData, setTwitterData] =useState(info.social ? (info.social.twitter || null) : null);
    const [homeData, setHomeData] =useState(info.social ? (info.social.home || null) : null);

    useEffect(() => {
    },[])
    const getData = () => {
        axios.get('/setting/social/Info').then((res) => {

        })
    }
    const onFacebook = () => {
        setFacebook(true)
    }
    const onGithub = () => {
        setGithub(true)
    }
    const onInstagram = () => {
        setInstagram(true)
    }
    const onTwitter = () => {
        setTwitter(true)
    }
    const onHome = () => {
        setHome(true)
    }
    const onbreakEvent = (e) => {
        e.stopPropagation();
    }
    const saveData = (data,name,set) => {
        axios.post(`/setting/social/${name}`,{data :data, id:info.id})
            .then((res) => {
                let store = storage.get('loginInfo');
                store.social = res.data;
                storage.set('loginInfo',store);
            })
            set(false)
    }
    
    const onChangeData = (e,set) => {
        set(e.target.value);
    }
    return (
        <SocialBox> 
            <Popup content="소셜정보를 입력해보세요. 프로필에 공개됩니다." inverted trigger={<h5 className="title">소셜 정보 <ContactSupportIcon/></h5>}/>
            <div className="info">
                <div className="wrap" onClick={onFacebook}><FacebookIcon style={{fontSize:25, color:'rgba(0,0,0,.8)'}}/>
                    {facebook ? <div className="box" onClick={onbreakEvent}><Input onChange={(event)=>onChangeData(event,setFacebookData)} value={facebookData || ''} className="input" name={'주소를 입력해주세요.'} /><button onClick={()=>saveData(facebookData,'facebook',setFacebook)}>저장</button></div> : facebookData || '정보를 입력해 주세요.'}
                </div>
                <div className="wrap" onClick={onGithub}><GitHubIcon style={{fontSize:25, color:'rgba(0,0,0,.8)'}}/>
                    {github ? <div className="box" onClick={onbreakEvent}><Input onChange={(event)=>onChangeData(event,setGitData)} value={gitData || ''} className="input" name={'주소를 입력해주세요.'} /><button onClick={()=>saveData(gitData,'github',setGithub)}>저장</button></div> : gitData || '정보를 입력해 주세요.'}
                </div>
                <div className="wrap" onClick={onInstagram}><InstagramIcon style={{fontSize:25, color:'rgba(0,0,0,.8)'}}/>
                    {instagram ? <div className="box" onClick={onbreakEvent}><Input onChange={(event)=>onChangeData(event,setInstaData)} value={instaData || ''} className="input" name={'주소를 입력해주세요.'} /><button onClick={()=>saveData(instaData,'instagram',setInstagram)}>저장</button></div> : instaData ||'정보를 입력해 주세요.'}
                </div>
                <div className="wrap" onClick={onTwitter}><TwitterIcon style={{fontSize:25, color:'rgba(0,0,0,.8)'}}/>
                    {twitter ? <div className="box" onClick={onbreakEvent}><Input onChange={(event)=>onChangeData(event,setTwitterData)} value={twitterData || ''} className="input" name={'주소를 입력해주세요.'} /><button onClick={()=>saveData(twitterData,'twitter',setTwitter)}>저장</button></div> : twitterData ||'정보를 입력해 주세요.'}
                </div>
                <div className="wrap" onClick={onHome}><HomeIcon style={{fontSize:25, color:'rgba(0,0,0,.8)'}}/>
                    {home ? <div className="box" onClick={onbreakEvent}><Input onChange={(event)=>onChangeData(event,setHomeData)} value={homeData || ''} className="input" name={'주소를 입력해주세요.'} /><button onClick={()=>saveData(homeData,'home',setHome)}>저장</button></div> : homeData ||'정보를 입력해 주세요.'}
                </div>
            </div>
        </SocialBox>
    )
}

export default SetSocial;