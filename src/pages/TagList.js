import React from 'react';
import HashTagList from '../components/hashTag/HashTagList';
import ReactHelmet from '../lib/ReactHelmet';

const TagList = () => {
  return (
    <>
      <ReactHelmet
        title='sublog'
        description='개발지식을 수블로그에서 공유하고 알려주세요.'
        favicon='https://sublogs3.s3.ap-northeast-2.amazonaws.com/original/postTumnail.png'
      />
      <HashTagList />
    </>
  )
}

export default TagList;