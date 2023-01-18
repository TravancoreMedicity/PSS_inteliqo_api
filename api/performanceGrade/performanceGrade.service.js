const pool = require('../../config/database');
module.exports = {
    createPerformanceGrade: (data, callBack) => {
        pool.query(
            `INSERT INTO emp_performance_grade (
                p_score,
                p_grade,
                p_descrption,
                fixed_pay_inc,
                variable_pay_inc,
                p_status)
            VALUES (?,?,?,?,?,?);`,
            [
                data.p_score,
                data.p_grade,
                data.p_descrption,
                data.fixed_pay_inc,
                data.variable_pay_inc,
                data.p_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPerformanceGrade: (callBack) => {
        pool.query(
            `SELECT 
            pgrade_slno,
            p_score,
            grade.grade_desc as p_grade,
            case when p_descrption = 1 then 'Key Performer' when  p_descrption = 2 then 'Star Performer' when p_descrption=3 then 'Potential Performer' when p_descrption=4 then 'General Category' when p_descrption=5 then 'Need Improvement' when p_descrption=6 then 'Poor Performer' else 'Not Updated' end as 'p_descrption',
            fixed_pay_inc,
            variable_pay_inc,
            p_status
            FROM medi_hrm.emp_performance_grade 
            left join medi_hrm.grade on grade.grade_slno=emp_performance_grade.p_grade;	`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPerGradeByID: (id, callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.emp_performance_grade where pgrade_slno=?;	`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatePerformanceGrade: (data, callBack) => {
        pool.query(
            `UPDATE emp_performance_grade 
            SET p_score = ?,
                p_grade=?,
                p_descrption = ?,
                fixed_pay_inc =?,
                variable_pay_inc=?,
                p_status=?
            WHERE pgrade_slno = ?`,
            [
                data.p_score,
                data.p_grade,
                data.p_descrption,
                data.fixed_pay_inc,
                data.variable_pay_inc,
                data.p_status,
                data.pgrade_slno
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