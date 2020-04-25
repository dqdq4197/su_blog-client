import * as React from 'react';
import {useState,useEffect} from 'react';
import styled, { keyframes, css } from 'styled-components';
import {Button} from '../../lib/AuthInput';

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
    padding:1.5rem;
    background-color:white;
    border-radius:6px;
    h3 {
        margin: 0;
        font-size: 1.5rem;
    }
    p {
      font-size: 1.125rem;
    }
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;

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

function Dialog({confirmtext, visible ,onConfirm}) {

    const [animate, setAnimate] = useState(false);
    const [localVisible, setLocalVisible] = useState(false);
    
    useEffect(() => {
    // visible 값이 true -> false 가 되는 것을 감지
        if (localVisible && !visible) {
          setAnimate(true);
          setTimeout(() => setAnimate(false), 250);
        }
        setLocalVisible(visible);
    }, [localVisible, visible]);
    
  if (!animate && !localVisible) return null;
    return (
        <>
           <DarkBackground disappear={!visible}>
               <DialogBlock disappear={!visible}>
                    <h3>방문해 주셔서 감사합니다. 최희수의 포트폴리오페이지입니다.</h3>
                    
                    <h4>개요</h4>
                    <p>단독으로 진행한 웹/모바일을 지원하는 개발자들을 위한 기술 블로그
                      플랫폼입니다. 다수의 개발자들이 한 플랫폼에서 기술을 포스팅하고
                      공유할 수 있고, 블로그 내에서 태그별로 포스트를 볼 수 있으며,
                       키워드로 검색하고 원하는 정보를 쉽게 찾아 볼 수 있습니다. </p>
                    <h4>주요 기능</h4>
                    <p>
                      
                    </p>
                    <h4>사용한 기술스택</h4>
                    <h5>FrontEnd</h5>
                    <ul>
                      <li>React hooks</li>
                      <li>React Router v5</li>
                      <li>Redux, thunk</li>
                    </ul>
                    <h5>BackEnd</h5>
                    <ul>
                      <li>Nodejs + Mysql</li>
                      <li>DB ORM (sequelize사용)</li>
                      <li>passport모듈을 이용한 로그인(local+Oouth)</li>
                      <li>회원가입 인증메일(nodemailer)</li>
                    </ul>
                    <h5>배포 및 보안</h5>
                    <ul>
                      <li>aws ec2 -> ubuntu운영체제 -> nginx서버</li>
                      <li>aws router53 도메인 연결</li>
                      <li>aws s3 multer 프로필/포스트이미지 저장</li>
                      <li>Let’s encrypt certbot -> ssl + https</li>
                      <li>암호화 설정하기 (디피 헬만 그룹, HSTS )</li>
                    </ul>
                    <p></p>
                    테스트용 계정
                    email: 'test@sublog.co'
                    password:'test'
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