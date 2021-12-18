import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
    return (
        <Container>
            <div className="wrap">
                Not Found! 404!
            </div>
        </Container>
    )
}

export default NotFound;

const Container = styled.div`
    width:100%;
    padding:60px;
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh;
    .wrap {
        display:inline;
        height:100%;
        font-size:4rem;
        width:600px;
    }
`