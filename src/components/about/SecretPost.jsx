import React,{useEffect} from 'react'
import postTumnail from '../../lib/basicTumnail/postTumnail.png';
import ProfilePoster from './ProfilePoster';

const SecretPost = ({data}) => {
  const a = data.filter((a) => a.isHide)

  return (
    <>
      <ProfilePoster data={a} />
    </>
  )
}

export default SecretPost;