import * as React from 'react';
import {useState,useEffect} from 'react';
import styled, { keyframes, css } from 'styled-components';
import {Button} from '../../lib/AuthInput';
import storage from '../../lib/storage';
import {useHistory} from 'react-router-dom';

function Dialog({confirmtext, visible ,onConfirm}) {

    const [animate, setAnimate] = useState(false);
    const [localVisible, setLocalVisible] = useState(false);
    const history = useHistory();

    useEffect(() => {
      // visible 값이 true -> false 가 되는 것을 감지
      if (localVisible && !visible) {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 250);
      }
      setLocalVisible(visible);
    }, [localVisible, visible]);
    const onLogin = () => {
      const info = {
        createdAt: "2019-11-01T19:19:23.000Z",
        email: "test@sublog.co",
        id: 15,
        intro: null,
        nick: "test",
        profile_img: "basic.gif",
        skills: null,
        social: null,
      }
      storage.set('loginInfo',info);
      sessionStorage.setItem('aboutModal', 'c610125be34842189b3ef9ba523f6599');
      history.go(0);
    }
  if (!animate && !localVisible) return null;
  return (
    <>
      <DarkBackground disappear={!visible}>
          <DialogBlock disappear={!visible}>
               <h3 style={{marginBottom:35}}>방문해 주셔서 감사합니다!  최희수의 포트폴리오 페이지입니다.</h3>
               
               <p>단독으로 진행한 웹/모바일을 지원하는 개발자들을 위한 기술 블로그
                 플랫폼입니다. 다수의 개발자들이 한 플랫폼에서 기술을 포스팅하고
                 공유할 수 있고, 블로그 내에서 태그별로 포스트를 볼 수 있으며,
                  키워드로 검색하고 원하는 정보를 쉽게 찾아 볼 수 있습니다. </p>
               <h4>주요 기능</h4>
               <p>
               <b>로그인 </b>(local, Oouth2), <b> 회원가입</b><br/>
               <b>글쓰기 </b>(마크다운에디터 지원, code highlight, image,embed, codepen.io 공유)<br/>
               <b>글 등록 </b>( 해시태그 설정, 썸네일 설정, 카테고리, 공개/비공개 설정)<br/>
               <b>글 설정 </b>(좋아요, 수정, 삭제, 페이스북 공유, 주소복사, 대 댓글 ), <b>해시태그 검색</b>, <b>포스트 검색</b><br/>
               <b>프로필 설정 </b>(보유 기술, 소개 글, 소셜 정보, 프로필 사진 설정)<br/>
               </p>
               <h4 style={{marginBottom:20, marginTop:20}}>사용한 기술스택</h4>
               <div style={{display:'flex'}}>
                 <div>
                   <h5>FrontEnd</h5>
                   <ul>
                     <li>React hooks</li>
                     <li>React Router v5</li>
                     <li>Redux, thunk</li>
                     <li>styled-components</li>
                   </ul>
                 </div>
                 <div style={{marginLeft:'10rem'}}>
                   <h5>BackEnd</h5>
                   <ul>
                     <li>Nodejs + Mysql</li>
                     <li>DB ORM (sequelize사용)</li>
                     <li>passport모듈을 이용한 로그인(local+Oouth)</li>
                     <li>회원가입 인증메일(nodemailer)</li>
                   </ul>
                 </div>
               </div>
               <h5>배포 및 보안</h5>
               <ul>
                 <li>aws ec2 -&gt; ubuntu운영체제 -&gt; nginx서버</li>
                 <li>aws router53 도메인 연결</li>
                 <li>aws s3 multer 프로필/포스트이미지 저장</li>
                 <li>Let’s encrypt certbot -&gt; ssl + https</li>
                 <li>암호화 설정하기 (디피 헬만 그룹, HSTS )</li>
               </ul>
               <p>테스트 계정을 통해 주요 기능을 살펴볼 수 있습니다.</p>
               <p style={{display:'inline',background:'rgba(13,72,50,.08)',color:'#008000'}}>
                 테스트 계정
                 email: '<code>test@sublog.co</code>'
                 &nbsp;&nbsp;
                 password:'<code>test</code>'
               </p>
               <p className="login" onClick={onLogin}> click" 테스트 계정으로 바로 로그인하기</p>
               <ButtonGroup>
                   <ShortMaginBtn color="white" onClick={onConfirm}>{confirmtext}</ShortMaginBtn>
               </ButtonGroup>
          </DialogBlock>
      </DarkBackground>
    </>
  )
}

Dialog.defaultProps = {
    confirmText: '확인',
    cancelText: '취소',
    visible: false
  };

export default Dialog;

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;
const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;
const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;
const DarkBackground = styled.div`
  position:fixed;
  display:flex;
  z-index:1111;
  align-items:center;
  justify-content:center;
  left:0;
  top:0;
  background-color:rgba(0, 0, 0, 0.8);
  width:100%;
  height:100%;
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  ${(props) =>
      props.disappear && css`
        animation-name: ${fadeOut};
      `
  }
`

const DialogBlock = styled.div`
  width:800px;
  height:auto;
  padding:1.8rem;
  font-family: Mapo;
  background-color:white;
  border-radius:6px;
  h3 {
      margin: 0;
      font-size: 1.5rem;
  }
  h2,h3,h4,h5 {
    font-weight:bold;
  }
  p {
    font-size: 1.125rem;
    word-break: keep-all;
  }
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  .login {
    cursor:pointer;
    color:rgb(0, 128, 0);

  }
  ${(props) =>
      props.disappear &&
      css`
        animation-name: ${slideDown};
  `}
`

const ButtonGroup = styled.div`
  margin-top:3rem;
  display:flex;
  justify-content:flex-end;
`
const ShortMaginBtn = styled(Button)`
  & + & {
      margin-left:0.5rem;
  }
`