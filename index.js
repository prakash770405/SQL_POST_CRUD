const express = require("express");
const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");

const app = express();

let port = 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Mysql2',
    password: 'prakash@123'
});



function getrandomuser() {

    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.image.avatar(),
        faker.internet.password()
    ];
}




app.get("/", (req, res) => {
    connection.query('SELECT * from randomdata', (error, results) => {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.render("home.ejs", { results });
    });
})

app.get("/post/:Id", (req, res) => {
    let { Id } = req.params;
    console.log(Id);
    connection.query(`SELECT * from randomdata WHERE Id='${Id}'`, (error, results) => {
        if (error) throw error;
        console.log('The solution is: ', results);
        let data = results[0];
        res.render("editpost.ejs", { data });
    });
})

app.patch("/post/:Id", (req, res) => {
    let { Id } = req.params;
    let {password}=req.body;
    console.log(password); 
    console.log(Id);
    connection.query(`SELECT * from randomdata WHERE Id='${Id}'`, (error, results) => {
        if (error) throw error;
        // connection.query(`UPDATE randomdata SET password='${newpass}' WHERE Id='${Id}'`, (error, results) => {
        //     if (error) throw error;
        //     console.log('The solution is: ', results);
        //     let data = results[0];
        //     res.render("editpost.ejs", { data });
        // });

    });
})



app.get("/input", (req, res) => {

    let q = 'INSERT INTO randomdata (Id, Name, Email, images, password) values ?';
    let users = [];

    for (let i = 0; i < 30; i++) {
        users.push(getrandomuser());
    }
    connection.query(q, [users], (error, results) => {
        if (error) {
            console.log(error);
            return res.send("Insert failed");
        }

        console.log(results);

        res.send("5 random users inserted successfully");
    });

})






app.listen(port, (req, res) => {
    console.log(`app is listening on port http://localhost:${8080}`);
})