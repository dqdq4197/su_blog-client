import React from 'react';
import OneTagPoster from '../components/hashTag/OneTagPoster';
import ReactHelmet from '../lib/ReactHelmet';

const OneTag = ({match}) => {

      
    return (
        <>
          <ReactHelmet
            title={'sublog'}
            description={'개발지식을 수블로그에서 공유하고 알려주세요.'}
            favicon='https://sublogs3.s3.ap-northeast-2.amazonaws.com/original/postTumnail.png'
            />
          <OneTagPoster tag={match.params.tag} />
        </>
    )
}

export default OneTag;