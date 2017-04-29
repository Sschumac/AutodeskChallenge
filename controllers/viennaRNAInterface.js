const spawn = require('child_process').spawn;
const path = require('path');

module.exports.generatePlot = (fileName, sequence, dbn, callback)=>{
  const process = spawn('python', ['/Users/sschumac/Documents/Autodesk/util/RNAplot.py', sequence, dbn, fileName], {cwd:'/Users/sschumac/Documents/Autodesk/app/build/img/'})

  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  process.on('close',(exitCode)=>{
    callback();
  })
}
