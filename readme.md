## global error handler:

`middlewares/error.js`

- if your controller logic throws an error this will handle it.
- if you want to throw a custom error from your controller (message/status) use the `makeError` helper

```
makeError('invalid login', 401)
```
