import React from 'react';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import postTumnail from '../../lib/basicTumnail/postTumnail.png';
import Img from 'react-image';
import ImageLoad from '../../lib/skeleton/Home/ImageLoad';
import {device} from '../../lib/MediaStyled';
import {ImageEnv} from '../../lib/processEnv';


const Container = styled.div`
    position:relative;
    width:100%;
    text-align:center;
    .wrap {
        display: inline-grid;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        grid-template-columns: repeat(3, 1fr);
        @media ${device.laptopL} {
            grid-template-columns: repeat(2, 1fr);
        }
        @media ${device.mobileXL}{
            grid-template-columns: repeat(1, 1fr);
        }   
     }
`
const TumnailBox = styled.div`
    position:relative;
    max-width: 404px;
    min-width: 145px;
    border-radius:5px;
    cursor:pointer;
    &:hover {
        .posterInfo {
            opacity:1;
    }
    }
    .posterInfo {
        position:absolute;
        display:flex;
        padding: 0 8px 8px;
        bottom:0;
        @media ${device.tablet} {
            opacity:1;
        }
        word-break:break-all;
        z-index:3;
        text-align:left;
        background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(2,0,36,0.5489905434830182) 100%);
        width:100%;
        height:60px;
        color:white;
        opacity:0;
        transition:.3s;
        text-shadow: 1px 1px 3px rgba(0,0,0,.5);
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        flex-direction: row;
        -webkit-box-align: end;
        -ms-flex-align: end;
        align-items: flex-end;
        box-sizing: border-box;
        .left {
            box-flex:1;
            flex:1;
            margin-right:14px;
            font-weight:300;
            p {
                font-size:11px;
            }
        }
        .right {
            display:flex;
            div {
                display:flex;
            }
        }
        b {
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight:600;
            font-size:14px;
        }
        p {
            position:relative;
            font-size:14px;
            text-shadow: 1px 1px 3px rgba(0,0,0,.5);
        }

    }
    .tumnailImg {
        background-color:#e4e4e46b;
        @media ${device.tablet} {
            height:31vw;
        }
        @media ${device.mobileXL} {
            height:52vw;
        }
        height:240px;
        position:relative;
        display:flex;
        align-items:center;
        justify-content:center;
        overflow:hidden;
        border-radius:5px;
        img {
            @media ${device.tablet} {

                height:100%;
            }
            height:240px;
            margin:0 auto;
        }
    } 
`

const ProfilePoster = ({data}) => {
    
    return (
        <Container>
            {data.length!==0 ? 
            <div className="wrap">
            { data.map((block) => {
                return <TumnailBox key={block.id}>
                        <Link to={`/poster/${block.id}/${block.author}`}>
                        <div className='posterInfo'>
                            <div className="left">
                                <b>{block.tumnailTitle}</b>
                                <p>{block.author}</p>
                            </div>
                            <div className='right'>
                                <div style={{marginRight:'7px'}}>
                                    <Icon name="heart outline" />
                                    {block.p_likes.length}
                                </div>
                                <div>
                                    <Icon name="comment outline" />
                                    <p>{block.comments.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tumnailImg">
                            <Img 
                                src={block.tumnailImg ? ImageEnv(block.tumnailImg) : postTumnail}
                                loader={<ImageLoad />}
                             />
                        </div>
                        </Link>
                        </TumnailBox>
            })} 
            </div>
            : '등록된 글이 없습니다.'}
        </Container>
    )
}

export default ProfilePoster;