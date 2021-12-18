import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import GetFeed from './GetFeed';
import { useLocation, useHistory } from 'react-router-dom';
import { Popup, Icon } from 'semantic-ui-react';
import { Link} from 'react-router-dom';
import { device } from '../../lib/MediaStyled';
import { tagFeedAPI } from '../../lib/api/tagSearch';




const OneTagPoster = ({tag}) => {
    
  const [post,setPost] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    getPost();
  },[location.pathname])

  const getPost = () => {
    tagFeedAPI.get({page:tag,history})
    .then((res) => {
      setPost(res.data);
    })
  }
    
  return (
    <>
      <TagContainer>
        <div className="title">
          <h1># {tag}</h1>
          <Link to='/hashtags'>
            <Popup 
              inverted 
              content='태그 검색페이지로 이동합니다' 
              trigger={
                <div className="goSearch">
                  <Icon name="search" />
                </div>
              }
            />
          </Link>
          <p>
            {post.length}개의 포스트
          </p>
        </div>
        {post.map((value,index) =>
          <GetFeed 
            key={index} 
            block={value}
            contents={
              value.content.blocks.filter((data) => data.type ==='paragraph').map((content) => { 
              return content.data.text.replace(/&nbsp;|<b>|<\/b>/g,'')})
            }/>
        )}
      </TagContainer>
    </>
  )
}

export default OneTagPoster;

const TagContainer = styled.div`
  width:720px;
  height:100%;
  margin:0 auto;
  text-align:center;
  margin-top:100px;
  @media ${device.laptopL} {
    width:680px
  };
  @media ${device.tablet} {
    width:95%;
  }
  .title {
      text-align: left;
      width: 720px;
      margin: 50px auto 0;
      position: relative;
      @media ${device.laptopL} {
        width:680px;
      }
      @media ${device.tablet} {
        width:95%;
      }
      h1 {
        display:inline-block;
        font-size:3rem;
        @media ${device.tablet} {
          font-size:2.0rem;
        }
      }
      a {
        color:black;
      }
      p {     
        font-size:1.2rem;
        color:rgba(0,0,0,.7);
        font-weight:500;
        margin-left:10px;
      }
      .goSearch {
        text-align:center;
        width:40px;
        height:40px;
        vertical-align:bottom;
        margin-left:10px;
        border-radius:40px;
        background-color:rgba(13,72,50,.5);
        display:inline-block;
        font-size:2rem;
        color: rgba(0,0,0,.7);
        margin-bottom:10px;
        @media ${device.tablet} {
          width:30px;
          height:30px;
          font-size:1.5rem;
        }
      }
  }
  .titleHr {
      position:relative;
      left:50%;
      transform:translateX(-50%);
      margin:5px 0 0 0;
      width:800px;
  }
`