const pool = require('../../config/database');
module.exports = {
    getattendancemark: (data, callBack) => {

        pool.query(
            `SELECT punch_slno, 
            duty_day,shift_in,shift_out, 
             emp_id, shift_id,
             em_no, 
             punch_in,
             punch_out,  
             duty_worked, 
             hrs_worked, 
             over_time,
             late_in, 
             early_out, 
             holiday_flag,
             offday_falg,
             duty_status,
             ot_request_flag, mis_punch_flag,
             ifnull(lvreq_type,0)lvreq_type, leave_type,updation_flag,
             sublvreq_type 
             FROM punch_master where emp_id=? and duty_day between ? and ?`,
            [data.emp_id,
            data.start,
            data.end
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getattendancetotal: (data, callBack) => {
        pool.query(
            `SELECT 
            emp_id,
            punch_master.em_no,
            sum(hrs_worked)hrs_worked,
            sum(over_time)over_time,
            ifnull( sum(duty_status),0)duty_status,
            gross_salary,
            sum(if(duty_desc='A' and leave_status=0,1,0)) as duty_statuslop,
            sum(if(duty_desc='LV' and leave_status=1,1,0)) as noofleaves
            FROM punch_master
             left join hrm_emp_master on hrm_emp_master.em_id=punch_master.emp_id
            where emp_id=? and duty_day between ? and ?
              group by emp_id,punch_master.em_no;`,
            [
                data.emp_id,
                data.start,
                data.end
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getnightoffdata: (data, callBack) => {
        pool.query(
            // `select hrm_shift_mast.night_off_flag,shift_id,duty_status,duty_desc from  punch_master
            //  left join hrm_shift_mast on punch_master.shift_id=hrm_shift_mast.shft_slno
            //  where  em_no=? and date(punch_master.duty_day) between ? AND ?
            //  and hrm_shift_mast.night_off_flag=1 and duty_status>=1 and punch_master.noff_flag!=1`,
            `
               select hrm_shift_mast.night_off_flag,shift_id,duty_status,duty_desc,duty_day,shft_desc,lve_tble_updation_flag,noff_flag,
             punch_in,punch_out
             from  punch_master 
             left join hrm_shift_mast on punch_master.shift_id=hrm_shift_mast.shft_slno
             where  em_no=? and date(punch_master.duty_day) between ? AND ?
             and hrm_shift_mast.night_off_flag=1 and duty_status>=1 and punch_master.noff_flag!=1 `,
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
    // `select hrm_shift_mast.night_off_flag,shift_id,duty_status,duty_desc from  punch_master
    // left join hrm_shift_mast on punch_master.shift_id=hrm_shift_mast.shft_slno
    // where  em_no=? and date(punch_master.duty_day) between ? and ?
    //  and hrm_shift_mast.night_off_flag=1 and duty_status>=1 and punch_master.noff_flag!=1`,

    // `SELECT night_off_flag, shift_id, duty_status FROM medi_hrm.punch_master
    // left join hrm_shift_mast on punch_master.shift_id=hrm_shift_mast.shft_slno
    // where emp_id=? and date(duty_day)between ? and ? and night_off_flag=1;`,

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
           select hrm_shift_mast.night_off_flag,shift_id,duty_status,duty_desc,duty_day,shft_desc,lve_tble_updation_flag,noff_flag,
             punch_in,punch_out
             from  punch_master 
             left join hrm_shift_mast on punch_master.shift_id=hrm_shift_mast.shft_slno
             where  em_no=? and date(punch_master.duty_day) =? and duty_desc='NOFF'
             and punch_master.lve_tble_updation_flag=1 and duty_status=1
            `, [
            data.em_no,
            data.requiredate
        ],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    // checkNoFF: (data, callBack) => {
    //     pool.query(
    //         `select hrm_shift_mast.night_off_flag,shift_id,duty_status,duty_desc,duty_day,shft_desc,lve_tble_updation_flag,noff_flag,
    //          punch_in,punch_out
    //          from  punch_master 
    //          left join hrm_shift_mast on punch_master.shift_id=hrm_shift_mast.shft_slno
    //          where  em_no=? and date(punch_master.duty_day) =? and duty_desc='NOFF'
    //          and punch_master.lve_tble_updation_flag=1 and duty_status=1`,
    //         [
    //             data.em_no,
    //             data.requiredate
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     )

    // },
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
    getattendancetotalEmployee: (data, callBack) => {
        pool.query(
            `SELECT 
            emp_id,
            punch_in,
            punch_out, 
            em_no,  
           ifnull( sum(duty_worked),0) duty_worked,
            sum(hrs_worked)hrs_worked, 
            sum(over_time)over_time,
            count(if(ifnull(duty_status,0)=0,duty_status,null))duty_statuslop,
            count(if(leave_type!=0,leave_type,null))leave_type,
            sum(late_in)late_in, 
            sum(early_out)early_out, 
           ifnull( sum(duty_status),0)duty_status,
           sum(offday_falg)offday,
            FROM punch_master 
            where emp_id IN(?) 
            and duty_day between ? and ?
             group by emp_id, em_no`,
            [
                data.emp_id,
                data.start,
                data.end
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    GetNoffDetails: (data, callBack) => {
        pool.query(
            `select punch_master.em_no,punch_master.emp_id,duty_day, lvereq_desc,duty_desc,duty_status,lve_tble_updation_flag,
             hrm_department.dept_name,hrm_emp_master.em_name
             from punch_master
             left Join hrm_emp_master on hrm_emp_master.em_id=punch_master.emp_id
             left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
             where punch_master.em_no=? and lve_tble_updation_flag=1`,
            [
                data.emp_no
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