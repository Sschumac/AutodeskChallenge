import React, { Component, PropTypes } from 'react';
import styles from './Main.css';
import $ from 'jquery';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sequence:"",
      dbn:""
    };
  }

  componentDidMount() {
    if (this.props.match.path === "/"){
      $.get('api/newSession', (roomID)=>{
        window.location.replace(window.location.href + roomID);
      })
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <p>hello</p>
        <input value={this.state.sequence}></input>
        <input value={this.state.dbn}></input>
      </div>
    );
  }
}

export default Main;
