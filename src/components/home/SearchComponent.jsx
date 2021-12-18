import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from "../../lib/AuthInput";

const SearchComponent = () => {
    const [keyWord, setKeyWord] = useState('');
    const history = useHistory();

    const onChangeKeyWord = (e) => {
        setKeyWord(e.target.value);
    }

    const onEnter = (event) => {
        if(event.keyCode === 13) {
            history.push(`/search?key=${keyWord}`)
        }
    }

    return (
        <>
            <Input width={'100%'} style={{height:40, marginLeft:0}} name="search" onKeyDown={onEnter} onChange={onChangeKeyWord} value={keyWord}/>
        </>
    );
}

export default SearchComponent;