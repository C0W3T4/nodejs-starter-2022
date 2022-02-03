import express from 'express';
import { randomUUID } from 'crypto';
import fileSystem from 'fs';

const app = express();

app.use(express.json());

let products = [];

fileSystem.readFile("products.json", "utf-8", (error, data) => {
  error 
  ? console.log("Error: ", error) 
  : products = JSON.parse(data);
});

app.get('/', (request, response) => {
  return response.json({
    message: 'Home route!'
  });
});

app.get('/products', (request, response) => {
  return response.json(products);
});

app.get('/products/:id', (request, response) => {
  
  const { id } = request.params;

  const product = products.find(product => product.id === id);

  return response.json(product);
});

app.put("/products/:id", (request, response) => {
  
  const { id } = request.params;
  const { name, price } = request.body;

  const productIndex = products.findIndex(product => product.id === id);

  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  };

  writeProductsFile();

  return response.json({
    message: 'The product has been updated successfully!'
  });
});

app.post('/products', (request, response) => {
  
  const { name, price } = request.body;

  const product = {
    id: randomUUID(),
    name,
    price
  };

  products.push(product);

  writeProductsFile();

  return response.json({
    message: "The product has been inserted successfully!",
    product: product
  });
});

app.delete('/products/:id', (request, response) => {
  
  const { id } = request.params;

  const productIndex = products.findIndex(product => product.id === id);

  products.splice(productIndex, 1);

  writeProductsFile();

  return response.json({
    message: 'The product has been deleted successfully!'
  });
});

function writeProductsFile() {
  fileSystem.writeFile("products.json", JSON.stringify(products), (error) => {
    error 
    ? console.error("Error: ", error) 
    : console.log("Changes have been made successfully!");
  });
}

app.get('/users', (request, response) => {
  return response.json({
    message: 'Users route!'
  });
});

app.listen(8000, () => console.log("Server is running at port 8000!!!"));
