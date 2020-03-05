import React from 'react';
import OneTagPoster from '../components/hashTag/OneTagPoster';

const OneTag = ({match}) => {

      
    return (
        <>
          <OneTagPoster tag={match.params.tag} />
        </>
    )
}

export default OneTag;