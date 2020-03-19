import React,{useCallback, useEffect} from 'react';
import { Dropdown, Icon } from 'semantic-ui-react'
import {getLikeAPI, setLikeAPI} from '../../lib/api/CommonAPI/like';
import {useHistory,useLocation} from 'react-router-dom';
import ClipBoard from '../../lib/snackbar/ClipBoard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import FacebookShare from '../../lib/ShareBtn/FacebookShare';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import './Mmodal.css';



const DropdownTriggerExample = ({id,user,author}) => {

    const [valid, setValid] = React.useState(false);
    const [snack, setSnack] = React.useState({open:false,message:''});
    const [likeInfo, setLikeInfo] = React.useState([]);
    const history = useHistory();
    const location = useLocation();

    const trigger = (
        <span>
          <Icon name='ellipsis vertical' />
        </span>
      )
      const copyAddress = () => {
          const dummy = document.createElement("textarea");
          document.body.appendChild(dummy);
          dummy.value = window.document.location.href;
          dummy.select();
          document.execCommand("copy");
          document.body.removeChild(dummy);
          setSnack({open:true, message:'주소를 클립보드에 복사하였습니다.'});
          setValid(!valid)
        }
      
        const OpenSnack = useCallback(() => (
          snack ? <ClipBoard ok={snack.open} message={snack.message}/>: null
        ),[valid])
        useEffect(() => {
            getLike();
        },[])
        const getLike = () => {
          getLikeAPI({id,user:user.nick})
          .then((data) => {
            setLikeInfo(data.data);
            console.log(data.data)
          })
        }
      
        const onLike = () => {
          if(user) {
            setLikeAPI({id,user:user.nick})
            .then(()=> {
              getLike()
              setSnack({open:true,message:likeInfo.one ? '좋아요를 취소하였습니다.' : '이 포스트를 좋아합니다.'})
              setValid(!valid);
            })
          }else {
            setSnack({open:true,message:'로그인이 필요합니다.'})
            setValid(!valid)
          }
        }
        const OpenWith = () => {
            history.push(location.pathname);
        }
      const options = [
        {
            key: 'OpenWith',
            text: <><OpenInNewIcon /><span style={{marginLeft:'5px'}}>OpenWith</span></>,
            onClick:OpenWith
        },{ 
            key: 'Share',
            text: <><FacebookShare path={`/poster/${id}/${author}`}/><span style={{marginLeft:'5px'}}>Share</span></>,
        },{ 
            key: 'Like',
            text:  <><FavoriteIcon style={ likeInfo.one && {color:'rgb(175, 40, 40)'}}/> <span style={{marginLeft:'5px',marginRight:'3px'}}>Like</span>({( likeInfo.send && likeInfo.send.length)+'개' || 0+'개'})</>,
            onClick: onLike,
        },{ 
            key: 'Copy', 
            text: <><FileCopyIcon /> <span style={{marginLeft:'5px'}}>Copy</span> </>, 
            onClick:copyAddress 
        },
      ]
      
    return (
        <>
            <Dropdown trigger={trigger} options={options}/>
            <OpenSnack/>
        </>
        )
}

export default DropdownTriggerExample