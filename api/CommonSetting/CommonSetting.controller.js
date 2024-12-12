const { InsertCommonSettings, getCommonSettings, updateCommonSettings } = require('../CommonSetting/CommonSetting.service');
const { validatecommonsettings } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    InsertCommonSettings: (req, res) => {
        const body = req.body;
        const body_result = validatecommonsettings.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 1,
                message: body_result.error.details[0].message
            });
        }
        InsertCommonSettings(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Data Created Successfully"
            });

        });
    },

    getCommonSettings: (req, res) => {
        getCommonSettings((err, results) => {
            const datas = results.map((val) => {
                const obj = {
                    setting_slno: val.setting_slno,
                    cmmn_grace_period: val.cmmn_grace_period,
                    cmmn_late_in: val.cmmn_late_in,
                    cmmn_early_out: val.cmmn_early_out,
                    cmmn_early_out_grace: val.cmmn_early_out_grace,
                    cmmn_late_in_grace: val.cmmn_late_in_grace,
                    creat_date: val.creat_date,
                    creat_user: val.creat_user,
                    update_user: val.update_user,
                    carry_hl: val.carry_hl,
                    carry_cl: val.carry_cl,
                    carry_el: val.carry_el,
                    carry_sl: val.carry_sl,
                    min_salary: val.min_salary,
                    max_salary: val.max_salary,
                    pf_age: val.pf_age,
                    pf_employee: val.pf_employee,
                    pf_employer: val.pf_employer,
                    esi_limit: val.esi_limit,
                    esi_employee: val.esi_employee,
                    esi_employer: val.esi_employer,
                    noofadvanceinyear: val.noofadvanceinyear,
                    verification_level: val.verification_level,
                    default_shift: val.default_shift,
                    notapplicable_shift: val.notapplicable_shift,
                    week_off_day: val.week_off_day,
                    salary_above: val.salary_above,
                    noff_selct_day_count: val.noff_selct_day_count,
                    noff: val.noff,
                    eoff: val.eoff,
                    dayoff: val.dayoff,
                    comp_day_count: val.comp_day_count,
                    comp_hour_count: val.comp_hour_count,
                    holiday_policy_count: val.holiday_policy_count,
                    weekoff_policy_max_count: val.weekoff_policy_max_count,
                    weekoff_policy_min_count: val.weekoff_policy_min_count,
                    coff_min_working_hour: val.coff_min_working_hour,
                    noff_count: val.noff_count,
                    pf_employee_amount: val.pf_employee_amount,
                    pf_employer_amount: val.pf_employer_amount,
                    onehour_rqst_count: val.onehour_rqst_count,
                    areartype: val.areartype,
                    max_late_day_count: val.max_late_day_count,
                    leave_count: val.leave_count,
                    break_shift_taken_count: val.break_shift_taken_count,
                    halfday_time_count: val.halfday_time_count,
                    punch_taken_hour_count: val.punch_taken_hour_count,
                    training_mastergroup: JSON.parse(val.training_mastergroup),
                    group_slno: JSON.parse(val.group_slno),
                    leavetype_multiple: JSON.parse(val.leavetype_multiple)
                }
                return obj
            })

            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length === 0) {

                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: datas
            });
        });
    },
    updateCommonSettings: (req, res) => {
        const body = req.body;
        const body_result = validatecommonsettings.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 1,
                message: body_result.error.details[0].message
            });
        }
        updateCommonSettings(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Data Updated Successfully"
            });

        });
    },
}