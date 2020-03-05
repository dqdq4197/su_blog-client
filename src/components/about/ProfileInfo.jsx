import React from 'react';
import styled from 'styled-components';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import HomeIcon from '@material-ui/icons/Home';
import TwitterIcon from '@material-ui/icons/Twitter';
import {device } from '../../lib/MediaStyled';

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
        font-size:16px;
        color:#90A4AE;
        .wrap {
            display:flex;
            align-items:center;
            cursor:pointer;
            padding:10px;
            border-radius:.5em;
            svg {
                margin-right:10px;
            }
            &:hover {
                background-color:rgba(0,0,0,0.03);
            }
        }
    }
`
const IntroBox = styled.div`
    display:flex;
    @media ${device.tablet} {
        display:block;
    }
    h5 {
        flex:1;
    }
    .showBox {
        flex: 8;
        font-size: 16px;
        color: #90A4AE;
`
const ProfBox = styled.div`
    width:800px;
    padding:10px;
    margin:0 auto;

    @media ${device.tablet} {
        width:100%;
        padding:30px 3px 3px 3px;
    }
` 
const DetailBox = styled.div`
    .skillWrap {
        display:flex;
        @media ${device.tablet} {
            display:block;
        }
    }
    padding:20px;
    padding-top:0;
    @media ${device.tablet} {
        padding-top:0;
        margin-top:0;
    }
    h5 {
        display:flex;
        height:40px;
        align-items:center;
        flex:2;
        margin:0;
        font-weight:bold;
        color:#4a4a4a;
    }
    .showSkill {
        .sdiv {
            width:85%
            color:#008000;
        }
        display:flex;
        align-items:center;
        color:#90A4AE;
        flex:8;
    }
    `
const TagKeyBox = styled.div`
  display:block;
  p {
    flex: 8;
    font-size: 16px;
    color: #90A4AE;
  }
  .tagKey {
    position:relative;
    cursor:pointer;
    width:auto;
    font-size:1.08rem;
    margin:2px 0 0 5px;
    padding:5px 10px;
    font-weight:500;
    border-radius:10px;
    background-color: rgba(13,72,50,.08);
    display:inline-block;
  }
`

const ProfileInfo = ({data}) => {
    console.log(data);

    return (
            <ProfBox>
                <DetailBox>
                    <div className="skillWrap">
                     <h5>기술 스택</h5>
                        <div className="showSkill">
                            <div className="sdiv">
                                <TagKeyBox>
                                    {data.skills ? data.skills.split(',').map((value) => <div className="tagKey" key={value}>{value}</div>): <p>등록된 기술 스택이 없습니다.</p>}
                                </TagKeyBox>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <SocialBox> 
                        <h5 className="title">소셜 정보</h5>
                        <div className="info">
                            {data.social.facebook || data.social.git || data.social.instagram || data.social.twitter || data.social.home ? null :<p>등록된 소셜 정보가 없습니다.</p> }
                            {data.social.facebook ? <div className="wrap" ><FacebookIcon style={{fontSize:25, color:'rgba(0,0,0,.8)'}}/>
                                {data.social.facebook }
                            </div> : null}
                            {data.social.git ? <div className="wrap"><GitHubIcon style={{fontSize:25, color:'rgba(0,0,0,.8)'}}/>
                                {data.social.git}                        
                            </div> : null}
                            {data.social.instagram ? <div className="wrap"><InstagramIcon style={{fontSize:25, color:'rgba(0,0,0,.8)'}}/>
                                {data.social.instagram}
                            </div> : null}
                            {data.social.twitter ? <div className="wrap"><TwitterIcon style={{fontSize:25, color:'rgba(0,0,0,.8)'}}/>
                                {data.social.twitter} 
                            </div> : null}
                            {data.social.home ? <div className="wrap"><HomeIcon style={{fontSize:25, color:'rgba(0,0,0,.8)'}}/>
                                {data.social.home}                        
                            </div> : null}
                        </div>
                    </SocialBox>
                    <hr/>
                    <IntroBox>
                        <h5>소개글</h5>
                            <div className="showBox">
                                {data.intro ? data.intro : '등록된 소개 글이 없습니다.'}
                            </div>
                    </IntroBox>
                </DetailBox>   
            </ProfBox>
    )
}

export default ProfileInfo;