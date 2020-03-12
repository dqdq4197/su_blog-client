import React,{useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, useLocation, Redirect} from 'react-router-dom';
import './App.css';
import {Board, About, Login, Home, Poster, Signup, TagList,NotFound , Search ,OneTag, PosterModal, Setting} from './pages';
import Header from './components/header/Header';
import storage from './lib/storage';
import {login_info_save} from './actions/authentication';
import {useDispatch} from 'react-redux';
import ScrollToTop from './components/useHooks/ScrollToTop';

function App() {
  const dispatch = useDispatch();
  const userInfo = async() => {
    const loginInfo = storage.get('loginInfo');
    await dispatch(login_info_save(loginInfo));
  }

useEffect(() => {
  userInfo();
},[]);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
      <AppSwitch />
      </div>
    </Router>
  );
}

function AppSwitch() {
        const location = useLocation();
        const isLogin = storage.get('loginInfo');
        const background = location.state && location.state.background;
  return (
      <>
        {location.pathname==='/' ? null : <Header />}  
        <Switch location={background || location}>
          <Route path="/" exact component={Login}>
            {isLogin ? <Redirect to='/home' />: null}
          </Route>
          <Route path="/home" exact component={Home}/>
          <Route path="/Search" component={Search} />
          <Route path="/about/:nick" component={About}/>
          <Route path="/setting" component={Setting}/>
          <Route path="/poster/:id/:author" component={Poster} />
          <Route path="/Postting" component={Board} />
          <Route path="/Signup" exact component={Signup}/>
          <Route path="/hashtags" exact component={TagList} />
          <Route path="/hashtags/:tag" component={OneTag} />
          <Route path="/home/:categories" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
        {background && <Route path="/poster/:id/:author" component={PosterModal} />}
        
      </>
  )
}

export default App;
