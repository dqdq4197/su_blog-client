import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components';

const Btn = styled.div`
  display:inline;
  .ui.animated.button.button{
    background-color:transparent;
    color:rgba(13, 72, 50,.8);
    border:2px solid rgba(13, 72, 50,.8);
  }
`
const HomeButton = () => (

  
  <Btn>
    <Button animated className="button">
      <Button.Content visible>그냥 둘러보기</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
  </Btn>
)

export default HomeButton
