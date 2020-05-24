module.exports = function makeCallback(handler) {
  return async function (req, res, next) {
    const ctx = {
      body: req.body,
      query: req.query,
      params: req.params,
      user: req.user,
    };
    try {
      const response = await handler(ctx);
      res.json(response);
    } catch (err) {
      next(err);
    }
  };
};
