import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Tag = styled.div`
    height:250px;
    color:#90A4AE;
    width:100%;
    overflow:hidden;
    text-align:left;
    hr{
        margin-top:2px;
    }
    h3 {
        font-size:1.2rem;
        margin:0;
        
    }
    .moreTag a{
        color:#333;
    }
    .moreTag {
        margin-top:10px;
    }
    
    ul {
        margin:0;
        padding:0;
        li {
            margin-top:8px;
            list-style:none;
            a {
                text-decoration:none;
                padding:3px 8px;
                border-radius:5px;
                color:black;
                
                &:hover {
                    color:#008000;
                    font-weight:700;
                    transition:.3s;
                }
            }
        }
    }
`

const HashTags = ({data, loading}) => {

    useEffect(() => {
        GetPriTags()
    },[])


    const GetPriTags = () =>{
        const priTags =data.filter((value, index) => {return data.map((v)=>v.toUpperCase()).indexOf(value.toUpperCase()) === index})
        return <Tag><h3>최근 태그</h3><hr/><ul>{priTags.slice(0,6).map(a => <li key={a}><Link to={`/hashtags/${a}`}># {a.toLowerCase()}</Link></li>)}
        <p className="moreTag"><Link to='/hashtags'>더보기..</Link></p></ul></Tag>
    }

    return (
        <>  
            {loading === 'SUCCESS' ? <GetPriTags /> : null}
        </>
    )
}
export default HashTags;