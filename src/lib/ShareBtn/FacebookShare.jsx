import React from 'react';
import {FacebookBasicIcon} from '../Icons/SocialIcon';
import {Icon} from 'semantic-ui-react';

const FacebookShare = ({path}) => {

       const shareFunc = function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk')

  return (
    <>
      <div id="fb-root" ></div>
      {shareFunc}
      <FacebookBasicIcon />
      <div className="fb-share-button" style={{opacity:0, position:'absolute'}}
        data-href={path} 
        data-layout="button_count">
      </div>
    </>)
}

export default FacebookShare