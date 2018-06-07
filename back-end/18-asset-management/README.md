![cf](http://i.imgur.com/7v5ASc8.png) 18: Asset Management
===

## Learning Objectives
* Students will be able to upload static assets to AWS S3

## Resources
* Read [multer docs](https://github.com/expressjs/multer)
* Skim [aws-sdk s3 docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
* Create [AWS account](https://aws.amazon.com/)

## Outline

### AWS S3
Amazon Simple Storage Service (AWS S3) is simple but powerful cloud data storage solution. It can hold assets of any size. File assets can be uploaded to S3 Buckets. Buckets are essentially file systems that can hold files and folders. In an S3 Bucket, a filename is called a Key. Each asset in stored in a Bucket has a URI and specific permissions. If the asset has public read permissions, anyone can retrieve the asset using a `GET` request.

S3 is used for storing large data assets that databases can not handle. S3 is commonly used to host images, videos, audio, 3D models, CSV files, application files, binary executables, and much more.


### Benefits of AWS S3

In addition to bucket creation for managing your application and user assets, S3 provides the following helpers for managing your data:
  * downloadable data – download all of your data and/or enable others to do the same.
  * permissions – grant or deny access to others who want to upload or download data to/from your bucket(s).
  * standard interfaces – utilizes the REST interface and is designed to work with any internet based development toolkit.