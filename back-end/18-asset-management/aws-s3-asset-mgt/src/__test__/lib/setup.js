'use strict';

// the whole point of this module is to mock out the AWS S3 methods in our testing environment so we are not actually making real API calls to our real S3 bucket
import faker from 'faker';
import * as awsSDKMock from 'aws-sdk-mock';

// these callbacks also use (error, data) signature
// params will be whatever args that the original S3 method expects
awsSDKMock.mock('S3', 'upload', (params, callback) => {
  if (!params.Key || !params.Bucket || !params.Body || !params.ACL) {
    return callback(new Error('SETUP AWS MOCK ERROR: key, bucket, body, or ACL required'));
  }

  if (params.ACL !== 'public-read') {
    return callback(new Error('SETUP AWS MOCK ERROR: ACL should be public-read'));
  }

  if (params.Bucket !== process.env.AWS_BUCKET) {
    return callback(new Error('SETUP AWS MOCK ERROR: wrong bucket'));
  }
  return callback(null, { Location: faker.internet.url() });
});

awsSDKMock.mock('S3', 'deleteObject', (params, callback) => {
  if (!params.Key || !params.Bucket) {
    return callback(new Error('SETUP AWS MOCK ERROR: key and bucket required'));
  }
  if (params.Bucket !== process.env.AWS_BUCKET) {
    return callback(new Error('SETUP AWS MOCK ERROR: wrong bucket'));
  }
  return callback(null, 'SUCCuSSFUL DELETION');
});

