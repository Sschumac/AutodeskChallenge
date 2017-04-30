import * as d3 from "d3";

class NodeGraph{
  constructor(selector, nodeData, dbn){
    this.selector = selector
    this.nodeData = nodeData
    this.dbn = dbn
    const svg = d3.select(selector);
    const circles = svg.selectAll('circle').data(nodeData);
    const newCircles = circles.enter();
    console.log(nodeData);
    console.log('nodeGraph');
    newCircles.append('circle')
        .attr('cx',(data)=>(data.X))
        .attr('cy',(data)=>(data.Y))
        .attr('r', 5);
    
  }
}

export default NodeGraph;
