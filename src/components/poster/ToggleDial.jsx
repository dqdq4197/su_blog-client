import React,{useCallback, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import PrintIcon from '@material-ui/icons/Print';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import FacebookShare from '../../lib/ShareBtn/FacebookShare';
import ClipBoard from '../../lib/snackbar/ClipBoard';
import {useHistory,useLocation} from 'react-router-dom';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {getLikeAPI, setLikeAPI} from '../../lib/api/CommonAPI/like';



export default function ToggleDial({id,author,user, width , left}) {

  const useStyles = makeStyles(theme => ({
    root: {
      width,
      left,
      height: 100,
      
      transform: 'translateZ(0px)',
      flexGrow: 1,
      position:'fixed',
      zIndex:100,
      bottom:0,
    },
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [snack, setSnack] = React.useState({open:false,message:''});
  const [valid, setValid] = React.useState(false);
  const [likeInfo, setLikeInfo] = useState([]);
  const history = useHistory();
  const location = useLocation();

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
  useEffect(() => {
    getLike();
  },[])
  const movePoster = () => {
    history.push(location.pathname)
  }
  
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
  const actions = [
    { icon: <FileCopyIcon/>, name: 'Copy', onclick:copyAddress },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <FacebookShare path={`/poster/${id}/${author}`}/>, name: 'Share' },
    { icon: <FavoriteIcon style={likeInfo.one && {color:'rgb(175, 40, 40)'}}/>, name: `like ${likeInfo.send && likeInfo.send.length}개`, onclick:onLike },
    { icon: <OpenInNewIcon />, name: 'openPoster', onclick:movePoster },
  ];
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const OpenSnack = useCallback(() => (
    snack ? <ClipBoard ok={snack.open} message={snack.message}/>: null
  ),[valid])

  return (
    <div className={classes.root}>
      <OpenSnack />
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onclick}
          />
        ))}
      </SpeedDial>
    </div>
  );
}