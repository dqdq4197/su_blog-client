import React from 'react';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';

const ScrollupBtn = styled.div`
  position:fixed;
  width:45px;
  height:45px;
  border-radius:45px;
  border:2px solid #e9e7e7;
  right:20%;
  bottom:50px;
  font-size:2rem;
  color:#6c757d;
  font-weight:200;
  transition:.3s;
  &:hover {
    color:rgba(13,72,50,.8);
    border-color:rgba(13,72,50,.5);
  }
  i {
    left:4%;
    position: relative;
    top: -10%;
  }
`
const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

const ScrollTopBtn = () => (
        <>
          <ScrollupBtn height={window.innerHeight} onClick={scrollup}><Icon name="chevron up"/></ScrollupBtn>
        </>  
)


export default ScrollTopBtn;