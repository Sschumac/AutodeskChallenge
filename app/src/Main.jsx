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
    this.onDbnChange = this.onDbnChange.bind(this);
    this.onSeqChange = this.onSeqChange.bind(this);
  }

  componentDidMount() {
    if (this.props.match.path === "/"){
      $.get('api/newSession', (roomID)=>{
        window.location.replace(window.location.href + roomID);
      })
    }else{
      this.roomID = this.props.match.url.substring(1);
      const roomID = this.roomID;
      let setRoomData = this.setRoomData
      $.get('api/roomStatus',{roomID:roomID}, (data)=>{
        setRoomData(data);
      });
    }

  }
  setRoomData(data){
    this.setState({roomData:data, dbn:data.dbn, sequence:data.sequence},()=>{
      this.setUpInteractivity();
    })
  }

  setUpInteractivity(){
    this.graph = new NodeGraph('#graphContainer',this.state.roomData.plotData, this.saveGraphState.bind(this));
  }

  saveGraphState(data){
    $.post('api/updateData',{roomID:this.roomID, plotData:data})
  }

  onDbnChange(e){
    this.setState({dbn:e.target.value}, this.validateInput);
  }

  onSeqChange(e){
    this.setState({sequence:e.target.value}, this.validateInput);
  }

  validateInput(){

    const seq = this.state.sequence;
    const dbn = this.state.dbn;
    console.log(dbn,seq);

    if (seq.length !== dbn.length){
      this.setState({error:'Dot Bracket Notation and Sequence must be same length.'})
      return false;
    }

    if (seq.length === 0 || dbn.length === 0){
      this.setState({error:"Input field empty"});
      return false;
    }
    if (!seq.split('').every((a)=>(['A','C','T','G','N','a','c','t','g','n'].indexOf(a) > - 1))){
      this.setState({error:"illegal character in sequence"});
      return false;
    }

    if (!dbn.split('').every((a)=>(['(',')','.'].indexOf(a) > - 1))){
      this.setState({error:"illegal character in Dot Bracket Notation"});
      return false
    }

    const bracketStack = dbn.split('').reduce((m, n, i)=>{
      if (n==='('){
        m++;
      }
      if (n===')'){
        m--;
      }
      return m;
    },0);

    if (bracketStack !== 0){
      this.setState({error:"unmatched parenthesis in Dot Bracket Notation"});
      return false;
    }

    this.setState({error:''});
    this.updateGraph();
  }

  updateGraph(){
    console.log('updating');
  }

  render() {
    return (
      <div className={styles.base}>
        <div id='graphContainer'></div>
        <p>{this.state.error}</p>
        <input value={this.state.roomData?this.state.sequence:""} onChange={this.onSeqChange}></input>
        <input value={this.state.roomData?this.state.dbn:""} onChange={this.onDbnChange}></input>
      </div>
    );
  }
}

export default Main;
