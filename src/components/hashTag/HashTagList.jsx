import React from 'react';
import styled from 'styled-components';
import SearchTag from './SearchTag';
import {device} from '../../lib/MediaStyled';


const ListContainer = styled.div`
    width:1200px;
    margin:75px auto 0;
    height:100%;
    background-color:#fafbfc;
    text-align:center;
    @media ${device.laptopL} {
        width:1024px;   
    }
    @media ${device.laptop} {
        width:767px;
    }
    @media ${device.tablet} {
        width:95%;
    }
`
const HashTagList = () => {

    
    return(
        <>
            <ListContainer >   
                <SearchTag />
            </ListContainer>
        </>

    )
}

export default HashTagList;