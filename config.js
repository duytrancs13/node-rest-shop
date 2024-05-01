const { config } = require("dotenv");

const result = config();
const envs = result.parsed;

module.exports = envs;
