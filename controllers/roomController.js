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
    dbn:defaultDBN
  }
  roomStore[roomID] = roomTemplate;
  res.send(roomID);

}

