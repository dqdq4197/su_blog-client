import React from 'react'
import { Dropdown, Image } from 'semantic-ui-react'
import {posterModifyData} from '../../actions/posterModify';
import { logoutRequest } from '../../actions/authentication';
import { useDispatch} from 'react-redux';
import storage from '../../lib/storage';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {device} from '../../lib/MediaStyled';
import basic from '../../lib/basicTumnail/basic.png';

const ProfileBox = styled.span`
  font-size:1.1rem;
  .ui.avatar.image {
    width:35px;
    height:35px;
  }
  @media ${device.laptop} {
    font-size:1rem;
    .ui.avatar.image {
      width:28px;
      height:28px;
    }
  }
`
const ProfileFaker = ({info}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    
    const trigger = (
        <ProfileBox>
          <Image avatar src={info.profile_img ==='basic.png' ? basic : 'img/' + info.profile_img} /> {info.nick}
        </ProfileBox>
    )

    const goAbout =() => {
        history.push(`/about/@${info.nick}`);
    }
    
    const goSetting = () =>(
      history.push('/setting')
    )
    
    const onclicklogout = async(e) => {
        e.preventDefault();
        dispatch(logoutRequest()).then(
            () => {
            storage.remove('loginInfo');
            history.push('/');
          } 
          )
        }
        
    const resetState = () => {
        dispatch(posterModifyData('',''));
        history.push('/postting')
    }
    
    const options = [
      { key: 'write', text: '글쓰기', icon: 'write', onClick:resetState },
      { key: 'user', text: '내 정보', icon: 'user', onClick:goAbout},
      { key: 'settings', text: '설정', icon: 'settings', onClick:goSetting},
      { key: 'sign-out', text: '로그아웃', icon: 'sign out', onClick:onclicklogout },
    ]
        
    return(
        <Dropdown
          trigger={trigger}
          options={options}
          pointing='top left'
          icon={null}
        />
  )
}

export default ProfileFaker;