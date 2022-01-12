const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const DiscussionRoutes =  require('./Routes/discussion.route');
//init app

const app = express();

// connect MongoDB with Mongoose

let dev_db_url = 'mongodb://127.0.0.1:27017/api_express_discussion';

let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect ( mongoDB );
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on ('error ', console.error.bind( console , 'Connexion error on MongoDB : '));
// Utilisation de body parser
app.use ( bodyParser.json () ) ;
app.use ( bodyParser.urlencoded({ extended : false }) );
//Routes
app.use('/discussion',DiscussionRoutes);
let port = 8090;


app.listen (
    port , () => {
        console.log('Server running on : ' + port );
    }
) ;