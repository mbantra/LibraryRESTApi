const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const Book = require('./models/bookModel');
const bookService = require('./services/bookService');
const bookRouter = require("./routers/bookRouter")(Book, bookService);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/book', bookRouter);
//app.use('/api/author', authorRouter);
/* 
    firstName, lastName, country, age
*/

app.get('/', (req, res) => {
    res.send("Welcome to my Library API");
});

app.listen(process.env.PORT, () => {
    mongoose.connect(`${process.env.MONGO_LOCAL_CONN_URL}${process.env.MONGO_DB_NAME}`, {}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log(`Application is listening on ${process.env.PORT}`);
    }); 
});

//REST vs SOAP- WSDL - XML
//URL
//POST, PUT, PATCH, GET, DELETE
//CRUD Operations - Create Read Update Delete
//REST API URL DESIGN
// domain.com/api/getemployee
/*
domain.com/api/getemployee
domain.com/api/getemployeebyid
domain.com/api/getemployeebydepartment
domain.com/api/addnewemployee

domain.com/api/{entity}/{entity_id}
domain.com/api/employee
POST => AddEmployee()
domain.com/api/employee/{id} => Path Variable
                /api/employee/department

            /api/employee?department="IT"&firstname="Mike" => Query String
GET => GetEmployee()
GET => GetEmployeeById(int id)
domain.com/api/employee/{id}
PUT => UpdateEmployee(int id)
DELETE => DeleteEmployee(int id)



*/