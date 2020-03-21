import React,{useCallback, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useHistory,useLocation} from 'react-router-dom';
import ClipBoard from '../../lib/snackbar/ClipBoard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import FacebookShare from '../../lib/ShareBtn/FacebookShare';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {getLikeAPI, setLikeAPI} from '../../lib/api/CommonAPI/like';
const options = [
    "OpenWith",
    "Share",
    "Like",
    "Copy",
];

const ITEM_HEIGHT = 48;

export default function Category({id,author, user}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [valid, setValid] = React.useState(false);
  const [snack, setSnack] = React.useState({open:false,message:''});
  const [likeInfo, setLikeInfo] = React.useState([]);
  const location = useLocation();
  const open = Boolean(anchorEl);
  const history = useHistory();

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
    getLikeAPI({id,user:user? user.nick : null})
    .then((data) => {
      setLikeInfo(data.data);
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
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    if(option === 'Copy') {
        copyAddress();
    } else if (option === 'OpenWith') {
        history.push(location.pathname)
    } else if (option === 'Like') {
        onLike();
    }
  };
  
  return (
    <span>
    <OpenSnack/>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{padding:'3px',fontSize:'1rem', fontWeight:600,outline:'none'}}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 120,
            zIndex:10000,
          },
        }}
      >
        {options.map((option,i) => (
          <MenuItem key={option} onClick={()=>handleClose(option)}>
              {i===0 ? <><OpenInNewIcon/> <span style={{marginLeft:'5px'}}>{option}</span></> : null}
              {i===1 ? <><FacebookShare path={`/poster/${id}/${author}`}/> <span style={{marginLeft:'5px'}}>{option}</span> </>: null}
              {i===2 ? <><FavoriteIcon style={ likeInfo.one && {color:'rgb(175, 40, 40)'}}/> <span style={{marginLeft:'5px',marginRight:'3px'}}>{option}</span>({( likeInfo.send && likeInfo.send.length)+'개' || 0+'개'})</>: null}
              {i===3 ? <><FileCopyIcon /> <span style={{marginLeft:'5px'}}>{option}</span> </>: null}
          </MenuItem>
        ))}
      </Menu>
    </span>
  );
}