import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams, useLocation} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';
import styled from 'styled-components';
import VariousBtn from '../components/poster/VariousBtn';
import ToggleDial from '../components/poster/ToggleDial';
import {device} from '../lib/MediaStyled';
import Backbutton from '../components/poster/Backbutton';
import CommentBox from '../components/poster/Comments';
import ClearIcon from '@material-ui/icons/Clear';
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

const ModalContainer = styled.div`
    position: fixed;
    z-index: 100000;
    scrollbor-color:#e9e7e7;
    overflow: auto;
    top: 0;
    background: rgba(0,0,0,.9);
    width: 100%;
    left:0;
    bottom:0;
    right:0;
    @media ${device.laptop} {
      background-color:white;
    }
    .modalClose {
      position:fixed;
      display:flex;
      right:10px;
      align-items:center;
      justify-content:center;
      margin-top:5px;
      cursor:pointer;
      width:50px;
      height:50px;
      color:white;
      border-radius: 40%;
      &:hover {
        background: rgba(255,255,255,.3);
      }
      transition:.3s;

    }
    .dial {
      @media ${device.laptop} {
        display:none;
      }
    }
    .modalBox {
      -webkit-box-shadow: 0px 0px 73px -19px rgba(0,0,0,1);
      -moz-box-shadow: 0px 0px 73px -19px rgba(0,0,0,1);
      box-shadow: 0px 0px 73px -19px rgba(0,0,0,1);
      position:absolute;
      top:60px;
      left:15%;
      min-Height:100%;
      right:15%;
      z-index:100000000;
      color:black;
      background-color:white;
      
      @media ${device.laptop} {
        left:0;
        right:0;
        top:0;
      }
    }
`

const SubTitleBox = styled.div`
  position:fixed;
  z-index:100;
  top:200px;
  right:0;
  width:17%;
    ul {
      @media ${device.laptop} {
        display:none;
      }
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
          color:white;
          text-decoration:none;
        }
        list-style:none;
        font-size:.95rem;
      }
  }
 
`

const PosterContainer= styled.div`

  .posterdiv {
    .row {
      @media ${device.laptop} {
        margin-right:0;
      }
    }
    .col-md-10.blog-main {
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
        @media ${device.laptopL} {
          width:493px;
          height:256px;
        }
        @media ${device.tablet} {
          width: 100%;
          height: 45vw;
        }
      }
      font-size:1.2rem;
      @media ${device.laptop} {
        margin-top:75px;
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
      padding-left: 40px;
      padding-right:25px;
      margin:50px auto 0;
      word-break:keep-all;
      #content {
        word-break:break-all; 
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
        #Title_postTitle {
          @media ${device.tablet} {
            font-size:2.4rem;
          }
          @media ${device.mobileL} {
            font-size:2rem;
          }
          font-size:3rem;
          font-weight:bold;
          margin-bottom:20px;
        }
        #Title_profileImg {
          cursor:pointer;
          display:inline-block;
          width:40px;
          height:40px;
          border-radius:40px;
          margin-right:7px;
          background:url(${props => props.profile_img});
          background-size:cover;
          background-position:center center;
        }
        #Title_author {
          cursor:pointer;
          display:inline-block;
          font-weight:500;
          vertical-align: middle;
          margin-bottom:30px;
          font-size:1.1rem;
          &:hover {
            text-decoration:underline;
          }
        }
        #Title_date {
          display:inline-block;
          vertical-align:middle;
          font-size:1rem;
        }

      }
      p {
        line-height:200%;
        letter-spacing: -1px;
        margin-bottom:2rem;
      }
      li {
        line-height:230%;
      }
      img {
        left:0;
        right:0;
        margin:0 auto;
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
  border:2px solid #6c757d;
  left:86%
  bottom:120px;
  font-size:3em;
  color:#6c757d;
  transition:.3s;
  @media ${device.laptop} {
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
  @media ${device.laptop} {
    display:none;
  }
  width:50px;
  height:50px;
  border-radius:50px;
  border:2px solid #6c757d;
  left:86%
  bottom: 50px;
  font-size:3em;
  color:#6c757d;
  transition:.3s;
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

const PosterModal = () => {

    const history = useHistory();
    const { id,author } = useParams();
    const location = useLocation();
    const userInfo = storage.get('loginInfo');

    const [modifyData, setModifyData] = useState({});
    const [header, setHeader] = useState([{id:'',text:''}]);


    useEffect(() => {
      document.getElementById('body').style.overflow='hidden';
      getData();
      return () => {document.getElementById('body').style.overflow='visible';}
    },[])

    const getData = async() => {
      const outData = location.state.block.content.blocks.map((result)=>{
        return result;
      })
      setModifyData(location.state.block);
      console.log(location.state.block)
      jsonData(outData);
    
    };
    const scrollup = () => {
      document.getElementById('modalContainer').scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    const scrolldown = () => {
      document.getElementById('modalContainer').scrollTo({
        top: document.getElementById('modalContainer').scrollHeight,
        behavior: 'smooth'
      });
    }

    const jsonData = (json) => {
      let html = `<h1 id="Title_postTitle">${location.state.block.tumnailTitle}</h1>
          <div id='Title_profileImg'></div><div id="Title_author">${location.state.block.author}</div>
          <p id="Title_date">· ${location.state.block.createdAt.slice(0,10).replace(/-/, '년 ').replace(/-/,'월 ')}일</p>`;
      json.forEach(function(block,i) {
        
        switch (block.type) {
          case 'header':
            html += `<h${block.data.level} id='${i+'_'+block.data.text}'>${block.data.text}</h${block.data.level}>`;
            setHeader((prev) => [...prev,{id:i+'_'+block.data.text,text:block.data.text}])
            break;
          case 'paragraph':
            html += `<p>${block.data.text}</p>`;
            break;
          case 'delimiter':
            html += '<div class="delimiter"></div>';
            break;
          case 'image':
            html += `<img src="${block.data.file.url}" alt="" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
            break;
          case 'list':
            if(block.data.style==='ordered') {
              html += '<ol>';
              block.data.items.forEach(function(li) {
                html += `<li>${li}</li>`;
            })
            html += '</ol>';
          }else { 
              html += '<ul>';
              block.data.items.forEach(function(li) {
                html += `<li>${li}</li>`;
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
        document.getElementById('Title_profileImg').onclick=function(){ history.push(`/about/@${location.state.block.author}`)}
        document.getElementById('Title_author').onclick=function(){ history.push(`/about/@${location.state.block.author}`)}
      });
    };
console.log(location.state.block.author);
    const SubTitle = () => {
      return header ? <SubTitleBox>{<ul>{header.map(
          (title) => {
             return (<li key={title.id}><a href={'#'+title.id}>{title.text}</a></li>)
          }
      )}<li className="commentView"><a href="#commentView">댓글 보기</a></li></ul>}</SubTitleBox> : null
    }

    const back = e => {
      e.stopPropagation();
      if(e.target !== e.currentTarget){
        return ; 
      }else {
        history.goBack();
      }    
    };

    const onCloseModal = () => {
      history.goBack();
    }
    return (
        <>
        <ModalContainer onClick={back} id='modalContainer' imgPath={'img/'+location.state.block.user.profile_img}>
          <span className="modalClose"><ClearIcon onClick={onCloseModal} fontSize="large"/></span>
          <div className="modalBox">
          <SubTitle />
          <div className="dial"><ToggleDial  left={'15%'} width={0} id={id} author={author} user={userInfo && userInfo.nick} /></div>
          <ScrollupBtn height={window.innerHeight} onClick={scrollup}><Icon name="angle up"/></ScrollupBtn>
          <ScrolldownBtn height={window.innerHeight} onClick={scrolldown}><Icon name="angle down"/></ScrolldownBtn>
            <PosterContainer id='total' profile_img={'img/'+location.state.block.user.profile_img}>
            <Backbutton />
            <main role="main" className="posterdiv">
              <div className="row">
                <div className="col-md-10 blog-main">
                  <div className="blog-post">
                    <div id="content">
                      ..isLoadding                  
                    </div>
                  </div>
                  
                  {(userInfo ? (userInfo.nick === author || userInfo.nick === ' Operator') : false ) ? 
                    <VariousBtn data={modifyData} posterId={id} author={author}/> : ''}
                    <CommentBox postId={id}/>
                </div>
              </div>
            </main>
            </PosterContainer>
          </div>
        </ModalContainer>
        </>
    )
}

export default PosterModal;