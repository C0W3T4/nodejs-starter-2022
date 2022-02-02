import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({
    message: 'Home route!'
  })
});

app.get('/products', (request, response) => {
  return response.json({
    message: 'Products route!'
  })
});

app.get('/users', (request, response) => {
  return response.json({
    message: 'Users route!'
  })
});

app.listen(8000, () => console.log("Server is running at port 8000!!!"));
