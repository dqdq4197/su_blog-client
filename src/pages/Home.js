import React,{useEffect ,useState, useRef,useMemo} from 'react';
import styled from 'styled-components';
import Feed from '../components/home/Feed';
import SearchComponent from '../components/home/SearchComponent';
import {home_load_request, home_load_success, home_more_request, home_more_success} from '../actions/home';
import {device} from '../lib/MediaStyled';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import HashTags from '../components/home/HashTags';
import Category from '../components/home/Category';
import {homeAPI} from '../lib/api/home';
import DeskTop from '../lib/skeleton/Home/DeskTop';
import LaptopL from '../lib/skeleton/Home/LaptopL';
import SearchIcon from '@material-ui/icons/Search';
import DialogBtn from '../components/Common/DialogBtn';
import ReactHelmet from '../lib/ReactHelmet';
import axios from 'axios';

const Content = styled.div`

    width:100%;
    height:auto;
    background-color:#fafbfc;
    margin-top:60px;
    .laptopL {
        display:none;
        @media ${device.laptopL} {
            display:block;
        }
    }
    .desktop {
        @media ${device.laptopL} {
            display:none;
        }
    }
    .topBar {
        background-color:rgb(239,242,246);
        height:50px;
        border-radius:4px;
        display:none;
        align-items:center;
        justify-content: space-between;
        width:100%;
    
        @media ${device.laptop} {
            display:flex;
        }
        .mTags {
            display:flex;
            align-items:center;
            justify-content:center;
            height:100%;
            font-size:1rem;
            color:rgba(0, 0, 0, 0.54);
            cursor:pointer;
            border-radius:5px;
            &:hover {
                path {
                    color:black;
                }
            }
            margin-top:5px;
            padding:8px;
            margin-right:5px;
            font-weight:600;
            border-radius:
            &:hover {
                background-color:rgba(0, 0, 0, 0.04);
                
            }
            @media ${device.mobileL} {
                padding:6px;
            }
            
        }
        .mCategories {
            display:none;
            height:100%;
            border-radius:5px;
            align-items:center;
            justify-content:center;
            padding:8px;
            margin-right:5px;
            @media ${device.tablet} {
                display:flex;
            }
            @media ${device.mobileL} {
                padding:3px;
            }
        }
    }
    .categorieswrapper {
        position:relative;
        @media ${device.tablet} {
            display:none;
          }
        width:25%;
        text-align:left;
        margin-top:50px;
        height:auto;
        .categories {
            top:70px;
            position:sticky;
            position:-webkit-sticky;
            width:100%;
            list-style: none;
            margin: 0;
            padding:0;
            h5{
                font-weight:600;
                margin-bottom:20px;
            }
            li {
                margin-top:10px;
                cursor:pointer;
                font-size:1.10rem;
                &::before {
                    content:'a';
                    font-size:0.6rem;
                    margin-right:5px;
                    color:transparent;
                    width:3px;
                    height:100%;
                    background-color:green;
                }
                &:hover {
                    font-weight:600;
                }
            }
        }
    }
`



const Home = ({match}) => {
    const category = [
        "All",
        "React",
        "Nodejs",
        "Css",
        "Graphic Design",
        "Html",
        "User Experience",
        "Javascript",
        "Angular",
        "Vue",
        "Jquery",
    ]
    const home = useSelector(state => state.home);
    const dispatch = useDispatch();
    const prevRef = useRef(0);
    const nextRef = useRef(4);
    const loading = useRef('stop');
    const [hashTag, setHashTag] = useState([]);
    const [posterId, setPosterId] = useState([]);
    const history = useHistory();

    const PosterContainer = styled.div`
        display:flex;
        margin:15px auto;
        width:1250px;
        
        height:auto;
        @media ${device.laptopL} {
            width:1024px;
        }
        @media ${device.laptop} {
            width:94%;
            margin:0 auto;
        }
        @media ${device.tablet} {
            width:100%;
           
        }
        .feed {
            width:100%;
            height:100%;
            margin:15px 5% 0;
            padding-bottom:40px;
            @media ${device.laptop} {
                margin-top:5px;
            }
            @media ${device.mobileL} {
                margin:5px 0;
            }
            
        }
        #${(match.params.categories && (match.params.categories.replace(/ /gi, "")) || 'All')} {
            font-size:1.15rem;
            font-weight:700;
            color:rgb(13, 72, 50);
        }
        .rightUtil {
            position:sticky;
            @media ${device.laptop} {
                display:none;
              }
            top:70px;
            width:20%;
            height:600px;
            margin-top:50px;
            
        }
`
    useEffect(() => {
        callPosts();
        window.addEventListener('scroll', handleScroll);
        
        return (() => { window.removeEventListener('scroll', handleScroll)})
    },[match.params.categories]);


    const callPosts = async() => {
        setPosterId([]);
        dispatch(home_load_request());
        homeAPI.get({page:match.params.categories,history:history})
        .then(async(res) => {
            await res.data.map(tag =>tag.hashTags=== null ? null : tag.hashTags.split(',').map( res => setHashTag(prev => [...prev, res])));
            let test;
            dispatch(home_load_success());
            test = res.data.slice(0,4);
            test.map((post) => {
                return setPosterId((previd)=> [...previd,post])
            })
            if(res.data.length<=4) {
                loading.current='stop';
            }else {
                loading.current='continue';
            }
            loading.current = 'continue';
        }).catch((err) => {
            console.log(err.res);
        })
    };
    
    const handleScroll = async() => {
        
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        if((scrollTop + clientHeight >= scrollHeight-1) && scrollTop !==0 && loading.current==='continue' ) {
            if(window.location.pathname.indexOf('poster')>-1) return false ; 
            dispatch(home_more_request());
            loading.current = 'stop';
            console.log('feed 추가');
            
            prevRef.current = prevRef.current+4;
            nextRef.current = nextRef.current+4;
            homeAPI.get({page:match.params.categories,history:history})
                .then((res) => {
                    let test;
                    dispatch(home_more_success());
                    console.log(res.data.length,prevRef)
                    if(res.data.length-2<=prevRef.current){
                        loading.current = 'stop';
                    } else {
                        loading.current = 'continue';
                    }
                    test = res.data.slice(prevRef.current, nextRef.current) 
                    
                    test.map((post) => {
                        return setPosterId((previd)=> [...previd,post])
                    })
                }).catch((err) => {
                    console.log(err.res);
                })
        }
    }
    const matchCategory = (key) => {
        history.push(`/home/${key}`);
        prevRef.current = 0;
        nextRef.current = 4;
    }
    
    const goSearch =() => {
        history.push('/hashtags');
    }
    
    return (
        <Content>
            <ReactHelmet
                title={'sublog'}
                description={'개발자들을 위한 블로그 플랫폼입니다. 개발지식을 수블로그에서 공유하고 알려주세요.'}
                favicon={'https://sublogs3.s3.ap-northeast-2.amazonaws.com/original/1584262121825laptop-1483974_1280.jpg'}
            />
            
            <PosterContainer>
                <div className="categorieswrapper">
                    <ul className="categories">
                        <SearchComponent />
                        {category.map(value => (<li id={value.replace(/ /gi, "") } onClick={() => matchCategory(value)} key={value}>{value}</li>))}
                    </ul>
                </div>
                <div className="feed">
                    <div className="topBar">
                        <div className="mTags" onClick={goSearch}><SearchIcon />태그검색</div>
                        <div className="mCategories"><Category /></div>
                    </div>
                    {home.isLoading==='SUCCESS' ?
                     (posterId.length === 0 ? "게시물이 존재하지 않습니다." : posterId.map((info, index) =>
                        <Feed key ={index} 
                              block={info}
                              contents={info.content.blocks.filter((data) => data.type ==='paragraph').map((content) => { return content.data.text.replace(/&nbsp;|<b>|<\/b>/g,'')})}
                        />)) 
                    : <>
                        <div className="desktop"><DeskTop /></div>
                        <div className="laptopL"><LaptopL /></div>
                      </>}

                    {home.moreIsLoading==='WAITING' ? <>
                        <div className="desktop"><DeskTop /></div>
                        <div className="laptopL"><LaptopL /></div>
                      </> : null }
                </div>
                <div className="rightUtil">
                <DialogBtn/> 
                    <div className="hashTagBox">
                        <HashTags data={hashTag} loading={home.isLoading}/>
                    </div>
                </div>
            </PosterContainer>
        </Content>
    );
}

export default Home;