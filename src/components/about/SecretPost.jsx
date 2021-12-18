import React from 'react'
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