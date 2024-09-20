const { getattendancemark, getattendancetotal, getnightoffdata, updatenightoff, getattendancetotalEmployee,
    updatePuchMastNoff, GetNoffDetails, checkNOFFExistORNot } = require('../attandance_marking/attandance_marking.service');
const { validateauthorization, validatecoassign } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    getattendancemark: (req, res) => {
        const id = req.body;
        getattendancemark(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: results
            });
        });
    },
    getattendancetotal: (req, res) => {
        const id = req.body;
        getattendancetotal(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: results
            });
        });
    },
    getnightoffdata: (req, res) => {
        const id = req.body;
        getnightoffdata(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: results,
                data: results
            });
        });
    },
    // updatenightoff: (req, res) => {
    //     const id = req.body;
    //     updatenightoff(id, (err, results) => {
    //         if (err) {
    //             logger.errorLogger(err)
    //             return res.status(400).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         if (results.length == 0) {
    //             logger.infoLogger("No Records Found")
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Record Found"
    //             });
    //         }
    //         updatePuchMastNoff(id, (err, results) => {
    //             if (err) {
    //                 logger.errorLogger(err)
    //                 return res.status(400).json({
    //                     success: 0,
    //                     message: err
    //                 });
    //             }
    //             if (results.length == 0) {
    //                 logger.infoLogger("No Records Found")
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: "No Record Found"
    //                 });
    //             }
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: results
    //             });
    //         });
    //     });
    // },

    updatenightoff: (req, res) => {
        const body = req.body;
        checkNOFFExistORNot(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
                updatenightoff(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        updatePuchMastNoff(body, (err, results) => {
                            if (err) {
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            else {
                                return res.status(200).json({
                                    success: 1,
                                    message: "NOFF Requested Sucessfully"
                                });
                            }
                        });
                    }
                });
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "Less Night duties Under Selected Dates,Not Applicable for NOFF"
                });
            }
        })
    },



    getattendancetotalEmployee: (req, res) => {
        const id = req.body;
        getattendancetotalEmployee(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    GetNoffDetails: (req, res) => {
        const body = req.body;
        GetNoffDetails(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    // checkNoFF: (req, res) => {
    //     const body = req.body;
    //     checkNoFF(body, (err, results) => {
    //         if (err) {
    //             logger.errorLogger(err)
    //             return res.status(400).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         if (results.length == 0) {
    //             logger.infoLogger("No Records Found")
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Record Found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },

}
