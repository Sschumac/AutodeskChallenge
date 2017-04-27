import React, {Component} from 'react';
import {render} from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import Main from './Main.jsx'


render(
  <Router>
    <div>
      <Route path="/:id" component={Main}/>
      <Route exact path="/" component={Main}/>
    </div>
  </Router>
  , document.getElementById('app'));
