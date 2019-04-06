var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');
var app = express();
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "auditdb",
});

con.connect((err) => {
    if (err) throw err;
    else {
        console.log('connected');
    }
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.post('/user', (req, res) => {
    const email = req.body.emailng
    const password = req.body.passwordng
    console.log(email, password);
    bcrypt.hash(password, saltRounds, function (err, hash) {

        var sql = 'insert into user (email,password) values ("' + email + '","' + hash + '")'
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    status: 400
                })
            }
            else {
                res.json({
                    success: true,
                    status: 200
                })
                console.log('one row added');
            }
        })
    });
})

app.post("/login", (req, res) => {      
    const email = req.body.emailng;
    const pass = req.body.passwordng;
    var queryy = 'SELECT * from user where email="' + email + '"';

    con.query(queryy, (err, result) => {
        if (err)
            console.log(err)
        // res.send('Insert success.');
        else {
            console.log(result);
            if (result.length == 0) {
                res.json({
                    status: 404,
                    success: false
                })
            }
            else if (result.length == 1) {
                
                    if (result[0].password == pass) {
                        res.json({
                            status: 200,
                            success: true
                        })
                    }
                    else {
                        res.json({
                            success: false,
                            status: 400
                        })
                      
                    }
                }
                else{
                    res.json({
                        success: false,
                        status: 400
                    })
               
            }
          
        }
    })

}
)

app.listen(process.env.PORT || 3000);