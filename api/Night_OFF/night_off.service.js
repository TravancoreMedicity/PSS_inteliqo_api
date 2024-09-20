const pool = require('../../config/database');
module.exports = {
    getnightoffdata: (data, callBack) => {

        pool.query(
            // `
            // select hrm_shift_mast.night_off_flag,punch_master.shift_id,duty_status,duty_desc,duty_day,shft_desc,lve_tble_updation_flag,noff_flag,
            //  punch_in,punch_out,hrm_shift_mast.noff_min_days,hrm_shift_mast.noff_max_days
            //  from  punch_master 
            //  left join hrm_shift_mast on punch_master.shift_id=hrm_shift_mast.shft_slno
            //  where  em_no=? and date(punch_master.duty_day) between ? AND ?
            //  and hrm_shift_mast.night_off_flag=1 and duty_status>=1 and punch_master.noff_flag!=1`,

            `
            select hrm_shift_mast.night_off_flag,punch_master.shift_id,duty_status,duty_desc,duty_day,shft_desc,lve_tble_updation_flag,noff_flag,
             punch_in,punch_out,hrm_shift_mast.noff_min_days,hrm_shift_mast.noff_max_days
             from  punch_master 
             left join hrm_shift_mast on punch_master.shift_id=hrm_shift_mast.shft_slno
             where  em_no=? and date(punch_master.duty_day) between ? AND ?
             and hrm_shift_mast.night_off_flag=1 and duty_status>=1 and punch_master.noff_flag!=1
             `
            ,

            [
                data.em_no,
                data.fromDate,
                data.todate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },

    updatenightoff: (data, callBack) => {
        pool.query(
            `update punch_master 
             set lvereq_desc=?,
             duty_desc=?,
             duty_status=?,
             lve_tble_updation_flag=?
             where duty_day=? 
             and em_no=?`,
            [
                data.lvereq_desc,
                data.duty_desc,
                data.duty_status,
                data.lve_tble_updation_flag,
                data.duty_day,
                data.em_no
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    checkNOFFExistORNot: (data, callback) => {
        pool.query(
            `     
            select emp_id,emp_no,noff_req_date From night_off_request
        where emp_id=? and date(night_off_request.noff_req_date) =?
        and noff_cancel_satus=0
            `, [
            data.em_id,
            data.duty_day
        ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    updatePuchMastNoff: (data, callBack) => {
        pool.query(
            `update punch_master 
              set noff_flag=1           
              where duty_day between ? and ?
              and em_no=?`,
            [
                data.frmdate,
                data.todate,
                data.em_no
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },

    GetEmpBasedNOFF: (data, callBack) => {
        pool.query(
            `    SELECT noff_req_slno, emp_no, night_off_request.emp_id, em_dept, em_dept_sec, noff_req_date,
             hrm_emp_master.em_name,hrm_department.dept_name,hrm_duty_plan.attendance_update_flag,noff_cancel_satus
             FROM night_off_request 
             left join hrm_emp_master on hrm_emp_master.em_id=night_off_request.emp_id
             left join hrm_department on hrm_department.dept_id=night_off_request.em_dept
             left join hrm_duty_plan on hrm_duty_plan.emp_id=night_off_request.emp_id
             where night_off_request.emp_id=? and noff_cancel_satus=0
             group by emp_no,night_off_request.noff_req_date `,
            [
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {

                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    InserNOFFTable: (data, callback) => {
        pool.query(
            `INSERT INTO night_off_request (
              emp_no, emp_id, em_dept, em_dept_sec, noff_req_date, create_user      
               )
                VALUES(?,?,?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.dept,
                data.deptSec,
                data.duty_day,
                data.create_user

            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    CancelNightOff: (data, callBack) => {
        pool.query(
            `update punch_master 
             set lvereq_desc=?,
             duty_desc=?,
             duty_status=?,
             lve_tble_updation_flag=?
             where duty_day=? 
             and em_no=?`,
            [
                data.lvereq_desc,
                data.duty_desc,
                data.duty_status,
                data.lve_tble_updation_flag,
                data.duty_day,
                data.em_no
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    CancelPuchMastNoff: (data, callBack) => {
        pool.query(
            `update punch_master 
              set noff_flag=0          
              where duty_day between ? and ?
              and em_no=?`,
            [
                data.frmdate,
                data.todate,
                data.em_no
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    DeleteNOFF: (data, callBack) => {
        pool.query(
            `update night_off_request 
              set noff_cancel_satus=1,
              noff_cancel_remark=?,
              noff_cancel_user=?         
              where noff_req_slno=?`,
            [
                data.Remark,
                data.create_user,
                data.noff_req_slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    GetEmpDetailsByEmNo: (data, callBack) => {
        pool.query(
            `SELECT em_id,em_no,em_department,em_dept_section FROM hrm_emp_master where em_no=? `,
            [
                data.EmployeeNo
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },

    //punch processing


    getPunchDataEmpWiseDateWise: (data, callBack) => {
        pool.query(
            `SELECT 
            emp_code,
            punch_time,
            punch_state
        FROM punch_data
         left join hrm_emp_master on hrm_emp_master.em_no=punch_data.emp_code
        WHERE punch_time 
       BETWEEN ? AND ?
        AND emp_code =? `,
            [
                data.fromDate,
                data.todate,
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getPunchMasterDataEmptWise: (data, callBack) => {
        pool.query(
            `     SELECT 
            punch_slno,
            duty_day,
            shift_id,
            emp_id,
            punch_master.em_no,
            punch_in,
            punch_out,
            shift_in,
            shift_out,
            hrs_worked,
            late_in,
            early_out,
            duty_desc,
            duty_status,
            holiday_status,
            leave_status,
            lvereq_desc,
            em_name,
            dept_name,
            sect_name,
            lve_tble_updation_flag,
            noff_flag,
            noff_min_days,
            noff_max_days
        FROM punch_master 
        left join hrm_emp_master on hrm_emp_master.em_no=punch_master.em_no
        left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
        left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
        left join hrm_shift_mast on hrm_shift_mast.shft_slno=punch_master.shift_id
        WHERE duty_day 
        BETWEEN ? AND ?
        AND punch_master.em_no=?`,
            [
                data.fromDate,
                data.todate,
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}