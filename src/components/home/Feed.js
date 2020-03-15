import React  from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {postShowRequest} from '../../actions/posts';
import TimeAgo from '../../lib/TimeAgo';
import styled from 'styled-components';
import {Popup} from 'semantic-ui-react';
import postTumnail from '../../lib/basicTumnail/postTumnail.png';
import Basic from '../../lib/basicTumnail/basic.gif';
import {ImageEnv} from '../../lib/processEnv';

const PosterWrap = styled.div`
    position:relative;
    display:inline-block;
    text-align:left;
    background-color:white;
    width:100%;
    height:auto ;
    border-radius:4px;
    border:1px solid #e9e7e7;
    &:not(:first-child) {
        margin-top:12px;
    };
    .feed_Header {
        display:flex;
        width:100%;
        height:82px;
        padding:16px;
        
        .feed_profile{
            width:40px;
            height:40px;
            border-radius:50%;
            background:url(${props => props.profile_img === 'basic.gif' ? Basic : ImageEnv(props.profile_img)});
            background-size:cover;
            background-position:center center;
            background-color:rgba(0,0,0,.5);
        };
        .feed_Header_text {
            width:100%;
            margin-left:10px;
        }
        a{
            color:black;
            .author {
                font-weight:500;
            }
        }
        .date {
            cursor:text;
            .rrui__tooltip--before-hide {
                opacity : 0;
            }
            .rrui__tooltip {
                /* Display the tooltip above the content. */
                margin-top : -0.5em;
                background-color : black;
                color : white;
                opacity:0;
              }
               
              .rrui__tooltip--after-show {
                opacity : 0;
              }
            color:rgba(0,0,0,.6);
        }
    }
    
    .feed_content {
        .test {
            font-size:13px;
            padding-left:18px;
        }
        a { 
          text-decoration:none;
          color: black;
          h4 {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight:600;
            line-height:30px;
            font-size:1.7rem;
            color:black;
            margin:10px 16px 8px;
          };
          .feed_preview {
              padding:4px 16px;
              display: -webkit-box;
              font-weight:400;
              font-size: 16px;
              line-height: 1.4;
              margin-top:10px;
              p {
                display: -webkit-box; display: -webkit-box; display: -ms-flexbox;
                max-height:200px; 
                overflow:hidden; 
                vertical-align:top; 
                text-overflow: ellipsis; 
                word-break:break-all;
                -webkit-box-orient:vertical; 
                -webkit-line-clamp:5;
                font-weight:400;
              }
          }
        }
        .tags {
            width:100%;
            padding-left:20px;
            margin:15px 0;
            .feed_tags {
                position:relative;
                width:auto;
                background-color:rgb(239, 242, 246) ;
                border-radius:10px;
                padding: 3px 8px;
                margin:0 0 30px 5px;
                font-weight:500;
                transition:.2s;
                &:hover {
                    background-color:rgba(0,0,0,.1);
                }
                a {
                    color:#008000;
                    font-weight:600;
                }
                
                &:nth-child(2) {
                }
            }

        }
        .feed_reply {
            display:flex;
            padding:0 30px 5px;
            justify-content: space-between;
            align-items:center;
            font-size:1.1rem;
                font-weight:700;
                color:#696969;
            
        }
    };


`

const Feed = ({block, contents}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const onclickPoster = () => {
        dispatch(postShowRequest(block.id));
    }

    const hideScroll = () => {
        document.getElementById('body').style.overflow='hidden';
    }
    
    return (
        <PosterWrap className="posterDetail" id={block.id + '번'} profile_img={block.user.profile_img} onClick={onclickPoster}>
            <div className="feed_Header">
                <Link to={`/about/@${block.author}`}><div className="feed_profile"></div></Link>
                <div className="feed_Header_text"> 
                    <Link to={`/about/@${block.author}`}><span className="author">{block.author}</span></Link>
                    <Popup content={`
                        ${block.createdAt.slice(0,10).replace(/-/, '년 ').replace(/-/,'월 ')}일`} trigger={<span className="date"><TimeAgo date={block.createdAt} /></span>}/>
                </div>
            </div>
            <div className="feed_content" >
                <Link to={{ pathname:`/poster/${block.id}/${block.author}`, state:{background:location, block, replys:block.comments}}} onClick={hideScroll} >  
                    <img style={{width:'100%', marginTop:10}} src={block.tumnailImg ? ImageEnv(block.tumnailImg) : postTumnail} alt="thumnail" ></img>
                </Link>  
                {/* <div className="feed_reply"><div><Icon name="thumbs up outline"/>{block.p_likes.length}</div><div><Icon name='comment outline'/>{block.comments.length}개의 댓글</div></div> */}
                <Link to={{ pathname:`/poster/${block.id}/${block.author}`, state:{background:location, block, replys:block.comments}}} onClick={hideScroll} >
                    <h4>{block.tumnailTitle}</h4>
                </Link>
                <Link to={{ pathname:`/poster/${block.id}/${block.author}`, state:{background:location, block, replys:block.comments}}} onClick={hideScroll} >  
                    <div className="feed_preview">{contents.length > 2 ? <p>{contents.slice(2,5)}</p> : 'contents'}</div>
                </Link>
                <div className="test">{block.p_likes.length}개 좋아요 · {block.comments.length}개의 댓글</div>
                <div className="tags">
                    {block.hashTags===null ? null :(block.hashTags.match(',') ?
                        block.hashTags.split(',').map( (res,i) => <span key={i} className="feed_tags" ><Link to={`/hashtags/${res}`} >{'#'+res}</Link></span>) 
                        : <span className="feed_tags"><Link to={`hashtags/${block.hashTags}`}>{ "#" + block.hashTags}</Link></span>)}
                </div>   
                
                <hr style={{margin:5}}/>
            </div>
        </PosterWrap>
    )
}

export default Feed