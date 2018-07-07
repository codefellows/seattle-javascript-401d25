import fs from 'fs-extra';
import logger from './logger';


const s3Upload = (path, key) => {
  const aws = require('aws-sdk');
  const amazonS3 = new aws.S3();
  const uploadOptions = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ACL: 'public-read',
    Body: fs.createReadStream(path), // sends data of file one chunk at a time
  };

  // amazonS3's upload method expects an argument of the above options
  return amazonS3.upload(uploadOptions)
  // this is amazonS3's internal way of promisifying their callback functions
    .promise()
    .then((response) => {
      logger.log(logger.INFO, `RECEIVED RESPONSE FROM AWS: ${JSON.stringify(response, null, 2)}`);
      return fs.remove(path)
        .then(() => response.Location) // this returns the generated AWS S3 bucket URL for our file after a successful upload to S3
        .catch(err => Promise.reject(err));
    }) 
    .catch((err) => {
      return fs.remove(path)
        .then(() => Promise.reject(err))
        .catch(fsErr => Promise.reject(fsErr)); 
    });
};

const s3Remove = (key) => {
  const aws = require('aws-sdk');
  const amazonS3 = new aws.S3();
  const removeOptions = {
    Key: key,
    Bucket: process.env.AWS_BUCKET,
  };
  return amazonS3.deleteObject(removeOptions).promise();
};

export { s3Upload, s3Remove };

