import React from 'react';
import SetImage from './SetImage';
import storage from '../../lib/storage';
import styled from 'styled-components';
import SetDetail from './SetDetail';
import {device} from '../../lib/MediaStyled';

const SetWrap = () => {
  const userInfo = storage.get('loginInfo');
  
  return (
    <ProfBox>
      <SetImage data={userInfo} />
      <SetDetail data={userInfo}/>    
    </ProfBox>
  )
}

export default SetWrap;

const ProfBox = styled.div`
  width:800px;
  padding:10px;
  padding-top:60px;
  margin:50px auto 0;
  @media ${device.tablet} {
    width:100%;
    padding:30px 3px 3px 3px;
  }
` 