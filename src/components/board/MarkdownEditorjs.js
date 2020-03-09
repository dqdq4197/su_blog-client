import React,{useRef} from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import RawTool from '@editorjs/raw';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import Checklist from '@editorjs/checklist';
import InlineCode from '@editorjs/inline-code';
import Delimiter from "@editorjs/delimiter";
import './markdown.css';
import {useDispatch, useSelector} from 'react-redux';
import SavePosterModal from '../../lib/SavePosterModal';
import {posterOutputData} from '../../actions/posts';
import styled from 'styled-components';
import {device} from '../../lib/MediaStyled';
import {fetchFileAPI, fetchUrlAPI} from '../../lib/api/CommonAPI/markdownPosting';

const Canvas = styled.div`
  text-align:center;
  background-color:rgba(13, 72, 50, 0.08);
  max-width:100%;
  padding:100px 0 0 0;
  min-height:100vh;
  @media ${device.tablet} {
    padding-top:20px;  
  }
  .postBox {
    @media ${device.laptop} {
      max-width:750px;
    }
    max-width:850px;
    margin:0 auto;
    .postWrap {
      @media ${device.tablet} {
        border-radius:0;
        margin:0 10px;  
      }
      background-color:#fff
      margin:0 auto;
      border-radius: 8px;
      -webkit-box-shadow: 0 24px 24px -18px rgba(69,104,129,.33), 0 9px 45px 0 rgba(114,119,160,.12);
      box-shadow: 0 24px 24px -18px rgba(69,104,129,.33), 0 9px 45px 0 rgba(114,119,160,.12);
      padding: 70px 50px 30px;
      font-size: 16px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    #markdownEditor {
      
    }
  }
`



const MarkdownEditorjs = ({}) => {

  const modifyData = useSelector(state => state.posterModify)
  const dispatch = useDispatch();
  const data= useRef('');
  const editor = new EditorJS({ 
    holderId: 'markdownEditor', 
    placeholder: '여기에 작성하세요!',
    tools: {
      header: {
        class: Header, 
        inlineToolbar: ['link'], 
        config: {
          placeholder: "Enter a header"
        },
        type: {
          text: "hi",
          level:2,
        }
      }, 
      image: {
        class: ImageTool,
        config: {
          uploader: {
            /**
             * Upload file to the server and return an uploaded image data
             * @param {File} file - file selected from the device or pasted by drag-n-drop
             * @return {Promise.<{success, file: {url}}>}
             */
            uploadByFile(file){
              // your own uploading logic here
              const formdata = new FormData();
              formdata.append('image', file)
              return fetchFileAPI(formdata)
                .then((res) => {
                return {
                  success: 1,
                  file: {
                    url: `img/${res.data}` ,
                    // any other image data you want to store, such as width, height, color, extension, etc
                  }
                };
              });
            },
            uploadByUrl(url){
              // your ajax request for uploading
              return fetchUrlAPI(url)
              .then((res) => {
                return {
                  success: 1,
                  file: {
                    url: res.data,
                    // any other image data you want to store, such as width, height, color, extension, etc
                  }
                }
              })
            }
          }
        }
      },
      list: { 
        class: List, 
        inlineToolbar: true, 
      },
      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
      },
      delimiter: Delimiter,
      checklist :{
        class: Checklist,
        inlineToolbar: true,
      },
      raw: RawTool,
      embed: {
        class: Embed,
        inlineToolbar:true,
        config: {
          services: {
            youtube: true,
            coub: true,
            codepen: {
              regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
              embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
              html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
              height: 300,
              width: 600,
              id: (groups) => groups.join('/embed/')
            }
          }
        }
      }      
  },
   data: modifyData.posterModifyData.content,
  onReady: () => {
   var elements = document.querySelectorAll('.codex-editor');
    if(elements[1]) elements[1].style.display="none";
 },
  onChange: () => {
    editor.save().then((outputData) => {
      data.current=outputData;
    }).catch((error) => {
      console.log('Saving failed: ', error.response)
    });
  }
})
const outData = () => {
  if(!data.current && modifyData) {
    dispatch(posterOutputData(modifyData.posterModifyData.content));
  }else {
    dispatch(posterOutputData(data.current));
  }
}

  return (
    <Canvas>
      <div className="postBox">
        <div className="postWrap">
        <div id="markdownEditor"></div>
          <SavePosterModal modifydata={modifyData.posterModifyData} posterId={modifyData.posterId} onClick={outData}/>
        </div>
      </div>
      
    </Canvas>
  )
}

export default MarkdownEditorjs;