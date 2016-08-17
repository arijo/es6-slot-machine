import express from 'express';
import outcomes from './outcomes'; 

let server = express();

server.use(express.static('public'));

server.get('/outcomes', function(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=-1');
  res.json(outcomes(req.query.win));  
});

server.listen(8080, function() {
  console.log('Server is running ...');
});


