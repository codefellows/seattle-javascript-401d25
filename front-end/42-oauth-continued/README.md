![cf](http://i.imgur.com/7v5ASc8.png) 42: OAuth Continued
===

## Learning Objectives
* Students will learn the frontend OAuth workflow

## Readings
* [Google OAuth frontend](https://developers.google.com/identity/protocols/OAuth2UserAgent)

## Outline

### OAuth Workflow
The OAuth 2 workflow we'll be using is referred to as the "implicit grant flow". It is designed for applications that access APIs only while the user is present on the application. These apps are unable to store confidential information.

Using this flow, your application opens a Google URL that uses querystring parameters to identify your application and the type of access that it requires. Through this URL, the user can authenticate with Google and grant the requested permissions. Google then redirects the user back to your app, which includes an access token that can now be used to make API requests.
