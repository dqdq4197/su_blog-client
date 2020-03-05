import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useHistory,useLocation} from 'react-router-dom';

const options = [
    "All",
    "React",
    "Nodejs",
    "Css",
    "Graphic Design",
    "Html",
    "User Experience",
    "Javascript",
    "Angular",
    "Vue",
    "Jquery",
];

const ITEM_HEIGHT = 48;

export default function Category() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const location = useLocation();
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    if(typeof option === 'string')
        history.push(`/home/${option}`);
  };
  
  return (
    <span>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{padding:'3px',fontSize:'1rem', fontWeight:600,outline:'none'}}
      >
        카테고리<MoreVertIcon />
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
            width: 200,
          },
        }}
      >
        {options.map(option => (
          <MenuItem key={option} selected={'/'+option === location.pathname} onClick={()=>handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </span>
  );
}