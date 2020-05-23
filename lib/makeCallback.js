module.exports = function makeCallback(handler) {
  return async function (req, res, next) {
    try {
      const response = await handler();
      res.json(response);
    } catch (err) {
      next(err);
    }
  };
};
