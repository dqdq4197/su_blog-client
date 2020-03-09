import React,{useState, useEffect, useRef, useCallback} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import styled from 'styled-components';
import {Input} from '../lib/AuthInput';
import {useHistory} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';
import {device} from '../lib/MediaStyled';
import {getSearchAPI} from '../lib/api/home';

const SearchBox = styled.div`
    width:1200px;
    height:100vh;
    text-align:center;
    padding-top:60px;
    margin:0 auto;
    @media ${device.laptopL} {
        width:1024px;
    }
    @media ${device.laptop} {
        width:100%;
    }
    .searchInput {
        width:900px;
        margin:0 0 5px 0;
        @media ${device.laptopL} {
            width:700px
        }
        @media ${device.laptopL} {
            width:90%;
        }
    }
    .numposter {
        font-size:1.2rem;
        width:900px
        @media ${device.laptopL} {
            width:700px
        }
        @media ${device.laptopL} {
            width:90%;
        }
        @media ${device.mobileL} {
            font-size:1.05rem;
        }
        margin:0 auto;
        text-align:right;
        color:#90A4AE;
        b {
            color:rgb(100, 100, 100);
        }
    }
    .explanation {
        display:inherit;
        width:1200px;
        margin:50px auto 0;
        font-size:.9rem;
        color:#90A4AE;
        @media ${device.laptopL} {
            width:1024px
        }
        @media ${device.laptopL} {
            width:100%;
        }
        @media ${device.tablet} {
            margin-top:25px;
        }
        p {
            width:900px;
            text-align:left;
            margin:0 auto;
            padding-left:10px;
            @media ${device.laptopL} {
                width:700px
            }
            @media ${device.laptopL} {
                width:90%;
            }
        }
    }
    
`
const FeedBox = styled.div`
    position:relative;
    margin:0 auto 1px;
    text-align:left;
    width:900px;
    @media ${device.laptopL} {
        width:700px
    }
    @media ${device.laptopL} {
        width:90%;
    }
    padding:10px;
    color:black;
    .profile_box {
        display:flex;
        .profile_pic {
            width:30px;
            height:30px;
            margin-right:5px;
            background:url(${props =>'img/'+ props.img});
            background-size:cover;
            background-position:center center;
            border-radius:30px;
        }
    }
    .poster_title {
        font-size:1.8rem;
        font-weight:600;
        margin-left:1%;
        cursor:pointer;
        word-break:break-all;
        @media ${device.mobileL} {
            font-size:1.6rem;
        }
    }
    .poster_preview {
        display:flex;
        @media ${device.tablet} {
            display:block;
        }
        .poster_tumnail {
            width:230px;
            margin-right:2%;
            @media ${device.tablet} {
                width:100%;
            }
            img {
                width:100%;
            }
            
        }
        .poster_content {
            flex:3;
            p {
                display: -webkit-box; display: -webkit-box; display: -ms-flexbox;
                max-height:100px; 
                overflow:hidden; 
                vertical-align:top; 
                text-overflow: ellipsis;
                font-size:1.1rem;
                line-height:150%;
                word-break:break-all;
                 -webkit-box-orient:vertical; 
                 -webkit-line-clamp:4;
                font-weight:500;
                color:rgb(83, 79, 79);
                @media ${device.mobileL} {
                    font-size:1rem;
                }
            }
        }
        }
    }
    
`
const Search = ({location}) => {

    
    const query = queryString.parse(location.search)
    const [keyWord, setKeyWord] = useState(query.key);
    const [posts, setPosts] = useState('');
    const inputFocus = useRef();
    const numPoster = useRef();
    const history = useHistory();

    useEffect(() => {
        inputFocus.current.focus();
        getData();
    },[])
    const getData = () => {
        getSearchAPI.get({history}).then((res) => {
            setPosts(res.data);
        })
    }

    const onchangeValue = (e) => {
        setKeyWord(e.target.value);
    }

    const searchComponent = useCallback((data) => {
        if(keyWord === '') {data = []; numPoster.current=0;}
        else {
        data = data.filter((search) => { 
            return search.content.blocks.map((text) => {
                switch( text.type ) {
                    case 'paragraph': case 'header':
                        return text.data.text.indexOf(keyWord.toLowerCase()) >-1
                        break;
                    case 'list':
                        return text.data.items.map((item) => item.indexOf(keyWord.toLowerCase()) >-1).find(ele => ele > 0)
                        break;
                    case 'checklist':
                        return text.data.items.map((item) => item.text.indexOf(keyWord.toLowerCase()) >-1).find(ele => ele > 0)
                        break;
                    default:
                        return false;
                };
            }  ).find(element => element > 0 ) > 0
        })} 
        numPoster.current = data.length
        return data.map((search) => {
        return (
            <FeedBox  key={search.id} url={search.tumnailImg} img={search.user.profile_img}>
            <hr/>
                
                <div className="profile_box">
                    <div className="profile_pic"></div><div className='profile_author'>{search.author}</div>
                </div>
                <div className='poster_title' onClick={()=>{history.push(`/poster/${search.id}/${null}`)}}>{search.tumnailTitle}</div>
                <div className='poster_preview'>
                    {search.tumnailImg ? <div className="poster_tumnail"><img src={'img/' + search.tumnailImg} /></div> : null}
                    <div className='poster_content'>
                    <p>{ search.content.blocks.map((block) => {
                            switch (block.type) {
                                case 'header': case 'paragraph':
                                    return block.data.text.replace(/&nbsp;|<b>|<br>|<i>|<\/i>|<\/b>/g,'').replace(/&gt;/g,'<').replace(/&lt;/g,'>') ;
                                case 'list' :
                                    return block.data.items.map(item => item.replace(/&nbsp;|<b>|<br>|<i>|<\/i>|<\/b>/g,'').replace(/&gt;/g,'<').replace(/&lt;/g,'>'));
                                default :
                                    return false;
                            };
                        })}
                        </p>
                        <Icon name='comment outline'/>{search.comments.length}개의 댓글
                    </div>
                </div>
                
            </FeedBox>
            )
        })
    },[keyWord]);
    const Detail = useCallback(() => {
        return (
            <h4 className='numposter'>
                <b>{numPoster.current}</b>개의 포스트
            </h4>)
    },[numPoster])
    
    return (
        <>
            <SearchBox >
            <div className="explanation"><p>KeyWord로 검색해보세요! 원하는 정보를 더 쉽고 빠르게 찾을 수 있습니다. 해당 KeyWord는 포스트의 제목 또는 내용에 매치됩니다.</p></div>
                <Input className="searchInput" ref={inputFocus} name={'# 키워드를 입력해주세요'} onChange={onchangeValue} value={keyWord} />
                <Detail />
                <div>
                {posts ? searchComponent(posts) : null}
                </div>
            </SearchBox>
        </>
    )
}

export default Search;