const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//Connect Mysql Database
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'reginfo',
    port:3306
});

//check database connection
db.connect(err => {
    if(err)
    {
        console.log('err');
    }
    console.log("Database connection successfull!!");
});

//get All data
app.get('/users',(req,res)=>{
    //console.log("Get All users");
    let qrr = `SELECT * FROM users`;
    db.query(qrr,(err,results)=> {
        if(err)
        {
            console.log(err,'errs');
        }
        if(results.length>0)
        {
            res.send({
                message: "All users Data",
                data:results
            });
        }
    });
});

//Get single data by ID
app.get('/users/:id',(req,res)=>{
    //console.log(req.params.id);
    let qrId = req.params.id;
    let qr = `SELECT * FROM users where id = ${qrId}`;
    db.query(qr,(err,results)=>{
        if(err)
        {
            console.log(err);
        }
        if(results.length>0)
        {
            res.send({
                message:"Get data by ID",
                data:results
            });
        }
        else
        {
            res.send({
                message:"Data not found Here!"
            })
        }
    });
});

//Post Data
app.post('/users',(req,res)=>{
    //console.log(req.body,'Post data succesfull');
    let firstname = req.body.FirstName;
    let lastname = req.body.LastName;
    let email = req.body.Email;
    let phone = req.body.Phone;
    let orgnizationname = req.body.OrgnizationName;
    let orgnizationadd = req.body.OrgnizationAdd;
    let password = req.body.Password;
    let Id = req.body.id;

    let qr = `insert into users(FirstName,LastName,Email,Phone,
        OrgnizationName,OrgnizationAdd,Password,id)
        value('${firstname}','${lastname}','${email}','${phone}','${orgnizationname}','${orgnizationadd}','${password}','${Id}')`;

        db.query(qr,(err,results)=>{
            if(err)
            {
                console.log(err);
            }
            res.send({
                message:"Data creted Successfully",
                data:results

            });

        });
});

//Update data
app.put('/users/:id',(req,res)=>{
    //console.log(req.body,"updated data");

    let firstname = req.body.FirstName;
    let lastname = req.body.LastName;
    let email = req.body.Email;
    let phone = req.body.Phone;
    let orgnizationname = req.body.OrgnizationName;
    let orgnizationadd = req.body.OrgnizationAdd;
    let password = req.body.Password;
    let uID = req.params.id;

    let qr = `update users set FirstName = '${firstname}', LastName = '${lastname}',Email = '${email}',
    Phone = '${phone}',OrgnizationName = '${orgnizationname}',OrgnizationAdd = '${orgnizationadd}',Password = '${password}'
    where id = '${uID}'`;

    db.query(qr,(err,results)=>{
        if(err)
        {
            console.log(err);
        }
        res.send({
            message:"Data Updated Successfully",
            data:results
        })
    });
});

//delete data
app.delete('/users/:id',(req,res)=>{
    let uID = req.params.id;
    let qr = `delete from users where id = '${uID}'`;

    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"Data Deleted successfully"
        })
    });
});

app.listen(3000, () => {
    console.log("Server is running on 3000 PORT");
});