# Entity Relationship Diagram, User Stories, Models, and Route Planning

## [Submit on Canvas](https://canvas.instructure.com/courses/1343256/assignments/8637260/) the following items **by July 15, 11:59pm**:
  * A *shareable* link to your entity relationship diagram
  * A link to your group's Trello board that lists all your user stories, time estimated for each story, and assigned appropriately to team members
  * A list and written description of your planned models and their relationships to each other (this is *in addition* to your ERD)
  * A list of at least 12 routes that perform full-CRUD operations on your resources
  * A link to your Github repository that shows you have scaffolded your project out with the proper configuration files, and have created appropriate folders for your models/routes/any utility functions as needed. 
  * You may submit this information as a link to a Markdown file or Google doc, or add them in the Canvas text box. 
  * Each team member should submit this information individually on Canvas. 

### Entity Relationship Diagram

* Please read [this blog](https://medium.com/omarelgabrys-blog/database-modeling-entity-relationship-diagram-part-5-352c5a8859e5) on how to create an entity relationship diagram. 
* Utilize [draw.io](https://www.draw.io/) or some other database modeling tool you can find online to create an ERD based off your API
* Make your ERD as presentable as possible. **You will be required to show your ERD during Presentation Day**

### User Stories

* Come up with **at least** 10 user stories for your project. Here are examples of user stories for developing an API that alerts users about potential pet adoptions on a pet adoption service:
  * As a user, I want to receive text message alerts if a certain breed is up for adoption
  * As a user, I want to be able to post images and bios of pets from my local animal shelter so they can potentially get adopted by other people
  * As a user, I want to be able to filter by various parameters, such as breed, age, size, location, etc.
  * As a developer, I want to create a well structured Animal schema that clearly shows a pet's breed, age, size, location, and other relevant information a potential pet owner would care about
  * As a developer, I want to create appropriate database queries that will properly filter animals in my database in the most efficient manner based off a users' given parameters.
  * As a developer, I want to create a one-many-relationship where one user can have many preferred breeds that they are looking to adopt
  * As a developer, I want to write unit tests for all my routes to ensure I get the responses I expect for successful API requests and I get the proper errors I expect for failed API requests
  * As a project manager, I want to ensure that my team members are utilizing pair programming to hold each other accountable and produce good code in a timely manner
  * As a project manager, I want to ensure my team has tested their code via good continuous integration practices and deployed working features in regular intervals

* Your group should follow an [agile methodology](https://en.wikipedia.org/wiki/Agile_software_development). Make a [Trello board](https://trello.com/) and invite the instructional team as collaborators so we can check in on your progress. Judy's email address is [judy@codefellows.com](mailto:judy@codefellows.com). TA's will provide their own email addreses later. 
* Your user stories should be set up as individual tasks on your Trello board, with time estimates of each task and an assignment to one or two team members. Ensure you are properly changing the status of your tasks as you move forward in Project Week.


### Models
* Your team should have *at least* three models. This *does not* include using the standard Acccount/Profile models provided, so you will need *three* more models in addition to those. You need to establish *at least two* one-many-relationships between those models. I.e. a user can have many blog posts, a blog post can have many comments, etc. These relationships should be clearly be indicated in your ERD.

### Routes
* Your team should have up full-CRUD routes planned out for each of your three extra models. Full-CRUD should also be done on your User/Profile models for best practices, but will not be included as a requirement for points in the grading rubric. 
* This means you must have **at least 12 routes** planned out (3 required models x 4 request methods of GET, PUT, POST, DELETE)
* You should agree on the semantic naming of your routes that would make sense for consumers of your api. E.g., if you are making a pet adoption API and you want to return an array of just cats, should you have a route that is called `/api/pets/cats`, or should you have a route that reads as `/api/cats`? Your team needs to come to an agreement on these things and stay consistent with your chosen convention. 
* You should make a design choice on how you handle the data in your database. I.e., if you delete a blog post that has many comments, should you also delete the comments? Come to an agreement with your group on your preferred design choice. 



