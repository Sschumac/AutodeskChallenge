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

    const offset = (this.pageWidth/2) - ((dataBounds.max.X - dataBounds.min.X)/2);

    const lines = svg.selectAll('.lines').data(linksArray);
    const newLines = lines.enter();

    newLines.append('line')
      .classed('line', true)
      .attr('x1', (data)=>(nodeData[data.start].X*this.scale + offset))
      .attr('y1', (data)=>(nodeData[data.start].Y*this.scale))
      .attr('x2', (data)=>(nodeData[data.end].X*this.scale + offset))
      .attr('y2', (data)=>(nodeData[data.end].Y*this.scale))

    
    const nodes = svg.selectAll('.node').data(nodeData);
    const newNodes = nodes.enter();

    newNodes.append('circle')
      .classed('node',true)
      .classed('base_a', (data)=>(data.base=='A'))
      .classed('base_c', (data)=>(data.base=='C'))
      .classed('base_t', (data)=>(data.base=='T'))
      .classed('base_g', (data)=>(data.base=='G'))
      .classed('base_n', (data)=>(data.base=='N'))
      .classed('start', (data, i)=>(i==0))
      .classed('end', (data, i)=>(i == nodeData.length - 1))
      .attr('index',(d, index)=>{index})
      .attr('cx',(data)=>(data.X*this.scale + offset))
      .attr('cy',(data)=>(data.Y*this.scale))
      .attr('r', 7)
      .attr('id',(data, i)=>('node_'+i))
      .call(d3.drag()
        .on("start", this.dragstarted)
        .on("drag", this.dragged)
        .on("end", this.draggedEnded));

    const lable3 = svg.select('.lable3').datum(nodeData[0]).enter();
    const lable5 = svg.select('.lable5').datum(nodeData[nodeData.length - 1]).enter();

    svg.append('text')
      .datum(nodeData[0])
      .classed('lable3',true)
      .text('3')
      .attr('x', (d)=>(d.X*this.scale + offset - 4))
      .attr('y', (d)=>(d.Y*this.scale + 5))
      .style('pointer-events','none')

    svg.append('text')
      .datum(nodeData[nodeData.length - 1])
      .classed('lable5',true)
      .text('5')
      .attr('x', (d)=>(d.X*this.scale + offset - 4))
      .attr('y', (d)=>(d.Y*this.scale + 5))
      .style('pointer-events','none')


   
    this.changeNodeFill = this.changeNodeFill.bind(this);
    this.setNodeDefaultFills = this.setNodeDefaultFills.bind(this);
    this.changeConnectorStroke = this.changeConnectorStroke.bind(this);

    this.setNodeDefaultFills();
    this.changeConnectorStroke('white',2);
  }

  dragStarted(d){}

  dragged(d){
    const nodeVal = parseInt(d3.select(this).attr('id').substring(5));
    d3.select(this).attr("cx", d.X = d3.event.x).attr("cy", d.Y = d3.event.y);
    d3.selectAll('.line')
      .filter((data)=>(data.start===nodeVal))
      .attr('x1',d3.event.x)
      .attr('y1',d3.event.y)
    d3.selectAll('.line')
      .filter((data)=>(data.end===nodeVal))
      .attr('x2',d3.event.x)
      .attr('y2',d3.event.y)

    if (d3.select(this).classed('start')){
      d3.select('.lable3')
        .attr('x',d3.event.x-4)
        .attr('y', d3.event.y+5)
    }

    if (d3.select(this).classed('end')){
      d3.select('.lable5')
        .attr('x',d3.event.x-4)
        .attr('y', d3.event.y+5)
    }
  }
  draggedEnded(d){
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

  changeConnectorStroke(color, width){
    const lines = this.svg.selectAll('.line');
    if (color){
      lines.attr('stroke',color);
    }
    if(width){
      lines.attr('stroke-width',width);
    }
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
