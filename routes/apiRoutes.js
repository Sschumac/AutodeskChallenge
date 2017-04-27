const express = require('express');
const router = express.Router();

router.get('/newSession', (req,res)=>{
  res.send("testroom");
})


module.exports = router;
