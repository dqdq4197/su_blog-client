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
    border-radius:2px;
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

function Dialog({confirmtext,cancelText, visible ,onConfirm, onCancel}) {

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
                    <p>현재는 포트폴리오용도로 사용하고 있으며,</p>
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