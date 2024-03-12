const pool = require('../../config/database');
const moment = require('moment');
module.exports = {
    getleavereq: (callBack) => {
        pool.query(
            `            SELECT 
            ROW_NUMBER() OVER () as rslno,
            leave_slno,
            dept_section,
            hrm_leave_request.lve_uniq_no,
                leave_date,
                hrm_leave_request.em_no,
                dept_name,
                em_name ,
                   sect_name,
                   leavetype_name,
                   leave_name,
                inc_apprv_req,
                incapprv_status,
                hod_apprv_req,
                hr_aprrv_requ,
                hr_apprv_status,
                hr_apprv_cmnt,
                longleave_spclleave,
                leavetodate,
                leave_reason,
                no_of_leave,
                hod_apprv_status,
                hod_apprv_cmnt,
                hod_apprv_time,
                inc_apprv_cmnt,
                ceo_req_status,
                ceo_apprv_status,
                request_date,
                hrm_leave_request.dept_id
                FROM hrm_leave_request 
                inner join hrm_emp_master on  hrm_leave_request.em_no =hrm_emp_master.em_no
                inner join hrm_department on  hrm_leave_request.dept_id =hrm_department.dept_id
                inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
                inner join hrm_leave_request_detl ON hrm_leave_request_detl.lve_uniq_no = hrm_leave_request.lve_uniq_no
                where  lv_cancel_status=0  and lv_cancel_status_user=0;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getHalfday: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as rslno,
            half_slno,
            planslno,
            dept_name,
            hrm_halfdayrequest.em_no,
            em_name,
            sect_name,
            hf_incapprv_status,
            dept_section, 
            hf_inc_apprv_req,
            hf_incapprv_status,
            hf_hod_apprv_req,
            hf_hod_apprv_status,
            hf_hr_aprrv_requ,
            hf_hr_apprv_status,
            hf_ceo_apprv_status,
            hf_ceo_req_status,
            hf_inc_apprv_cmnt,
            hf_hod_apprv_cmnt,
            hf_hr_apprv_cmnt,
            requestdate,
            leavedate,
            month,		
            checkIn,
            checkOut,
            hf_reason,
            hrm_halfdayrequest.dept_id
            FROM hrm_halfdayrequest
            inner join hrm_emp_master on  hrm_halfdayrequest.em_no =hrm_emp_master.em_no
            inner join hrm_department on  hrm_halfdayrequest.dept_id =hrm_department.dept_id
			inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where  lv_cancel_req_status_user=0 and lv_cancel_status_user=0`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getNopunchReq: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as rslno,
            nopunch_slno,
            plan_slno,
            shift_id,
            nopunchrequest.em_no,
            punslno,dept_name,
            np_incapprv_status, 
            em_name,
            sect_name,
            nopunchrequest.em_dept_section, 
            np_inc_apprv_req,
            np_incapprv_status,
            np_hod_apprv_req,
            np_hod_apprv_status,
            np_hr_aprrv_requ,
            np_hr_apprv_status,
            np_ceo_apprv_status,
            np_ceo_req_status,
            np_reason,
            np_inc_apprv_cmnt,
            np_hod_apprv_cmnt,
            np_hr_apprv_cmnt,
            nopunchdate,
            checkintime,
            checkouttime,
            checkinflag,
            checkoutflag,
            creteddate,
            nopunchrequest.em_department
            FROM nopunchrequest
            left join hrm_emp_master on  nopunchrequest.em_no =hrm_emp_master.em_no
            left join hrm_department on  nopunchrequest.em_department =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where lv_cancel_req_status_user=0 and lv_cancel_status_user=0;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getCoffReq: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as rslno,
            cmp_off_reqid,
            shift_id,
			comp_off_request.em_no,
            em_name,
			comp_off_request.em_dept_section,
			dept_name,
            leave_date,
            sect_name,
             durationpunch,
            reqtype_name,
            cf_reason,
            reqestdate,
            cf_inc_apprv_req,
            cf_incapprv_status,
            cf_hod_apprv_req,
            cf_hod_apprv_status,
            cf_hr_apprv_status,
            cf_hr_aprrv_requ,
            cf_ceo_req_status,
            cf_ceo_apprv_status,
            cf_inc_apprv_cmnt,
            cf_hod_apprv_cmnt,
            cf_hr_apprv_cmnt,
            comp_off_request.em_department
            FROM comp_off_request 
            left join hrm_emp_master on  comp_off_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  comp_off_request.em_department =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where  lv_cancel_status=0 and lv_cancel_status_user=0;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}