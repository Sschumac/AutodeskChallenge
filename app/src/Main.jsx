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

    this.setRoomData = this.setRoomData.bind(this);
    this.setUpInteractivity = this.setUpInteractivity.bind(this);
  }

  componentDidMount() {
    if (this.props.match.path === "/"){
      $.get('api/newSession', (roomID)=>{
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
    const svgElement = document.getElementById('svgContainer').contentDocument;
  }

  render() {

    let svgObject = this.state.roomData?<object id="svgContainer" data={'img/' + this.state.roomData.roomID + '.svg'}></object>:"";
    return (
      <div className={styles.base}>
        <input value={this.state.sequence}></input>
        <input value={this.state.dbn}></input>
        {svgObject}
      </div>
    );
  }
}

export default Main;
