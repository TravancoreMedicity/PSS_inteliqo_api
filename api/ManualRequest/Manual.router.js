const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { uploadManualreqst, getManualReqstBtwDate, CreateManualRequest,
    getManualRequestAll, InactiveManualrequest, deletePunchMasterSingleRow } = require('./Manual.controller')

router.post("/uploadManualRequest", uploadManualreqst);
router.post("/getdata", checkToken, getManualReqstBtwDate)

router.post("/CreateManualRequest", checkToken, CreateManualRequest)
router.get("/getAllManualrequest", checkToken, getManualRequestAll)
router.patch("/inactiveStatus", checkToken, InactiveManualrequest)
router.post("/deletePunchMasterSingleRow", checkToken, deletePunchMasterSingleRow)

module.exports = router;