const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/user-routes');
const cors = require('cors')
dotenv.config();

const PORT  = process.env.PORT
const app = express();

const mysql = require('mysql2');

const setupAndStartServer = ()=>{
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }));
    app.use( bodyParser.json());
    app.use( bodyParser.urlencoded({extended:true})) ;
    app.use('/api/' , routes);

    app.listen(PORT ,()=>{
        console.log( `Server started at port - ${PORT} `)
    });

}

setupAndStartServer();

