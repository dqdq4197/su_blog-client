import React, {useRef ,useEffect, useState} from 'react';
import styled from 'styled-components';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import './atom-light-theme.css';
require('codemirror/mode/markdown/markdown');

const MarkdownContainer = styled.div`
       
       padding : 2.5rem;
       flex:1;
       width:100%;
       height:100%;
       min-width:0;
       text-align:left;
       .wrapper {
           height:100%;
           text-align:'left';
       }
       .CodeMirror-wrap {
        font-size: 1.1rem;
           height:100%;
            .cm-header {
                line-height: 1.8;
            }
           .cm-header-1 {
                font-size: 2.25rem;
           }
           .cm-header-2 {
                font-size: 1.9rem;
           }
           .cm-header-3 {
                font-size: 1.6rem;
           }
           .cm-header-4 {
                font-size: 1.3rem;
           }
           .cm-header-5 {
                font-size: 1.10rem;
           }
       }
       
    ` ;

const MarkdownEditor = () => {
    const [asd, setAsd] = useState('');
      
    const mainEditor = useRef();

    useEffect(() => {
        if(!mainEditor.current) return;
        const editor = CodeMirror.fromTextArea(mainEditor.current, {
            lineWrapping: true,
            theme:'one-light',
            mode:'markdown',
            placeholder:'여기에 작성해주세요',
        });
    },[])
    
    

    return (
        <MarkdownContainer>
            <div className="wrapper">
                <textarea ref={mainEditor}/>
            </div>
        </MarkdownContainer>
    );
}

export default MarkdownEditor;