const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetTodaysInductions, GetAttendanceList, UpdateQuestionCount, GetbelowAvgEmp, GetInductionCompletedList, GetPendingEmpList, UpdateTrainingDate, InsertRetestEmps, GetInductCalenderDetails, UpdateTrainingOnly } = require('./InductionProcess.controller');

router.get('/inductionToday', checkToken, GetTodaysInductions)
router.get('/inductionattendance/:id', checkToken, GetAttendanceList)
router.patch('/questionCount', checkToken, UpdateQuestionCount)
router.get('/inductioncompleted', checkToken, GetInductionCompletedList)
router.get('/inductpending', checkToken, GetPendingEmpList)
router.patch('/EmpReschedule', checkToken, UpdateTrainingDate)
router.get('/belowavgEmp', checkToken, GetbelowAvgEmp)
router.post('/retestEmps', InsertRetestEmps)
router.get('/InductTrainingCalenderdetails', checkToken, GetInductCalenderDetails)
router.patch('/trainingOnly', checkToken, UpdateTrainingOnly)

module.exports = router;

