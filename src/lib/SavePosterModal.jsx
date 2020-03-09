import React, {useState, useRef} from 'react';
import { Button, Image, Modal, Icon, Dropdown} from 'semantic-ui-react';
import './modal.css';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import PostTumnail from '../lib/basicTumnail/postTumnail.png';
import {Input} from './AuthInput';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import SelectInput from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {postTumnailSaveAPI,postModifyAPI,uploadPostAPI} from '../lib/api/CommonAPI/post';
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));

const TagsBox = styled.div`
  position:relative;
  border-radius:6px;
  border:1px solid rgba(0,0,0,.8);
  height:30px;
  width:150px;
  bottom:30%;
  overflow:hidden;
  #tagBox {
    border:none;
    width:110px;
    margin-left:12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &:focus {
      outline:none;
    }
  }

  .plusBtn {
    position:absolute;
    right:5px;
    background-color:transparent;
    top:50%;
      transform: translateY(-50%);
    &:before{
      position:absolute
      left: 0px;
      top: -50%;
      transform: translateY(25%);
      cursor:pointer;
    }
  }

`

const TagKeyBox = styled.div`
  display:inline;
  .toggle {
    left:100%;
  }
  .tagKey {
    position:relative;
    cursor:pointer;
    top:-25px;
    width:auto;
    font-size:.88rem;
    margin:2px 0 0 5px;
    padding:5px 10px;
    font-weight:500;
    border-radius:10px;
    background-color: rgba(13,72,50,.08);
    display:inline-block;
  }
  .deleteIcon {
    position:absolute;
    right : 0px;
    display:inline;

  }
`
const UploadBtn = styled.div`
  position: relative;
  text-align:center;
  border-radius: 15px;
  margin-top:10px;
  border: 1px solid rgba(0,0,0,.8);
  width: 75px;
  height: 22px;
  font-size: .9rem;
  &:hover {
    border:1px solid rgba(94, 38, 224, 0.671);
    color:rgba(94, 38, 224, 0.671);
    .picture{
      color:black;
    }
  }
  #upFile {
    display:none;
  }
  label {
    height: 22px;
    width: 75px;
    top: 50%;
    position: relative;
    transform: translateY(-50%);
    padding-top:5%;
    cursor:pointer;
  }
`

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'graphic design', text: 'Graphic Design', value: 'graphic design' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'nodejs', text: 'NodeJS', value: 'nodejs' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'ui design', text: 'UI Design', value: 'ui design' },
  { key: 'user experience', text: 'User Experience', value: 'user experience' },
  { key: 'vue', text: 'Vue', value: 'vue' },
  { key: 'jquery', text: 'Jquery', value: 'jquery' },
];

const SavePosterModal = ({onClick, posterId, modifydata}) => {

  const classes = useStyles();
  const {result} = useSelector(state => state.authentication);
  const {posterOutputData} = useSelector(state => state.posts)
  const [open,setOpen] = useState(false);
  const [dimmer, setDimmer] = useState(null);
  const [tags, setTags] = useState([]);
  const [scope, setScope] = useState('');
  const [imgUrl, setImgUrl] = useState(PostTumnail);
  const [tumnailPosterInfo, setTumnailPosterInfo] = useState(
      [{
        title: '',
        imgUrl:PostTumnail,
        tags:'',
        skills:'',
      }]
  )
  const history = useHistory();
  const tagnames= useRef();
  const titleRef = useRef();
  const show = (dimmer) => () => {
    
    onClick();
    setDimmer(dimmer);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };
  const onChangeTitle = (event) => {
    setTumnailPosterInfo(state => ({...state, title:titleRef.current.value}));
  }

  const onEnter = async(event) =>{
    if(event.keyCode === 13) {
      if(tagnames.current.value === '' || (tags.indexOf(tagnames.current.value) !== -1) ) { return tagnames.current.value='';}
      console.log(tags, tagnames.current.value)
      await Promise.resolve().then(() => {
        setTags((prevState) => [...prevState, tagnames.current.value])
      })
      setTumnailPosterInfo(state=> ({...state, tags:[...tags,tagnames.current.value]}))
      setTimeout(function() { tagnames.current.value=''; tagnames.current.focus()},0);
    }else {
        return ;
    }
  };

  const onDeleteTag = (key) => {
    const del = tags.filter((v,i) => i!==key ) 
    setTags(del);
    setTumnailPosterInfo(state=> ({...state, tags:[...tags,tagnames.current.value]}))
      console.log(tumnailPosterInfo);
  };

  const getSKills = (event,{value}) => {
    setTumnailPosterInfo(state=> ({...state, skills: value.join(',')}));
}

  const onTumnail = async(e) => {
    const formdata = new FormData();
    formdata.append('poster', e.target.files[0]);
    console.log(e.target.files[0]);
    postTumnailSaveAPI(formdata)
    .then((res) => {
      setImgUrl(res.data);
      setTumnailPosterInfo(state=> ({...state, imgUrl: res.data}));
    }).catch((err) => {
      console.log(err.res);
    })
  }; 
  
  const onClickSave = () => {
    if(tumnailPosterInfo.title === "" || tumnailPosterInfo.title === undefined) {
       return alert('포스트 제목을 입력해주세요')
    }else if(tumnailPosterInfo.skills === "" || tumnailPosterInfo.skills=== undefined ) {
      return alert('카테고리를 선택해주세요.')
    }else if(scope === ''){
      return alert('공개 범위를 선택해주세요');
    }else if(posterOutputData === undefined) {
      return alert('포스트 내용이 없습니다.');
    }else {
      const userId= result.id;
      const nick = result.nick;
      console.log(posterOutputData)
      console.log(tumnailPosterInfo);
      if(posterId) {
        postModifyAPI({posterId,userId,nick,posterOutputData,tumnailPosterInfo,scope})
        .then((res) => {
            alert('수정 완료');
            history.push(`/poster/${posterId}/${nick}`)
          }).catch((error) => {
            console.log(error.response)
          })
        }else {
        uploadPostAPI({userId,nick,posterOutputData,tumnailPosterInfo,scope})
          .then((res) => {
            alert('저장 완료');
            history.push(`/poster/${res.data.postId}/${res.data.nick}`)
            console.log(res.data);
          }).catch((error) => {
            console.log(error.response)
          });
      }

    }
  }
  const handleChange =(e) => {
    setScope(e.target.value)
  }

  const Scope = () => (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">공개범위</InputLabel>
        <Select native  value={scope} input={<SelectInput id="grouped-native-select" />} onChange={handleChange}>
            <option value="" />
            <option value={false}>전체공개</option>
            <option value={true}>나만보기</option>
        </Select>
      </FormControl>
  )
    return (
      <>
        <Button onClick={show("blurring")}>저장하기</Button>
        <Button>임시저장</Button>
        <Modal dimmer={dimmer} open={open} onClose={close}>
          <Modal.Header>포스트 썸네일 설정<Scope /></Modal.Header>
          <Modal.Content image>
            <div style={{textAlign:'center',postion:'relative'}}>
              <Image
                wrapped
                size='medium'
                src={imgUrl ===PostTumnail ? imgUrl : 'img/' +imgUrl}
              />
              <div style={{height:'22px'}}>
                <UploadBtn>
                  <label htmlFor="upFile">Upload</label>
                  <input type="file" onChange={onTumnail} name="poster" id="upFile" accept="image/*"></input>
                </UploadBtn>
              </div>
            </div>
            <Modal.Description style={{position:'relative'}}>
              <Input type="text" style={{margin:0, fontSize:'1.1rem', padding:'10px'}}
              id="editTitle" width="310px" name=" 포스트 제목을 입력해주세요." ref={titleRef} onChange={onChangeTitle}/>

              <Dropdown placeholder='카테고리를 선택해주세요.' fluid multiple selection scrolling onChange={getSKills} options={options} />
              <div className="tagBox" style={{position:'absolute',height:'100px'}}>
                <TagsBox>
                  <Icon className="tag_icon" name='tags' />
                  <input id="tagBox" type="text" ref={tagnames} onKeyDown={e => onEnter(e)} placeholder=" Enter tags" ></input>
                </TagsBox>
                <TagKeyBox >{tags.map(
                              (value,i) => 
                                <div key={i} className="tagKey" onClick={() => onDeleteTag(i)}>
                                  {value}
                                </div>
                            )}
                </TagKeyBox>
                
              </div>
            </Modal.Description>
          </Modal.Content>
          
          <Modal.Actions>
            
            <Button color='black' onClick={close}>
              취소
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="저장"
              onClick={onClickSave}
              className="saveBtn"
            />
          </Modal.Actions>
        </Modal>
        </>
    )
}

export default SavePosterModal;