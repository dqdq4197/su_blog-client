import React from 'react';
import MarkdownEditorjs from '../components/board/MarkdownEditorjs';
import ReactHelmet from '../lib/ReactHelmet';

const Board = () => {
  return (
    <>
      <ReactHelmet
        title={'sublog'}
        description={'개발자들을 위한 블로그 플랫폼입니다. 개발지식을 수블로그에서 공유하고 알려주세요.'}
        favicon={'https://sublogs3.s3.ap-northeast-2.amazonaws.com/original/1584262121825laptop-1483974_1280.jpg'}
      />
      <div>
        <MarkdownEditorjs />
      </div>
    </>
  )
}

export default Board;