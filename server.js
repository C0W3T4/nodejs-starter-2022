import { createServer } from 'http';

// Create a local server to receive data from
const server = createServer();

// Listen to the request event
server.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });

  if (request.url === '/') {
    response.end(
      JSON.stringify({
        message: 'Home route!'
      })
    );
  }

  if (request.url === '/products') {
    response.end(
      JSON.stringify({
        message: 'Product route!'
      })
    );
  }

  if (request.url === '/users') {
    response.end(
      JSON.stringify({
        message: 'Users route!'
      })
    );
  }

  response.end(
    JSON.stringify({
      message: 'Route not found!'
    })
  );
});

server.listen(8000, () => console.log("Server is running at port 8000!!!"));
