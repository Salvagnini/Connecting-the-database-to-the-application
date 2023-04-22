import express from 'express';
import mongoose from 'mongoose';
import { productSchema } from './model/product.js';
import { nameSchema } from './model/name.js';

const url = 'mongodb://127.0.0.1:27017/shop';
// const url = 'mongodb://127.0.0.1:27017/27017?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0/shop'
const PORT = 3000;

const app = express();

const connection = mongoose.createConnection(url, {maxPoolSize: 10})

const Product = connection.model('products', productSchema);
const Name = connection.model('customers', nameSchema);

connection.on('open', () => {
    console.log('Connected to the database!');
    app.listen(PORT, ()=> {
        console.log(`Server started on http://localhost:${PORT}`);
    })
  });
  
  connection.on('error', (err) => {
    console.error(`Database connection error: ${err}`);
  });

  
  app.get("/", (req, res) => {
      Product.find()
    .then((products) => {
        const productsHtml = products.map((product) => `
            <div style="border: 1px solid #000; 
                width: fit-content; 
                margin: 0 0 20px 0; 
                padding: 0 10px">
                
                <p> ${product.title} Price: ${product.price}</p>
            </div>
         `);
            const html = `<h1>Users purchases:</h1> ${productsHtml.join("")}`;
            res.send(html);
    })
      
    .catch((error) => {
      console.error(error);
    });
      
      
  });

  