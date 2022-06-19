// Control config values based on the environment
let env = String(process.env.NODE_ENV) || "test";
env = env.replace(/\s+/g, '');

const prod = {
 app: {
    port: 3000,
    JWT_KEY: "secret",
    TWILIO_KEY: "",
    TWILIO_EMAIL: "",
    RADARIO_KEY: ""
  },
 db: {
   url: ""
 }
};

const test = {
 app: {
    port: (process.env.PORT || 3001),
    JWT_KEY: "secret",
    TWILIO_KEY: "",
    TWILIO_EMAIL: "",
    RADARIO_KEY: ""
 },
 db: {
   url: ""
 }
};

let config;

switch(env) {
  case "test":
    config = test;
    break;
  case "prod":
    config = prod;
    break;
  default:
    console.log("NODE_ENV must be either test or prod");
    process.exit(1);
}

module.exports = config;
