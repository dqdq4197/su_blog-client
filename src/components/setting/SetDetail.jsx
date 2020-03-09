import React,{useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {Input} from '../../lib/AuthInput';
import storage from '../../lib/storage';
import SetSocial from './SetSocial';
import SetIntro from './SetInfo';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {Popup} from 'semantic-ui-react';
import {device} from '../../lib/MediaStyled';
import {getSettingAPI} from '../../lib/api/setting';
import {saveSkillAPI} from '../../lib/api/CommonAPI/setting';

const TagKeyBox = styled.div`
  display:block;
  .tagKey {
    position:relative;
    cursor:pointer;
    width:auto;
    font-size:1.08rem;
    margin:2px 0 0 5px;
    padding:5px 10px;
    font-weight:500;
    border-radius:10px;
    background-color: rgba(13,72,50,.08);
    display:inline-block;
  }
  }
`
const DetailBox = styled.div`
    .skillWrap {
        display:flex;
        @media ${device.tablet} {
            display:block;
        }
    }
    margin-top:50px;
    padding:20px;
    @media ${device.tablet} {
        padding-top:0;
        margin-top:0;
    }
    h5 {
        display:flex;
        height:40px;
        align-items:center;
        flex:2;
        margin:0;
        font-weight:bold;
        color:#4a4a4a;
    }
    .showSkill {
        .sdiv {
            width:85%
            color:#008000;
        }
        button {
            width:15%;
            border:none;
            background-color:transparent;
            font-size:1.1rem;
            
        }
        display:flex;
        align-items:center;
        color:#90A4AE;
        flex:8;
        margin-left:10px;
    }
    .petchSkill {
        flex:8;
        margin-left:10px;
        .display {
            button {
                width:15%;
                border:none;
                background-color:transparent;
                font-size:1.1rem;
                border-bottom:1px solid #008000;
            }
            display: flex;
            justify-content: space-between;
            .skillInput {
                @media ${device.tablet} {
                    font-size:.9em;
                }
                width:85%;
                margin:0;
                padding:8px;
                &:focus {
                    outline:none;
                }
            }
        }
    }
    `

const SetDetail = ({data}) => {

    

    const [skill, setSkill] = useState(data.skills ? data.skills.split(',') : null);
    const [isSetSkill, setIsSetSkill] = useState(false);

    useEffect(() => {
        getData();
    },[]);

    const getData = () => {
        getSettingAPI.get({page:data.nick});
    }
    
    const skillname= useRef();
    const onEnter = async(event) =>{
        if(event.keyCode === 13) {
          if(skillname.current.value === '' || (skill.indexOf(skillname.current.value) !== -1) ) { return skillname.current.value='';}
          console.log(skill, skillname.current.value)
          await Promise.resolve().then(() => {
            setSkill((prevState) => [...prevState, skillname.current.value])
          })
          setTimeout(function() { skillname.current.value=''; skillname.current.focus()},0);
        }else {
            return ;
        }
    };

    const onDeleteSkill = (key) => {
      const del = skill.filter((v,i) => i!==key ) 
      setSkill(del);
    };
    const onSaveSkill = () => {
        saveSkillAPI(data.nick,{skill})
        .then(() => {
            let info = storage.get('loginInfo');
            info.skills = skill.join(',')
            storage.set('loginInfo',info);
            setIsSetSkill(false);
        })
    }
    return (
        <DetailBox>
            <div className="skillWrap">
             <Popup content='사용하는 기술 스택을 추가해보세요. 프로필에 공개됩니다.' inverted trigger={<h5>기술 스택 <ContactSupportIcon/></h5>} />
                {isSetSkill ? null : <div className="showSkill">
                    <div className="sdiv"><TagKeyBox>
                        {skill===null ? '기술 스택을 추가해보세요!' : skill.map((value) => <div className="tagKey" key={value}>{value}</div>)}
                        </TagKeyBox></div>
                    <button onClick={()=> setIsSetSkill(true)} >수정</button>
                </div>}
                {isSetSkill ? <div className="petchSkill">
                    <div className="display">
                        <Input className="skillInput" name={'등록된 기술 스택은 클릭하여 제거 할 수 있습니다.'} ref={skillname} onKeyDown={e => onEnter(e)} type='text'/>
                        <button onClick={onSaveSkill}>저장</button>
                    </div>
                    <TagKeyBox >{skill.map(
                              (value,i) => 
                                <div key={i} className="tagKey" onClick={() => onDeleteSkill(i)}>
                                  {value}
                                </div>
                            )}
                    </TagKeyBox>
                </div> : null}
            </div>
            <hr/>
            <SetSocial info={data}/>
            <hr/>
            <SetIntro info={data}/>
        </DetailBox>

    )
}

export default SetDetail;