import * as d3 from "d3";

class NodeGraph{
  constructor(selector, nodeData, dbn){
    this.selector = selector
    this.nodeData = nodeData
    this.dbn = dbn
    this.pageHeight = window.innerHeight
    this.pageWidth = window.innerWidth
    this.scale = 1.5;

    const container = d3.select(selector);
    const dataBounds = this.getDataBounds(nodeData);
    const linksArray = this.generateLinksArray(nodeData);

    const svg = container.append('svg')
      .attr('height',this.pageHeight - 150)
      .attr('width', this.pageWidth);

    this.svg = svg
    
    const nodes = svg.selectAll('.node').data(nodeData);
    const newNodes = nodes.enter();

    newNodes.append('circle')
      .classed('node',true)
      .classed('base_a', (data)=>(data.base=='A'))
      .classed('base_c', (data)=>(data.base=='C'))
      .classed('base_t', (data)=>(data.base=='T'))
      .classed('base_g', (data)=>(data.base=='G'))
      .classed('base_n', (data)=>(data.base=='N'))
      .attr('cx',(data)=>(data.X*this.scale + (this.pageWidth/2) - ((dataBounds.max.X - dataBounds.min.X)/2)))
      .attr('cy',(data)=>(data.Y*this.scale))
      .attr('r', 7);

    const lines = svg.selectAll('.lines').data(linksArray);
    const newLines = lines.enter();

    newLines.append('line')
      .classed('.line', true)
      .attr('x1', (data)=>(nodeData[data.start].X*this.scale + (this.pageWidth/2) - ((dataBounds.max.X - dataBounds.min.X)/2)))
      .attr('y1', (data)=>(nodeData[data.start].Y*this.scale))
      .attr('x2', (data)=>(nodeData[data.end].X*this.scale + (this.pageWidth/2) - ((dataBounds.max.X - dataBounds.min.X)/2)))
      .attr('y2', (data)=>(nodeData[data.end].Y*this.scale));

    this.changeNodeFill = this.changeNodeFill.bind(this);
    this.setNodeDefaultFills = this.setNodeDefaultFills.bind(this);

    this.setNodeDefaultFills();
  }

  setNodeDefaultFills(){
    this.changeNodeFill('base_a', '#4357AD');
    this.changeNodeFill('base_c', '#48A9A6');
    this.changeNodeFill('base_t', '#E4DFDA');
    this.changeNodeFill('base_g', '#D4B483');
    this.changeNodeFill('base_n', '#C1666B');
  }

  changeNodeFill(nodeClass, fill){
    this.svg.selectAll('.' + nodeClass)
      .style('fill', fill);
  }

  generateLinksArray(nodeData){
    const linksArray = [];
    nodeData.forEach((dataPoint, i)=>{
      linksArray.push({start:i, end:i+1});
      if (dataPoint.connector !== 0 && dataPoint.connector - 1 > i){
        linksArray.push({start:i, end:dataPoint.connector - 1})
      }
    })

    linksArray.pop();
    return linksArray;
  }
  getDataBounds(nodeData){
    let bounds = {
      max:{
        X:nodeData[0].X,
        Y:nodeData[0].Y
      },
      min:{
        X:nodeData[0].X,
        Y:nodeData[0].Y
      }
    }

    nodeData.forEach((node)=>{

      if (node.X > bounds.max.X){
        bounds.max.X = node.X;
      }
      if (node.X < bounds.min.X){
        bounds.min.X = node.X;
      }
      if (node.Y > bounds.min.Y){
        bounds.max.Y = node.Y;
      }
      if (node.Y < bounds.min.Y){
        bounds.min.Y = node.Y;
      }

    })

    return bounds;
  }
}

export default NodeGraph;
