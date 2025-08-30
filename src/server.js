const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/user-routes');
dotenv.config();

const PORT  = process.env.PORT
const app = express();

const setupAndStartServer = ()=>{
    app.use( bodyParser.json());
    app.use( bodyParser.urlencoded({extended:true})) ;
    app.use('/api/' , routes);

    app.listen(PORT ,()=>{
        console.log( `Server started at port - ${PORT} `)
    });

}

setupAndStartServer();
