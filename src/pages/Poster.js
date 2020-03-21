import React, {useEffect,useState ,useRef} from 'react';
import styled from 'styled-components';
import VariousBtn from '../components/poster/VariousBtn'
import {posterLoadRequest, posterLoadSuccess} from '../actions/posts';
import {useDispatch, useSelector} from 'react-redux';
import CommentBox from '../components/poster/Comments';
import ToggleDial from '../components/poster/ToggleDial';
import {getPosterAPI} from '../lib/api/poster';
import {useHistory, Link} from 'react-router-dom';
import {device} from '../lib/MediaStyled';
import MtoggleDial from '../components/poster/MtoggleDial';
import '../lib/font/font.css';
import Basic from '../lib/basicTumnail/basic.gif';
import {ImageEnv} from '../lib/processEnv';
import ReactHelmet from '../lib/ReactHelmet';
import storage from '../lib/storage';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml'; 
import css from 'highlight.js/lib/languages/css'; 
import json from 'highlight.js/lib/languages/json'; 
import java from 'highlight.js/lib/languages/java'; 
import python from 'highlight.js/lib/languages/python'; 
import typescript from 'highlight.js/lib/languages/typescript'; 
import 'highlight.js/styles/atom-one-dark-reasonable.css';
hljs.registerLanguage('html', html); 
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);


const Dial =styled.div`
  @media ${device.tablet} {
    display:none;
  }
  .makeStyles-root-86 {
    left:10% !important;
  }
`
const SubTitleBox = styled.div`
  position:fixed;
  z-index:100;
  top:200px;
  right:0;
  width:300px;
  border-left:5px solid rgb(233, 236, 239);
  @media ${device.laptopXL} {
    width:200px;
  }
  @media ${device.laptopL} {
    display:none;
  }
    ul {
      padding:0 10px;
      margin:0;
      .commentView {
        margin-top:20px;
        font-weight:700;
      }
      li {
        margin-bottom:3px;
        a {
          &:hover {
            color:black;
          }
          color:#999;
          text-decoration:none;
        }
        list-style:none;
        font-size:.95rem;
      }
  }
`

const PosterContainer= styled.div`
  font-family:Mapo;
  padding-top:60px;
  .posterdiv {
    .row {
      margin-left:0;
      margin-right:0;
    }
    .col-md-8.blog-main {
      opacity:0;
      transition:opacity .5s;
      h1,h2,h3,h4,h5,h6 {
        font-family:Mapo;
        margin:1rem 0;
        word-break: break-word;
      }
      #Title_postTitle {
        max-width:880px
        margin:0 auto 20px;
        font-size:3rem;
        font-weight:bold;
        word-break:break-all;
        @media ${device.tablet} {
          font-size:2.4rem;
        }
        @media ${device.mobileL} {
          font-size:2rem;
        }
      }
      #Title_profileImg {
        cursor:pointer;
        display:inline-block;
        width:50px;
        height:50px;
        border-radius:50px;
        @media ${device.tablet} {
          width:40px;
          height:40px;
          border-radius:40px;
        }
        margin-right:7px;
        background:url(${props => props.profile_img === 'basic.gif' ? Basic : ImageEnv(props.profile_img)});
        background-size:cover;
        background-position:center center;
      }
      .detail {
        max-width:880px;
        margin:0 auto;
        display:flex;
        justify-content:space-between;
        #Title_author {
          font-family:Mapo;
          cursor:pointer;
          font-weight:500;
          vertical-align: middle;
          margin-bottom:30px;
          &:hover {
            text-decoration:underline;
          }
        }
        #Title_date {
          vertical-align:middle;
          font-size:1.2rem;
          margin-bottom:30px;
          @media ${device.tablet} {
            font-size:1rem;
          }
        }
        #toggleDial {
          margin-bottom:30px;
          vertical-align:bottom;
          display:none;
          @media ${device.tablet} {
            display:block;
          }
  
        }
      }
      .inline-code {
        color:#008000;
        background-color:rgba(13,72,50,.08);
      }
      .blog-post {
        max-width: 880px;
        margin: 0 auto;
      }
      img {
        display:block;
      }
      embed {
        display:block;
        margin:0 auto;
        @media ${device.laptop} {
          width:100%;
          height:39vw;
        }
        @media ${device.tablet} {
          height:49vw;
        }
      }
      font-size:1.3rem;
      margin:0 auto;
      padding:80px 0 ;
      word-break:keep-all;
      @media ${device.laptop} {
        padding:0;
        padding-top:8%;
      }
      @media ${device.tablet} {
        font-size:1.15rem;
        padding:8%;
        max-width:100%;
        h5 {
          font-size:1.15rem;
        }
        h4 {
          font-size:1.3rem;
        }
        h3 {
          font-size: 1.45rem;
        }
        h2 {
          font-size:1.6rem;
        }
        h1 {
          font-size:1.9rem;
        }
      }
     
      @media ${device.mobileL} {
        pre {
          code {
            font-size:13px;
          }
        }
        h5 {
          font-size:1rem;
        }
        h4 {
          font-size:1.15rem;
        }
        h3 {
          font-size: 1.3rem;
        }
        h2 {
          font-size:1.45rem;
        }
        h1 {
          font-size:1.7rem;
        }
        font-size:1.1rem;
      }
      @media (min-width: 768px){
        .col-md-8 {
          width:100%;
      }}
      #content {
        
        .delimiter {
          line-height: 1.6em;
          width: 100%;
          text-align: center;
          &::before {
            display: inline-block;
            content: "***";
            font-size: 30px;
            line-height: 65px;
            height: 30px;
            letter-spacing: 0.2em;
          }
        }
        a {
          color:#008000;
        }
        
      }
      p {
        word-break:break-all;
        line-height:180%;
        letter-spacing: -1px;
        margin-bottom:.5rem;
      }
      li {
        line-height:200%;
      }
      img {
        max-width:100%;
      }
    }
  }
`


const Poster = ({match}) => {
  
  const userInfo = storage.get('loginInfo');

  const dispatch = useDispatch();
  const {isLoadding} = useSelector(state => state.posts);
  const [modifyData, setModifyData] = useState({});
  const [header, setHeader] = useState([{id:'',text:''}]);
  const title = useRef({content:''});
  const [postHead, setPostHead] = useState({title:'',author:'',date:'',tumnailImg:''});
  const history = useHistory();
  const [profileImg, setProfileImg] = useState('');

      const posterShowRequest = async() => {
        dispatch(posterLoadRequest());
        await getPosterAPI.get({page:{id:match.params.id, author:match.params.author},history})
        .then((res) => {
          dispatch(posterLoadSuccess());
          if(res.data) {
            const outdata = res.data.content.blocks.map((result)=>{
              return result;
            })
            setModifyData(res.data);
            setProfileImg(res.data.user.profile_img);
            setPostHead({
              title:res.data.tumnailTitle,
              author:res.data.author,
              date:res.data.createdAt.slice(0,10).replace(/-/, '년 ').replace(/-/,'월 '),
              tumnailImg:res.data.tumnailImg
            });
            title.current.tags = res.data.hashTags;
            jsonData(outdata)};
        }).catch((error) => {
        console.log(error)
        document.getElementById('content').innerHTML = 'Notfound'
        })
      
      }
      useEffect(() => {
        posterShowRequest();
      },[]);

      const jsonData = (json) => {
        let content = "";
        let html='';
        // let html = `<h1 id="Title_postTitle">${title.current.title}</h1>
        //  <div id="Title_author">${title.current.author}</div>
        //   <p id="Title_date">· ${title.current.date}일</p>`;
        json.forEach(function(block,i) {
          
          switch (block.type) {
            case 'header':
              content += block.data.text;
              html += `<h${block.data.level} id='${i+'_'+block.data.text}'>${block.data.text}</h${block.data.level}>`;
              setHeader((prev) => [...prev,{id:i+'_'+block.data.text,text:block.data.text}])
              break;
            case 'paragraph':
              content += block.data.text;
              html += `<p>${block.data.text}</p>`;
              break;
              case 'delimiter':
                html += '<div class="delimiter"></div>';
                break;
            case 'image':
              html += `<img className="img-fluid" src="${block.data.file.url}" alt="" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
              break;
            case 'list':
              if(block.data.style==='ordered') {
                html += '<ol>';
                block.data.items.forEach(function(li) {
                  html += `<li>${li}</li>`;
                  content += li
              })
              html += '</ol>';
            }else { 
              html += '<ul>';
              block.data.items.forEach(function(li) {
                html += `<li>${li}</li>`;
                content += li
              });
              html += '</ul>';
            }
              break;
            case 'embed':
              html += `<embed src="${block.data.embed}" width="${block.data.width}" height="${block.data.height}"><br /><em>${block.data.caption}</em>`
              break;
            case 'raw':
              const highlightedCode = hljs.highlightAuto(block.data.html).value
              html += `<pre><code class="hljs" style="max-height:700px">${highlightedCode}</code></pre>`
              break;

            default:
              console.log('Unknown block type', block.type);
              console.log(block);
              break;
          }
          document.getElementById('content').innerHTML = html;
          document.getElementById('post').style.opacity=1;
          title.current.content = content ? content.replace(/<code>|<br>|<i>|<\/i>|&nbsp;|<b>|<\/b>|<\/code>|<code class="inline-code">/g,'').replace(/&gt;/g,'>').replace(/&lt;/g,'<').slice(0,200) : '';
        });
      };

      const SubTitle = () => {
        return header ? <SubTitleBox>{<ul>{header.map(
            (title) => {
               return (<li key={title.id}><a href={'#'+title.id}>{title.text}</a></li>)
            }
        )}<li className="commentView"><a href="#commentView">댓글 보기</a></li></ul>}</SubTitleBox> : null
      }
    return (
      <>
        <ReactHelmet
            keywords={title.current.tags}
            title={postHead.title}
            description={title.current.content}
            favicon={postHead.tumnailImg}
        />
          
        <SubTitle />
        <Dial><ToggleDial width={54} left={'10%'} id={match.params.id} user={userInfo} author={match.params.author} /></Dial>
        <PosterContainer profile_img={profileImg}>
          <main role="main" className="posterdiv">
            <div className="row">
              <div className="col-md-8 blog-main" id="post">
                <h1 id="Title_postTitle">{postHead.title}</h1>
                <div className="detail">
                  <div style={{display:'flex'}}> 
                  <div id="Title_author"><Link to={`/about/@${postHead.author}`}>{postHead.author}</Link></div>
                  <p id="Title_date">· {postHead.date}일</p>
                  </div>
                  <div id="toggleDial"><MtoggleDial id={match.params.id} user={userInfo} author={match.params.author}/></div>
                </div>
                <div className="blog-post">
                  <div id="content">
                    ..isLoadding                  
                  </div>
                </div>
                {isLoadding === 'SUCCESS' && (userInfo ? (userInfo.nick === match.params.author || userInfo.nick === '히수') : false ) ? 
                <VariousBtn data={modifyData} posterId={match.params.id} author={match.params.author}/> : ''}
                <CommentBox postId={match.params.id}/>
              </div>
            </div>
          </main>
        </PosterContainer>
      </>
    )
}
export default Poster;