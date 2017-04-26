import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router'; 

import Main from './Main.jsx';

render(
  <Router history = {hashHistory}>
    <Route path='/' component={Home}/>
    <Route path='/:roomid' component={Home}/>
  </Router>
  , document.getElementById('app'));
