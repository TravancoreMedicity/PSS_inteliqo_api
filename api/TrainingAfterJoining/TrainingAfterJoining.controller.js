
const { TrainingAfterJoiningGet, TrainingNewJoineeInsert, JoineeDetailsGet, JoineeDetailsInsert,
    JoineeDetailsUpdate, ScheduleDetailsGet, ScheduleUpdate, GetTopic, GetTrainers, ScheduleInsert, GetScheduleDetails } = require('./TrainingAfterJoining.service');

module.exports = {

    TrainingAfterJoiningGet: (req, res) => {
        TrainingAfterJoiningGet((err, results) => {

            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    TrainingNewJoineeInsert: (req, res) => {
        const body = req.body;
        console.log(body);
        TrainingNewJoineeInsert(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Inserted"
                });
            }

        });
    },
    // JoineeDetailsGet: (req, res) => {
    //     JoineeDetailsGet((err, results) => {

    //         if (err) {
    //             return res.status(400).json({
    //                 success: 0,
    //                 message: "Error"
    //             })
    //         }
    //         if (results === 0) {
    //             return res.status(400).json({
    //                 success: 1,
    //                 message: "No Record Found"
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })
    //     })
    // },

    JoineeDetailsInsert: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            // return [value.trainingtype_slno, value.cat_slno, value.name_slno, tnd_emp_id, value.tns_emp_id
            return [value.tnd_emp_id, value.trainingtype_slno, value.cat_slno, value.name_slno, value.tnd_date, value.create_user]
        })
        JoineeDetailsInsert(values, (err, results) => {
            if (err) {
                return res.status(200).json({
                    successmsg: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    successmsg: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                successmsg: 1,
                message: " Submitted Successfully"
            });
        });
    },
    JoineeDetailsUpdate: (req, res) => {
        const body = req.body;
        JoineeDetailsUpdate(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Inserted successfully"
                });
            }

        });
    },
    ScheduleDetailsGet: (req, res) => {
        ScheduleDetailsGet((err, results) => {

            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    ScheduleUpdate: (req, res) => {
        const body = req.body;
        ScheduleUpdate(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Schedule Date Updated successfully"
                });
            }

        });
    },
    GetTopic: (req, res) => {
        GetTopic((err, results) => {

            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    GetTrainers: (req, res) => {
        GetTrainers((err, results) => {

            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    ScheduleInsert: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            return [value.tes_dept, value.tes_dept_sec, value.tes_topic,
            JSON.stringify(value.tes_emp_name), value.date, value.tes_remark, value.create_user

            ]
        })
        ScheduleInsert(values, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Successfully Inserted"
                });
            }

        });
    },
    GetScheduleDetails: (req, res) => {
        GetScheduleDetails((err, results) => {

            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    }
}
