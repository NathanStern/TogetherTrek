// Control config values based on the environment
let env = String(process.env.NODE_ENV);
env = env.replace(/\s+/g, '');

const prod = {
 app: {
   port: 3000
 },
 db: {
   url: "mongodb+srv://test:test@cluster0.snpmm.mongodb.net/production?retryWrites=true&w=majority"
 }
};

const test = {
 app: {
   port: 3001
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
    console.log("nah");
}

module.exports = config;
