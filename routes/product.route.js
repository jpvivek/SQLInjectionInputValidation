// product.route.js

const express = require('express');
const app = express();
const productRoutes = express.Router();
const request = require('request');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;



// Require Product model in our routes module
const product = require('../models/Product');
let db = new  product("Product.db");

const myfunction = async function(req,res) {
  const data = JSON.stringify({

    query:"data.example.allow==true",
     input :{
       ProductName: req.body.ProductName,
       ProductDescription: req.body.ProductDescription,
       ProductPrice: req.body.ProductPrice
     }
   
     
 })
  console.log(data);
  
  fetch('http://localhost:8181/v1/data/example/allow', {
    body: data,
    //cache: 'no-cache', 
    headers: {
      //'user-agent': 'Mozilla/4.0 MDN Example',
      'Content-Type': 'application/json'
    },
    method: 'POST' // *GET, POST, PUT, DELETE, etc.
  }).then(response => response.json())
  .then(response => {
  
    res.send(response);
    console.log(response);
    // response;
  
  }).catch(function(err) {
    //console.log(err);
  })
 .done();

//  console.log(sentiment);
  
  
  
}





// Defined store route
productRoutes.route('/query').post(async function (req, res) {

  await myfunction(req,res);
  //console.log(result);
  
//   const options = {
//     url: 'http://localhost:8181/v1/data/example/allow',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

  
  
//   request.post(options, data, (error, response, body) => {
//   if (error) {
//     console.error(error)
//     return
//   }
//   console.log(`statusCode: ${response.statusCode}`)
//   //console.log(response.data)
//   console.log(body.JSON)
  // var data = ''
  // response.setEncoding('utf8')
  // response.on('data', function(d) {
  //   data += d
  // })
  // response.on('end', function(d) {
  //   console.log(data)
  //   res.send(data)
  // })
  //res.json(body)
//})


});


// Defined store route
productRoutes.route('/add').post(function (req, res) {
    db.create(req,res).then(product => {
        res.status(200).json({'Product': 'Product has been added successfully'});        
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
    
  
});

// Defined get data(index or listing) route
productRoutes.route('/').get(function (req, res) {    
    //console.log("hiii")
    db.get(res);
    //console.log(c)
    //res.send(c);
    //console.log("end")
});

// Defined edit route
productRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    db.getById(id).then(function(data){
        console.log(data)
        let pro={
            ProductId:data.id,
            ProductName : data.name,
            ProductDescription : data.description,
            ProductPrice:data.price
        }
        res.json(pro);

    });

});

//  Defined update route
productRoutes.route('/update/:id').post(function (req, res) {    
    db.getById(req.params.id).then(function( product) {        
      if (!product)
        res.status(404).send("Record not found");
      else {
        
        db.updateById(req,res).then(product => {
            res.json('Update complete');
        })
        
      }
    });
  });
  
// Defined delete | remove | destroy route
productRoutes.route('/delete/:id').get(function (req, res) {
    db.getById(req.params.id).then(function( product) {        
        if (!product)
          res.status(404).send("Record not found");
        else {
          
          db.removeById(req,res).then(product => {
              console.log(product)
              res.json('Successfully removed');
          })
          
        }
      });
});
module.exports = productRoutes;