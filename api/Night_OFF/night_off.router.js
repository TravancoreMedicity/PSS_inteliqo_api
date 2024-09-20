const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { updatenightoff, GetEmpBasedNOFF, InserNOFFTable, CancelNightOff, DeleteNOFF, GetEmpDetailsByEmNo,
    getPunchDataEmpWiseDateWise, getPunchMasterDataEmptWise, getnightoffdata
} = require('../Night_OFF/night_off.controller');

//NIGHT OFF REQUEST NEW
router.post("/getnightoffdata", checkToken, getnightoffdata);
router.post('/InsertNOffTbl', checkToken, InserNOFFTable)
router.patch("/updatenightoff", checkToken, updatenightoff);
router.post("/GetEmpBasedNoff", checkToken, GetEmpBasedNOFF);
router.patch("/CancelNightOff", checkToken, CancelNightOff);
router.patch("/DeleteNOFF", checkToken, DeleteNOFF);
router.post("/GetEmpDetailsByEmNo", checkToken, GetEmpDetailsByEmNo);


//punch processing 
router.post("/getPunchDataEmpWiseDateWise", checkToken, getPunchDataEmpWiseDateWise);
router.post("/getPunchMasterDataEmptWise", checkToken, getPunchMasterDataEmptWise);


module.exports = router;
