const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors');
//    mongoose = require('mongoose'),
  //  config = require('./DB');

   const productRoute = require('./routes/product.route');
   
    const app = express();
    app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({
    //   extended: true
    // }));
    
    app.use(cors());
    app.use('/products', productRoute);
    const port = process.env.PORT || 4000;
    

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });