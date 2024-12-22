const { cleanEnv, str, port } = require('envalid');

const validateEnv = () => {
  return cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port({ default: 5000 }),
    MONGODB_URI: str(),
  });
};
console.log("MONGO_URI:", process.env.MONGO_URI);
module.exports = validateEnv;