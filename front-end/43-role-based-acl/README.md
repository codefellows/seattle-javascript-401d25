![cf](http://i.imgur.com/7v5ASc8.png) Role Based Access Control (Authorization)
====

## Learning Objectives
* Students will learn to implement Authorization using Access Control Lists

## Readings
* Read [role based access control](https://en.wikipedia.org/wiki/Role-based_access_control)
* Read [access control in node](https://blog.nodeswat.com/implement-access-control-in-node-js-8567e7b484d1)
* Read [rbac in react](https://hackernoon.com/role-based-authorization-in-react-c70bb7641db4)
* Skim [rbac discussions](https://softwareengineering.stackexchange.com/questions/299729/role-vs-permission-based-access-control)
* Skim [permissions based access (gist)](https://gist.github.com/joshnuss/37ebaf958fe65a18d4ff)

## Outline
* Access Heirarchy
  * User 
    * Role
      * Capabilities
      
A user is assigned a **role**, and a role has `n` **capabilities** ... therefore that user can perform any action that a capability allows them to.

Therefore, if we know the user, we can determine their capabilities based on their role. Using that information, we can restrict access to any functionality/routes on the express side of things and given a well thought out React component, we can hide things in the UI or alter behavior based on the same set of rules


