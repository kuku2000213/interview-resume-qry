const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise')

/* GET users listing. */

const connection = mysql.createPool({
  host: 'localhost',
  port: '43307',
  database: 'db_name',
  user: 'root',
  password: 'rootpassword'
})

router.get("/:id", async (req, res) => {

  let query = `select 
                    resume_uuid as id,
                    user_uuid as userId,
                    resume_content as content,
                    resume_title as title,
                    resume_recorded_date as recordedDate,
                    resume_modified_date as modifiedDate,
                    resume_state as state
                    from resume 
                    where user_uuid = ?
                    order by resume_recorded_date desc`

  let resumes = await connection.execute(query, [req.params.id])

  res.json({
    statusCode: 200,
    responseMessage: "이력서가 정상적으로 조회되었습니다.",
    data: resumes[0]
  })
})

router.get("", async (req, res) => {

  let query = `select 
                    resume_uuid as id,
                    user_uuid as userId,
                    resume_title as title,
                    resume_modified_date as modifiedDate
                from resume 
                where resume_state = 'MAIN'
                order by resume_modified_date desc`

  let resumes = await connection.execute(query)

  res.json({
    statusCode: 200,
    responseMessage: "이력서가 정상적으로 조회되었습니다.",
    data: resumes[0]
  })
})


router.get("/main/:id", async (req, res) => {

  let query = `select
                 resume_uuid as id,
                 user_uuid as userId,
                 resume_content as content,
                 resume_title as title,
                 resume_recorded_date as recordedDate,
                 resume_modified_date as modifiedDate
               from resume
               where resume_uuid = ?
               and resume_state = 'MAIN'
               order by resume_recorded_date desc`

  let resume = await connection.execute(query, [req.params.id])

  res.json({
    statusCode: 200,
    responseMessage: "이력서가 정상적으로 조회되었습니다.",
    data: resume[0][0]
  })
})




module.exports = router;