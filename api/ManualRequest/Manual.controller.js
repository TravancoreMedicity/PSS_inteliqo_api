const multer = require('multer');
const path = require('path');
const fs = require("fs")
const logger = require('../../logger/logger');
const { log } = require('winston');
const { format } = require('date-fns');
const { getManualReqstBtwDate, updateManualRequest, createManualrequestLog,
    getManualRequestAll, InactiveManualrequest, deletePunchMasterSingleRow } = require('./Manual.service');


// for multiple file upload
const storagemul = multer.diskStorage({
    destination: (req, file, cb) => {

        // const Topic_id = req.body.training;
        const filepath = path.join('D:/DocMeliora/Inteliqo/ManualRequests/');
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }
        cb(null, filepath);
    },
});
const maxSize = 2 * 1024 * 1024

const uploadmul = multer({
    storage: storagemul,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "application/pdf" // Add PDF mimetype
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg, .jpeg, and .pdf format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
}).array('files', 10);


module.exports = {

    uploadManualreqst: (req, res) => {
        uploadmul(req, res, async (err) => {
            const body = req.body;
            if (err instanceof multer.MulterError) {
                return res.status(200).json({
                    status: 0,
                    message: "Max file size 2MB allowed!",
                });
            } else if (err) {
                logger.errorLogger(err);
                return res.status(200).json({
                    status: 0,
                    message: err.message,
                });
            }
            //  else if (!req.files || req.files.length === 0) {
            //     return res.status(200).json({
            //         status: 0,
            //         message: "Files are required!",
            //     }
            // );
            //}
            else {
                try {
                    const files = req.files;
                    const empno = body.emno;
                    const em_id_folder = path.join('D:/DocMeliora/Inteliqo_pss/ManualRequests/');
                    const uploadedFiles = [];

                    // Create the em_id folder if it doesn't exist
                    if (!fs.existsSync(em_id_folder)) {
                        fs.mkdirSync(em_id_folder, { recursive: true });
                    }
                    for (const file of files) {
                        // Process each file individually
                        const uniqueSuffix = format(new Date(), "MM-dd-yyyy");;
                        const extension = path.extname(file.originalname);
                        const filename = 'manualrq' + '_' + empno + '_' + uniqueSuffix + extension;
                        // Move the file to the destination folder
                        const destinationPath = path.join(em_id_folder, filename);
                        fs.renameSync(file.path, destinationPath);
                        uploadedFiles.push(filename); // Collect the filename
                    }
                    res.status(200).json({
                        success: 1,
                        message: "Files Uploaded Successfully",
                        filenames: uploadedFiles // Return the filenames in the response
                    });
                } catch (error) {
                    return res.status(200).json({
                        success: 0,
                        message: "An error occurred during file upload.",
                    });
                }
            }

        });
    },

    // for getting the file
    selectUploads: (req, res) => {
        const { topic_slno, checklistid } = req.body;
        const folderPath = `D:/DocMeliora/Inteliqo/Training/${topic_slno}/${checklistid}`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: files
            });
        });

    },
    getManualReqstBtwDate: (req, res) => {
        const body = req.body;
        getManualReqstBtwDate(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    CreateManualRequest: (req, res) => {

        const body = req.body;
        const result = updateManualRequest(body)
            .then((r) => {
                var values = body.map((value, index) => {
                    return [value.em_id, value.em_no, value.duty_day, value.lvereq_desc, value.duty_desc, value.create_user, value.remrk,
                    value.punch_slno, value.filename]
                })

                createManualrequestLog(values, (err, results) => {
                    if (err) {
                        //logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "No Results Found"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Submitted Successfully",
                        insetId: results.insertId
                    });
                });
                // return res.status(200).json({
                //     success: 1,
                //     message: r
                // });
            }).catch((e) => {
                return res.status(200).json({
                    success: 0,
                    message: e.sqlMessage
                });
            })
    },
    getManualRequestAll: (req, res) => {
        getManualRequestAll((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    InactiveManualrequest: (req, res) => {
        const body = req.body
        InactiveManualrequest(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found",
                    data: []
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Successfully Updated",
            });
        });
    },
    deletePunchMasterSingleRow: (req, res) => {
        const body = req.body
        deletePunchMasterSingleRow(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found",
                    data: []
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Successfully Updated",
            });
        });
    },
}