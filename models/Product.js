const sqlite3 = require('sqlite3')
const Promise = require('bluebird')
const pro = require('../models/Product');


class Product {
  constructor(dbFilePath) {
    this.db =  new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
  }
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }

  create(req,res) {    
    return this.run(
      `INSERT INTO Products (name, description, price)
        VALUES (?, ?, ?)`,
      [req.body.ProductName, req.body.ProductDescription, req.body.ProductPrice])
  }
  updateById(req,res) {        
    return this.run(
      `UPDATE Products SET name = ?, description = ?, price = ? WHERE id = ?`,
      [req.body.ProductName, req.body.ProductDescription, req.body.ProductPrice,req.params.id])
  }
  removeById(req,res) {       
    return this.run(
      `DELETE FROM Products WHERE id = ?`,
      [req.params.id])
  }
  getOne(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  getById(id){
  //  console.log(req.params.id)
    //let id = 1;
    return this.getOne(
      `SELECT * FROM Products WHERE id = ?`,
      [id])

  }
   
get (res){
    let productObj={};
    let product=[];
    let sql = `SELECT * FROM Products
           ORDER BY name`;

this.db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    let pro={
      ProductId:row.id,
      ProductName : row.name,
      ProductDescription : row.description,
      ProductPrice:row.price
  }
    product.push(pro);
  //  console.log(product);
  });
  productObj=product;
  res.send(product);
});



// close the database connection
//this.db.close();    
  }

  save (req,res){
    
  }
}

module.exports = Product