// Control config values based on the environment
let env = String(process.env.NODE_ENV) || "test";
env = env.replace(/\s+/g, '');

const prod = {
 app: {
    port: 3000,
    JWT_KEY: "secret",
    TWILIO_KEY: "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",
    TWILIO_EMAIL: "TogetherTrekPurdue@gmail.com"
  },
 db: {
   url: "mongodb+srv://test:test@cluster0.snpmm.mongodb.net/production?retryWrites=true&w=majority"
 }
};

const test = {
 app: {
    port: (process.env.PORT || 3001),
    JWT_KEY: "secret",
    TWILIO_KEY: "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",
    TWILIO_EMAIL: "TogetherTrekPurdue@gmail.com"
 },
 db: {
   url: "mongodb+srv://test:test@cluster0.snpmm.mongodb.net/testing?retryWrites=true&w=majority"
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
