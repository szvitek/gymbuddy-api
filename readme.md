## modules

`api/[moduleName]`

- [moduleName].routes.js
  - register your module routes here
  - pass your controller method into makeCallback helper as the express callback
- [moduleName].controller.js
  - you can deal with your request/response here and do further actions via service if needed
  - if you use the recommended `makeCallback` in your routes the controller functions receive the context object
  - whatever you'll return it will be the body of the response
  - keep your controller methods as lean as possible
  - delegate your business logic into service functions
- [moduleName].service.js
  - but business logic here
  - you can work with your models here
- [moduleName].model.js
  - This is your mongoose model definitionfile

### register module routes in express

- add your `[moduleNmae].routes.js` to your `boot/routes`

---

## middlewares

### passport

currently it has 2 middlewares `login` and `jwt`

- login: is the passport middleware that you want to use as a local strategy middleware
- jwt: add this middleware to those routes that you want to protect with a valid jwt token

### global error handler:

`middlewares/error.js`

- if your controller logic throws an error this will handle it.
- if you want to throw a custom error from your controller (message/status) use the `makeError` helper

```
makeError('invalid login', 401)
```

---

## todos / roadmap

### must have for 1.0:

- ~~categories module~~
- ~~implement passport-jwt~~
- ~~users module~~
- [todo] exercises module
- [todo] workouts module
- [todo] tests
- ? refactors, bugfixes, new features, etc...

### additionals / nice to have features:

- facebook / google login
- statistics module
- use es6 classes?
- turn api into standalone framework?
- ?
