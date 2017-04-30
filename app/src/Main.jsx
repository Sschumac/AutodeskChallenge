import React, { Component, PropTypes } from 'react';
import styles from './Main.css';
import $ from 'jquery';
import d3 from 'd3';
import NodeGraph from './svgController.js'

console.log(NodeGraph);

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sequence:"",
      dbn:""
    };

    this.setRoomData = this.setRoomData.bind(this);
    this.setUpInteractivity = this.setUpInteractivity.bind(this);
  }

  componentDidMount() {
    if (this.props.match.path === "/"){
      $.get('api/newSession', (roomID)=>{
        console.log('got it');
        window.location.replace(window.location.href + roomID);
      })
    }else{
      console.log('ellsse');
      this.roomID = this.props.match.url.substring(1);
      const roomID = this.roomID;
      let setRoomData = this.setRoomData
      $.get('api/roomStatus',{roomID:roomID}, (data)=>{
        setRoomData(data);
      });
    }
    
  }
  setRoomData(data){
    this.setState({roomData:data},()=>{
      this.setUpInteractivity();
    })
  }

  setUpInteractivity(){
    const graph = new NodeGraph('#visuContainer',this.state.roomData.plotData, this.state.roomData.dbn);
  }

  render() {
    return (
      <div className={styles.base}>
        <svg id='visuContainer' height='500' width='500'></svg>
        <input value={this.state.sequence}></input>
        <input value={this.state.dbn}></input>
      </div>
    );
  }
}

export default Main;
