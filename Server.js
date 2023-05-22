const sathish = require('express');
const mysql = require("mysql");
const Router=sathish();
const bodyparser=require('body-parser');
const req = require('express/lib/request');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');


// Database Connectivity
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"sakila"
});
try{
    con.connect 
    console.log("Sucessfully connected to the database");
}catch{
    console.log("Database Connection Error");
}

// Router.get(skparser.urlencoded());
// Router.use(skparser.json());

Router.use(
    bodyparser.urlencoded({
      // bodyParse
      extended: false,
    })
  );
Router.use(bodyparser.json());
Router.get("/Electro", function (req, res) {
    res.sendFile(__dirname + "/" + "login.html");
    console.log("Running Succesfully");

  });
console.log("hi");
Router.post("/Details", (req, res) => {
    const checker = req.body.Voter_Id;
    console.log("entered Post Method");
    const { Voter_Id, Adhar_No,Passwordd } = req.body;
    console.log("Func excecuted ");
    con.query(
      "SELECT * FROM adminportal WHERE Voter_Id = ? AND Adhar_No = ? AND Passwordd=?",
      [Voter_Id, Adhar_No,Passwordd],
      (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
          console.log("first True");
        //   res.sendFile(__dirname + "/" + "Details.html");
          if(Voter_Id=="20ME122"){
            console.log("Proceed to Vote");
            res.sendFile(__dirname + "/" + "Citizen.html");
            Router.post("/vote",(req,res)=>{
              console.log("Server Entered Voting Site");
              res.sendFile(__dirname + "/" + "vote.html");
          });

          }else{
            res.send("<h1> <span>You Are Not Authorized to Vote Err 404</span></h1>");
          }



        } else {
            console.log(checker);
          console.log("error");
          res.send(`<h1><span style="background-color:lightgreen; text-align:centre" >User Name/Password Wrong</span></h1>
          `);
          // res.redirect("/index")
        }
      }
    );
  });
  Router.post("/submit", (req, res) => {
    const a = req.body.candidate_name;
    const b = req.body.Constituency;
    const c = req.body.Voted_Party;
    const d = "Voted";
    console.log(a);
    console.log(b);
    console.log(c);
      console.log("Database connected");
      const sql = "INSERT INTO record (candidate_name, Constituency, Voted_Party , statuss) VALUES (?, ?, ?, 'Voted')";
      con.query(sql, [a, b, c], function(err, result) {
        if (err) throw err;
        console.log("Data successfully inserted into store table");

        // res.send(`<h3>Your Request Has Been Successfuly submitted</h3>`);
        res.sendFile(__dirname + "/" + "survey.html");
      });
    });
    Router.post("/submit",(req,res)=>{
      res.sendFile(__dirname + "/" + "Thanku.html");
      
    })

try{
 Router.listen(5050);
}catch{
    console.log("Error");
}