const spawn = require('child_process').spawn;
const path = require('path');

module.exports.generatePlot = (fileName, sequence, dbn, callback)=>{
  const process = spawn('python', ['/Users/sschumac/Documents/Autodesk/util/RNAplot.py', sequence, dbn, fileName])
  const dataBuffer = [];
  process.stdout.on('data', (data) => {
    dataBuffer.push(data);
  });

  process.on('close',()=>{
    callback(dataBuffer.join(''));
  })
}
