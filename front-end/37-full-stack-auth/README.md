![cf](http://i.imgur.com/7v5ASc8.png) 37: Cookies
===

## Learning Objectives
* Students will be able to manage basic and bearer authentication on the client side
* Students will be able to manage cookies on the client side

## Readings
* Read [cookies](https://www.quirksmode.org/js/cookies.html)
* Read [HTTP cookie wiki](https://en.wikipedia.org/wiki/HTTP_cookie)
* Skim [read and set a cookie](https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript)

## Outline

### Cookies
Cookies are key value pairs that can store text. They are meant to be a reliable place to store stateful information on the browser. Cookies can be given an expiration date, and the browser will automatically remove them when that date occurs.

### Cookie Example
``` javascript
// on the server
app.post('/signup', bodyParser, (req, res, next) => {
  new User.create(req.body)
  .then(user => user.createToken())
  .then(token => {
    res.cookie('some-custom-label', 'some token data', {maxAge: 900000})
    res.send(token)
  })
  .catch(next)
})
```