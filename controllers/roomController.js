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
    roomTemplate.plotData = JSON.parse(data).data;
    roomStore[roomID] = roomTemplate;
    res.send(roomID);
  })

}

module.exports.getRoomStatus = function(req,res){
  res.send(roomStore[req.query.roomID]);
}

