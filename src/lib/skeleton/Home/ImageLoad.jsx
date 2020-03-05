import React from 'react';
import { Loader} from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 0.04);
`
 const ImageLoad = () => (
    <Container >
        <Loader active inline='centered' />
    </Container>
)

export default ImageLoad ;