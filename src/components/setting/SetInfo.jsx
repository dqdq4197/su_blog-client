import React, {useState} from 'react' ;
import styled from 'styled-components';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import storage from '../../lib/storage';
import {device} from '../../lib/MediaStyled';
import {setIntroAPI} from '../../lib/api/CommonAPI/setting';

const IntroBox = styled.div`
    display:flex;
    @media ${device.tablet} {
        display:block;
    }
    button {
        width:15%;
        border:none;
        background-color:transparent;
        height:30px;
        font-size:1.1rem;
        @media ${device.mobileL} {
            width:18%;
        }
    }
    h5 {
        flex:1;
    }
    .showArea {
        display: flex;
        cursor:pointer;
        height:70px;
        flex:9;
        font-size:15px;
        margin-left:10px;
        color:#5d5d5d;
        border-radius:.5em;
        padding:10px;
        &:hover {
            background-color:rgba(0,0,0,0.03);
        }
        .showBox {
            width:85%;
            
            
        }
    }
    .area {
        flex:9;
        display:flex;
        margin-left:10px;
        
        .textarea {
            width:85%;
            color: palevioletred;
            border:2px solid white;
            border-radius: 10px;
            &:focus { outline:none;background-color: white; border : 2px solid rgba(13, 72, 50,.3) }
            &:hover { background-color: white; border : 2px solid rgba(13, 72, 50,.3)}
            background-color:rgba(13, 72, 50,.08);
            transition: border .6s;
            padding:8px;
            font-size:1.1rem;
        }
        
        
    }
`
const SetIntro = ({info}) => {

    const [isSelect, setIsSelect] = useState(false);
    const [value, setValue] = useState(info.intro || '');

    const changeValue = (e) => {
        setValue(e.target.value);
    }

    const saveIntro = () => {
        setIntroAPI(info.id,{value})
        .then((res) => {
            const data = storage.get('loginInfo');
            data.intro = res.data;
            storage.set('loginInfo', data);
            setIsSelect(false)
        })
    }
    return (
        <IntroBox>
            <h5>소개글</h5>
            {isSelect ? 
            <div className="area">
                <TextareaAutosize className="textarea" onChange={changeValue} value={value} aria-label="minimum height" rowsMin={2} placeholder="간단한 소개글을 남겨주세요!" />
                <button onClick={saveIntro}>저장</button>
            </div> :
            <div onClick={()=> setIsSelect(true)} className="showArea">
                <div className="showBox">
                    {value}
                </div>
                <button>수정</button>
                
            </div> }
        </IntroBox>
    )
}

export default SetIntro;