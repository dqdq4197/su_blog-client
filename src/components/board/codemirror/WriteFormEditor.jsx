import React from 'react';
import styled from 'styled-components';

import MarkdownEditor from './MarkdownEditor';
import MirrorEditor from './MirrorEditor';




const WriteFormEditor = () => {

    const WriteFormContainer = styled.div`
    width:100%;
    height:100%;
    display:flex;
    background-color:'black'
`;

    return (
        <WriteFormContainer>
            <MarkdownEditor />
            <MirrorEditor />
        </WriteFormContainer>
    )
}

export default WriteFormEditor;