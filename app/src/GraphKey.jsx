import React, { Component, PropTypes } from 'react';

class GraphKey extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    console.log(this.props.onColorChange);
    $('.base_a').spectrum({
      color: "#4357AD",
      move:(color)=>{this.props.onColorChange('base_a',color.toHexString())}
    })
    $('.base_t').spectrum({
      color: "#48A9A6",
      move:(color)=>{this.props.onColorChange('base_t',color.toHexString())}
    })
    $('.base_c').spectrum({
      color: "#E4DFDA",
      move:(color)=>{this.props.onColorChange('base_c',color.toHexString())}
    })
    $('.base_g').spectrum({
      color: "#D4B483",
      move:(color)=>{this.props.onColorChange('base_g',color.toHexString())}
    })
    $('.base_n').spectrum({
      color: "#C1666B",
      move:(color)=>{this.props.onColorChange('base_n',color.toHexString())}
    })

  }

  render() {
    return (
      <div className="graphKey">
        <div className='colorContainer'>
          <input type='text' className="base_a picker"/>
          <p className="colorLable">A</p>
        </div>
        <div className='colorContainer'>
          <input type='text' className="base_t picker"/>
          <p className="colorLable">C</p>
        </div>
        <div className='colorContainer'>
          <input type='text' className="base_c picker"/>
          <p className="colorLable">T</p>
        </div>
        <div className='colorContainer'>
          <input type='text' className="base_g picker"/>
          <p className="colorLable">G</p>
        </div>
        <div className='colorContainer'>
          <input type='text' className="base_n picker"/>
          <p className="colorLable">N</p>
        </div>
      </div>
    );
  }
}

export default GraphKey;
