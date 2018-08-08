'use strict';

// Custom Error Handler because we always want to return a JSON response
export default  (err,req,res,next) => {
  let error = {error:err};
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};
