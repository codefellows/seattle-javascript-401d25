![cf](http://i.imgur.com/7v5ASc8.png) 19: Continuous Integration and Deployment
===

## Learning Objectives
* Students will learn about continuous integration and continuous delivery
* Students will be able to deploy their application on Heroku with a continuous delivery pipeline
* Students will be able to configure TravisCI to run their tests on all pushes to GitHub

## Resources
* Read [deploying nodeJS apps on heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
* Read [getting started with nodeJS on travisCI](https://docs.travis-ci.com/user/languages/javascript-with-nodejs)

## Outline

### Continuous Integration
Continuous Integration (CI) is the process of regularly merging individually developed features of code into a shared repository as frequently as they are made. In the most basic setup, a team could simply use git to merge code into a master branch. However more advanced CI patterns can be developed. These patterns can automate static analysis (lining), running unit and integration tests, testing platform support, enforcing code reviews, and much more.

### Continuous Delivery
Continuous Delivery (CD) is the process of deploying software in short cycles by ensuring that software can be deployed at any time. CD pairs very will with advanced CI setups that help ensure the core product is always a stable code base.

### TravisCI
Travis CI is a hosted and distributed continuous integration service (CI) that is most often used to build and test software projects hosted on GitHub.

Travis CI is configured by adding a file named `.travis.yml` to the root directory of the repository. This file specifies the programming language used, the desired building and testing environment and various other parameters.

##### Example .travis.yml

``` javascript
  language: node_js
  node_js:
    - 'stable'
  services:
    - mongodb
  addons:
    apt:
      sources:
        - ubuntu-toolchain-r-test
      packages:
        - gcc-4.8
        - g++-4.8
  env:
    - CXX=g++-4.8
  sudo: required
  before_script: npm i
  script:
    - npm test
    - npm run lint
```