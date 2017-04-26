import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router'; 

import Main from './Main.jsx';

render(
  <Router history = {hashHistory}>
    <Route path='/' component={Main}/>
    <Route path='/:roomid' component={Main}/>
  </Router>
  , document.getElementById('app'));
