module.exports = function makeCallback(handler) {
  return async function (req, res, next) {
    const ctx = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      user: req.user
    };
    try {
      const response = await handler(ctx);
      const code = ctx.method === 'POST' ? 201 : 200;
      res.status(code).json(response);
    } catch (err) {
      next(err);
    }
  };
};
