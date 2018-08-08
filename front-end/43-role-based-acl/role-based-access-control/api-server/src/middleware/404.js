'use strict';

// Custom 404 Handler because we always want to return a JSON response
export default (req,res,next) => {
  let error = {error:'Resource Not Found'};
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};
