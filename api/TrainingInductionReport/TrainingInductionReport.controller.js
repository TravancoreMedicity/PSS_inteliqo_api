const { logger } = require('../../logger/logger');
const { GetInductCalenderReport } = require('./TrainingInduction.service');
module.exports = {

    GetInductCalenderReport: (req, res) => {
        const body = req.body;
        GetInductCalenderReport(body, (err, results) => {
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
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results,
            });
        });
    },

}

