import React,{useEffect} from 'react';
import {useSelector} from 'react-redux';
import Profile from '../components/about/Profile';
import ReactHelmet from '../lib/ReactHelmet';

const About = ({match}) => {
    
    const {result} = useSelector(state => state.authentication)
    return (
        <>
            <ReactHelmet
                keywords={match.params.nick, 'sublog'}
                favicon={'https://sublog.co/static/media/postTumnail.b240a236.png'}
                description={`${match.params.nick} - sublog`}
                title={match.params.nick+'페이지'}
            />
            <Profile profile={result} nick={match.params.nick}/>
        </>
    );
};

export default About;