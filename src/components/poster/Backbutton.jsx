import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { device } from '../../lib/MediaStyled';
import { Icon } from 'semantic-ui-react';

const Backbutton = () => {
  const history = useHistory();
  const onBack = () => {
      history.go(-1);
  }
  return (
    <>
      <BackWrap ><div className="btn" onClick={onBack}><Icon name="angle left"/>뒤로</div></BackWrap>
    </>
  )
}

export default Backbutton;

const BackWrap = styled.div`
  position:fixed;
  display:none;
  z-index:1;
  width:100%;
  background-color:white;
  border-bottom:1px solid #e9e7e7;
  display:none;
  height:60px;
  align-items:center;
  @media ${device.laptop} {
      display:flex;
  }
  @media ${device.mobileL} {
      height:50px;
  }
  .btn {
      @media ${device.mobileL} {
          font-size:1.25rem;
      }
      color:#99aab5;
      font-weight:600;
      font-size:1.5rem;
      display:inline;
      cursor:pointer;
  }
`