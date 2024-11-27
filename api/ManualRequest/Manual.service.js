const pool = require('../../config/database');

module.exports = {
    getManualReqstBtwDate: (data, callBack) => {
        pool.query(
            `SELECT 
            manual_request_log.em_no,
            em_name, dept_name,
            sect_name, duty_date,lvereq_desc,remrk
             FROM manual_request_log 
             left join hrm_emp_master on hrm_emp_master.em_id=manual_request_log.em_id
             inner join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
             inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
             where duty_date between ? and ? and delete_status=0`,
            [
                data.fromdate,
                data.todate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateManualRequest: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` UPDATE punch_master
                    SET punch_in = ?,
                        punch_out = ?,
                        hrs_worked =0,
                        late_in = 0,
                        early_out = 0,
                        duty_status=1,
                        duty_desc=?,
                        lvereq_desc=?,
                        leave_status=1,
                        lve_tble_updation_flag = 1,
                        manual_request_flag=1
                    WHERE punch_slno = ? `,
                    [val.punch_in, val.punch_out, val.duty_desc, val.lvereq_desc, val.punch_slno],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })

        })
    },
    createManualrequestLog: (data, callBack) => {
        pool.query(
            `INSERT INTO manual_request_log 
                    (
                    em_id,
                    em_no,
                    duty_date,
                    lvereq_desc,
                    duty_desc,
                    create_user,
                    remrk,
                    punch_slno,
                    filename
                    ) 
                VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getManualRequestAll: (callBack) => {
        pool.query(
            `SELECT 
            manual_slno,
            manual_request_log.em_no,
            manual_request_log.em_id,
            em_name,
            duty_date,
            lvereq_desc,
            duty_desc,
            punch_slno,
            manual_request_date,
            filename
            FROM manual_request_log
            left join hrm_emp_master on hrm_emp_master.em_id=manual_request_log.em_id
            where delete_status=0 order by manual_request_log.manual_request_date DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    InactiveManualrequest: (data, callBack) => {
        pool.query(
            `UPDATE manual_request_log 
            SET delete_status=1,
            delete_comments=?,
            delete_user=?,
            delete_date=? 
            where manual_slno=? `,
            [
                data.delete_comments,
                data.delete_user,
                data.delete_date,
                data.manual_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deletePunchMasterSingleRow: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET punch_in = ?,
                punch_out = ?,
                hrs_worked =?,
                late_in = ?,
                early_out = ?,
                duty_status=?,
                duty_desc=?,
                lvereq_desc=?,
                leave_status=?,
                lve_tble_updation_flag = 0
            WHERE punch_slno = ? `,
            [
                data.punch_in,
                data.punch_out,
                data.hrs_worked,
                data.late_in,
                data.early_out,
                data.duty_status,
                data.duty_desc,
                data.lvereq_desc,
                null,
                data.punch_slno,
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