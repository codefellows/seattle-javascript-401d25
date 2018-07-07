# MVP Requirements for Mid-Term Project, Seattle Javascript 401d25

## Canvas Assignment Rubric, due by *July 16, 11:59 p.m.*
* [View the rubric on Canvas.](https://canvas.instructure.com/courses/1343256/assignments/8637253)
* Ignore any wording regarding "Python", the rubric is still applicable to this class

## Model Requirements
  * Groups must have a minimum of **3** models in addition to the Account/Profile models provided in class
  * Models must be appropriately named, e.g. a model that represents a cat should be named `Cat`. 
  * You must have a minimum of **2** one-to-many relationships betwen models. E.g. a user can have many cats, and one cat can have many kittens. 
  * Many-to-many relationships are not discouraged, but please remember that MongoDB is not optimized for many-to-many relationships. [Read more here](http://learnmongodbthehardway.com/schema/schemabasics/) if you're interested in implementing a many-to-many relationship.
  * If you intend to use pre/post-hooks, that logic should be placed inside your Model.  

## Testing Requirements
* Groups must achieve at least **85%** test coverage on their app
* Full-CRUD should be tested on **ALL** your resources, including Account and Profile. Make a design choice on how you wish to implement deletion on the **Account** resource. I.e., should you delete the account AND all its associated resources, or should you abort the deletion if there are associated resources?
* Utilize [async/await](https://javascript.info/async-await) in all your Jest tests
* Implement proper setup and teardown of your test environments (i.e. proper creation of mock resources and removal of those resources after tests are done)
* **Load Testing is Required**
  * Load test at least **2** routes using [Artillery](https://artillery.io/docs/getting-started/). A written analysis of your results should be included in your README. 

## AWS Asset Storage Requirements
* Your app must utilize [AWS S3 bucket storage](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html) to hold some kind of asset, e.g. a profile picture
* You must use [aws-sdk-mock](https://www.npmjs.com/package/aws-sdk-mock) to run mock tests on your routes that use the AWS S3 SDK. 

## Basic Authentication/Bearer Authorization Requirements
* Basic auth is required for a user to create an account and to authenticate themselves when using your app
* Bearer auth is required on at least **2** of your resources. This can include your Profile model that you are required to include anyway


## Route Requirements
* Each of your resources should be associated with a full-CRUD route, i.e. `GET, PUT, POST, and DELETE` actions should be implemented on each resource.
* Mongoose/MongoDB queries should be appropriate for each route (i.e. a `GET` route should be using a `findOne/findById` method from Mongoose, and a `POST` route should be using `save`). 
* Mongoose/MongoDB queries should be done using their promisified versions, not their `(err,data)`-callback-based versions. Your promise chain should handle successful responses and errors accordingly in appropriately placed `.then` and `.catch` blocks. 
* Endpoint naming should be consistent across all routes in terms of resource naming convention (best to keep resources pluralized) and capitalization (best to keep everything lowercased)
* All your routes' callbacks should follow a signature of `(request, response, next)` and error handling should be offloaded to error middleware. 

## Documentation Requirements
* You should ideally be writing documentation for any newly created routes *every day*. 
* Read through [this blog](https://medium.com/@meakaakka/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3) on how to write a good README.
* Skim through the [Pokemon API](https://pokeapi.co/docsv2/) for an example writing good docs that clearly instruct a developer how to use your API properly
* Skim through a previous CF project called [shooters-log](https://github.com/gsmatth/shooters-log) for another example of writing a great README. 

## Exceptions
  * Exceptions for above requirements can be made if you demonstrate that you are adding a different layer of complexity that interferes with meeting the requirements. 
  * For example, if you wish to deploy on a TCP server, you do not need to meet the 85% testing requirement as TCP server testing is complex. If you decide to implement complex user/admin permissions, you may forgo your 3-model requirment, etc.
  * **Please consult with the instructional team first about receiving an exception before you move forward.**

## Continous Integration/Continuous Deployment Requirements
* All project repos must be set up with Travis CI and deployed via Heroku. 
* Deployed API's should be be fully functioning with no unintended errors. 

## Extra Credit Opportunities
* Create your documentation with [Swagger.io](https://swagger.io/)
  * Watch [this video tutorial](https://www.youtube.com/watch?v=xggucT_xl5U) to get started.
* Use another medium to deploy your app, e.g. [Azure](https://docs.microsoft.com/en-us/azure/app-service/app-service-continuous-deployment) or [AWS](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs.html).  (Be aware that these services may charge you if you exceed a certain usage).
* Find ways to refactor your code and make it DRY, similar to how [Day 14](https://github.com/codefellows/seattle-javascript-401d25/tree/master/back-end/14-relationship-modeling/one-to-many-refactor) utilized a one-size-fits-all model router. **Document any significant refactoring in your Canvas submission**. 
* Create a **very rudimentary** front end using basic jQuery for your app. **Not a recommended stretch goal, but awesome if you manage it** 







