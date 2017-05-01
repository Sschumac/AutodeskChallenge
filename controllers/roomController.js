const shortid = require('shortid');
const vienna = require('./viennaRNAInterface.js');

const defaultSequence = "TTGGGGGGACTGGGGCTCCCATTCGTTGCCTTTATAAATCCTTGCAAGCCAATTAACAGGTTGGTGAGGGGCTTGGGTGAAAAGGTGCTTAAGACTCCGT"
const defaultDBN = "...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).)))))))..............."

const roomStore = {};

module.exports.createNewRoom = function(req, res){
  const roomID = shortid.generate();
  const roomTemplate = {
    roomID:roomID,
    sequence:defaultSequence,
    dbn:defaultDBN,
    isProcessed:false
  }
  vienna.generatePlot(roomID, roomTemplate.sequence, roomTemplate.dbn, (data)=>{
    const parsedData = JSON.parse(data);
    roomTemplate.plotData = parsedData.graphPoints;
    roomTemplate.ptable = parsedData.ptable;
    roomStore[roomID] = roomTemplate;
    res.send(roomID);
  })

}

module.exports.changeGraph = function(req, res){
  const room = roomStore[req.body.roomID];
  vienna.generatePlot(req.body.roomID, req.body.sequence, req.body.dbn, (data)=>{
    const parsedData = JSON.parse(data);
    room.plotData = parsedData.graphPoints;
    room.ptable = parsedData.ptable;
    room.sequence = req.body.sequence;
    room.dbn = req.body.dbn;
    res.sendStatus(200);
  })
}

module.exports.updateRoomData = function(req, res){
  roomStore[req.body.roomID].plotData = req.body.plotData;
  res.sendStatus(200);
}

module.exports.getRoomStatus = function(req,res){
  res.send(roomStore[req.query.roomID]);
}

