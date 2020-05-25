const config = {
  port: parseInt(process.env.PORT) || 3000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExp: process.env.JWT_EXP || '7d'
};

module.exports = config;
