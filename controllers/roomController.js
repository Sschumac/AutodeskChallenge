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
  roomStore[roomID] = roomTemplate;
  console.log(roomTemplate);
  vienna.generatePlot(roomID, roomTemplate.sequence, roomTemplate.dbn, ()=>{
    res.send(roomID);
  })

}

module.exports.getRoomStatus = function(req,res){
  console.log(req.query.roomID);
  res.send(roomStore[req.query.roomID]);
}

