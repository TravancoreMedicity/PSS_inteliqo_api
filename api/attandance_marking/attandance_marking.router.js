const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getattendancemark, getattendancetotal, getnightoffdata, updatenightoff, getattendancetotalEmployee, GetNoffDetails } = require('../attandance_marking/attandance_marking.controller');

router.post("/", checkToken, getattendancemark);
router.post("/getattendancetotal", checkToken, getattendancetotal);
router.post("/getnightoffdata", checkToken, getnightoffdata);
router.patch("/updatenightoff", checkToken, updatenightoff);
router.post("/getattendancetotalEmp", checkToken, getattendancetotalEmployee);
router.post("/getNoffDetails", checkToken, GetNoffDetails);
// router.post("/checkNoFF", checkToken, checkNoFF);

module.exports = router;

