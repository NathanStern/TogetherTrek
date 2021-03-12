const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");

const id = "AKIAI2JJQXIUUX4A7WSQ";
// TODO: This needs to be converted to use env vars for security
const secret = "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";
const region = "us-east-1";
const bucket = "test-bucket-togethertrek";

aws.config.update({
  accessKeyId: id,
  secretAccessKey: secret,
  region: region
});

const s3 = new aws.S3();

exports.upload = (file) => {
  const blob = file.data;

  let params = {
    Bucket: bucket,
    Key: file.name,
    Body: blob
  };
  let request = s3.upload(params);
  return request.promise();
};

exports.delete = (file_key) => {
  let params = {
    Bucket: bucket,
    Key: file_key
  };
  let request = s3.deleteObject(params);
  return request.promise();
};

exports.findOne = (file_key) => {
  let params = {
    Bucket: bucket,
    Key: file_key
  };
  let request = s3.getObject(params);
  return request.promise();
};
