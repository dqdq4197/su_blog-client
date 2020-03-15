import React, {useEffect,useState ,useRef} from 'react';
import styled from 'styled-components';
import VariousBtn from '../components/poster/VariousBtn'
import {posterLoadRequest, posterLoadSuccess} from '../actions/posts';
import {useDispatch, useSelector} from 'react-redux';
import CommentBox from '../components/poster/Comments';
import ToggleDial from '../components/poster/ToggleDial';
import {Icon} from 'semantic-ui-react';
import {getPosterAPI} from '../lib/api/poster';
import {useHistory} from 'react-router-dom';
import {device} from '../lib/MediaStyled';
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
  width:20%;
  @media ${device.tablet} {
    display:none;
  }
    ul {
      margin:0;
      .commentView {
        margin-top:20px;
        font-weight:700;
      }
      li {
        margin-bottom:3px;
        a {
          &:hover {
            color:#008000;
          }
          color:rgba(13,72,50,.55);
          text-decoration:none;
        }
        list-style:none;
        font-size:.95rem;
      }
  }
`

const PosterContainer= styled.div`
  padding-top:60px;
  .posterdiv {
    .row {
      margin-left:0;
      margin-right:0;
    }
    .col-md-8.blog-main {
      h1,h2,h3,h4,h5 {
        word-break: break-word;
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
        a {
          color:#008000;
        }
        #Title_postTitle {
          font-size:3rem;
          font-weight:bold;
          margin-bottom:20px;
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
        #Title_author {
          cursor:pointer;
          display:inline-block;
          font-weight:500;
          vertical-align: middle;
          margin-bottom:30px;
          &:hover {
            text-decoration:underline;
          }
        }
        #Title_date {
          display:inline-block;
          vertical-align:middle;
          font-size:1.2rem;
          @media ${device.tablet} {
            font-size:1rem;
          }
        }
      }
      p {
        word-break:break-all;
        line-height:200%;
        letter-spacing: -1px;
        margin-bottom:2rem;
      }
      li {
        line-height:230%;
      }
      img {
        max-width:100%;
      }
    }
  }
`

const ScrollupBtn = styled.div`
  position:fixed;
  width:50px;
  height:50px;
  border-radius:50px;
  border:2px solid #e9e7e7;
  left:86%
  bottom:120px;
  font-size:3em;
  color:#6c757d;
  transition:.3s;
  @media ${device.tablet} {
    display:none;
  }
  &:hover {
    color:rgba(13,72,50,.8);
    border-color:rgba(13,72,50,.5);
  }
  i {
    left: -3%;
    position: relative;
    top: -23%;
  }
`
const ScrolldownBtn = styled.div`
  position:fixed;
  width:50px;
  height:50px;
  border-radius:50px;
  border:2px solid #e9e7e7;
  left:86%
  bottom: 50px;
  font-size:3em;
  color:#6c757d;
  transition:.3s;
  @media ${device.tablet} {
    display:none;
  }
  &:hover {
    color:rgba(13,72,50,.8);
    border-color:rgba(13,72,50,.5);
  }
  i {
    left: -3%;
    position: relative;
    top: -20%;
  }
`



const Poster = ({match}) => {
  
  const userInfo = storage.get('loginInfo');

  const dispatch = useDispatch();
  const {isLoadding} = useSelector(state => state.posts);
  const [modifyData, setModifyData] = useState({});
  const [header, setHeader] = useState([{id:'',text:''}]);
  const title = useRef({title:'', profile_img:'', author:'', date:'', content:''});
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
            setProfileImg(res.data.user.profile_img)
            title.current.title=res.data.tumnailTitle;
            title.current.profile_img = res.data.user.profile_img;
            title.current.author = res.data.author;
            title.current.date = res.data.createdAt.slice(0,10).replace(/-/, '년 ').replace(/-/,'월 ');
            title.current.categorie = res.data.skills;
            title.current.tags = res.data.hashTags;
            title.current.tumnailImg = res.data.tumnailImg;
            jsonData(outdata)};
        }).catch((error) => 
        document.getElementById('content').innerHTML = 'Notfound'
        )
      
      }
      useEffect(() => {
        posterShowRequest();
      },[]);

      const scrollup = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      const scrolldown = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }
      const jsonData = (json) => {
        let content = "";
        let html = `<h1 id="Title_postTitle">${title.current.title}</h1>
          <div id='Title_profileImg'></div><div id="Title_author">${title.current.author}</div>
          <p id="Title_date">· ${title.current.date}일</p>`;
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
              html += '<hr />';
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
          document.getElementById('Title_profileImg').onclick=function(){ history.push(`/about/@${title.current.author}`)}
          document.getElementById('Title_author').onclick=function(){ history.push(`/about/@${title.current.author}`)}
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
            keywords={title.current.hashTags}
            title={title.current.title}
            description={title.current.content}
            favicon={`https://sublog.co/static/media/postTumnail.b240a236.png`}
        />
          
        <SubTitle />
        <Dial><ToggleDial width={54} left={'10%'} id={match.params.id} user={userInfo && userInfo.nick} author={match.params.author} /></Dial>
        <ScrollupBtn height={window.innerHeight} onClick={scrollup}><Icon name="angle up"/></ScrollupBtn>
        <ScrolldownBtn height={window.innerHeight} onClick={scrolldown}><Icon name="angle down"/></ScrolldownBtn>
        <PosterContainer profile_img={profileImg}>
          <main role="main" className="posterdiv">
            <div className="row">
              <div className="col-md-8 blog-main">
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