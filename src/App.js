import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  useLocation, 
  Redirect
} from 'react-router-dom';
import './App.css';
import {
  Board,
  SocialLogin, 
  About, 
  Login, 
  Home, 
  Poster, 
  Signup, 
  TagList,
  NotFound , 
  Search ,
  OneTag, 
  PosterModal, 
  Setting
} from './pages';
import Header from './components/header/Header';
import storage from './lib/storage';
import { login_info_save } from './actions/authentication';
import { useDispatch } from 'react-redux';
import ScrollToTop from './components/useHooks/ScrollToTop';

function App() {
  const dispatch = useDispatch();
  const userInfo = () => {
    const loginInfo = storage.get('loginInfo');
    dispatch(login_info_save(loginInfo));
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
        {location.pathname==='/' || location.pathname==='/signup' || location.pathname==='/social' ? null : <Header />}  
        <Switch location={background || location}>
          <Route path="/" exact component={Login}>
            { isLogin && <Redirect to='/home' /> }
          </Route>
          <Route path="/signup" exact component={Login}>
            { isLogin && <Redirect to='/home' /> }
          </Route>
          <Route path="/home" exact component={Home}/>
          <Route path="/Search" component={Search} />
          <Route path="/about/:nick" component={About}/>
          <Route path="/setting" component={Setting}/>
          <Route path="/poster/:id/:author" component={Poster} />
          <Route path="/posting" component={Board} />
          <Route path="/Signup" exact component={Signup}/>
          <Route path="/hashtags" exact component={TagList} />
          <Route path="/hashtags/:tag" component={OneTag} />
          <Route path="/home/:categories" exact component={Home} />
          <Route path="/social" component={SocialLogin} />
          <Route component={NotFound} />
        </Switch>
        { background && <Route path="/poster/:id/:author" component={PosterModal} /> }
        
      </>
  )
}

export default App;
