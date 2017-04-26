import React, { Component, PropTypes } from 'react';
import styles from './Main.css';

class Main extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.base}>
        <p>hello</p>
      </div>
    );
  }
}

export default Main;
