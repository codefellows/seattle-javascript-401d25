# Entity Relationship Diagram, User Stories, Models, and Route Planning

## Entity Relationship Diagram

* Please read [this blog](https://medium.com/omarelgabrys-blog/database-modeling-entity-relationship-diagram-part-5-352c5a8859e5) on how to create an entity relationship diagram. 
* Utilize [draw.io](https://www.draw.io/) or some other database modeling tool you can find online to create an ERD based off your API
* Make your ERD as presentable as possible. **You will be required to show your ERD during Presentation Day**

## User Stories

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


## Models
* Your team should have *at least* three models. This *does not* include using the standard Acccount/Profile models provided, so you will need *three* more models in addition to those. You need to establish *at least two* one-many-relationships between those models. I.e. a user can have many blog posts, a blog post can have many comments, etc. These relationships should be clearly be indicated in your ERD.

## Routes
* Your team should have up full-CRUD routes planned out for each model. You should agree on the semantic naming of your routes that would make sense for consumers of your api. E.g., if you are making a pet adoption API, should you have a route that is called `/api/pets/dogs` that returns an array of dogs, or should you have an endpoint that reads as `/api/dogs`. 


