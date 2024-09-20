const { updatenightoff, getnightoffdata,
    updatePuchMastNoff, checkNOFFExistORNot, GetEmpBasedNOFF, InserNOFFTable, CancelNightOff, CancelPuchMastNoff, DeleteNOFF, GetEmpDetailsByEmNo, getPunchDataEmpWiseDateWise, getPunchMasterDataEmptWise } = require('../Night_OFF/night_off.service');
const logger = require('../../logger/logger')
module.exports = {


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
    updatenightoff: (req, res) => {
        const id = req.body;
        updatenightoff(id, (err, results) => {
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
            updatePuchMastNoff(id, (err, results) => {
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
        });
    },

    GetEmpBasedNOFF: (req, res) => {
        const body = req.body;
        GetEmpBasedNOFF(body, (err, results) => {
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
                suces: 1,
                data: results
            });
        });
    },

    // InserNOFFTable: (req, res) => {
    //     const body = req.body;
    //     checkNOFFExistORNot(body, (err, result) => {
    //         const value = JSON.parse(JSON.stringify(result))
    //         if (Object.keys(value).length === 0) {
    //             InserNOFFTable(body, (err, result) => {
    //                 if (err) {
    //                     logger.errorLogger(err)
    //                     return res.status(200).json({
    //                         success: 0,
    //                         message: err
    //                     });
    //                 }
    //                 else {
    //                     return res.status(200).json({
    //                         success: 1,
    //                         message: "Night Off Requested Successfully"
    //                     });
    //                 }
    //             })
    //         }
    //         else {
    //             return res.status(200).json({
    //                 success: 10,
    //                 message: "A NOFF has already been taken on the selected date"
    //             })
    //         }
    //     })

    // },
    InserNOFFTable: (req, res) => {
        const body = req.body;

        checkNOFFExistORNot(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {

                InserNOFFTable(body, (err, result) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "Night Off Requested Successfully"
                        });
                    }
                })
            }
            else {
                return res.status(200).json({
                    success: 10,
                    message: "A NOFF has already been taken on the selected date"
                })
            }
        })

    },

    CancelNightOff: (req, res) => {
        const id = req.body;
        CancelNightOff(id, (err, results) => {
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
            CancelPuchMastNoff(id, (err, results) => {
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
        });
    },


    DeleteNOFF: (req, res) => {
        const id = req.body;
        DeleteNOFF(id, (err, results) => {
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
    GetEmpDetailsByEmNo: (req, res) => {
        const body = req.body;
        GetEmpDetailsByEmNo(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    sucss: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    sucss: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                sucss: 1,
                datas: results
            });
        });
    },

    //punch processing
    getPunchDataEmpWiseDateWise: (req, res) => {
        const body = req.body;
        getPunchDataEmpWiseDateWise(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    su: 0,
                    mesge: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    su: 2,
                    mesge: "Record Not Found"
                });
            }

            return res.status(200).json({
                su: 1,
                resultPunch_data: results
            });

        });
    },
    getPunchMasterDataEmptWise: (req, res) => {
        const body = req.body;
        getPunchMasterDataEmptWise(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                planData: results
            });

        });
    },
}
