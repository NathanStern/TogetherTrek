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
  s3.upload(params, (err, data) => {
    if (err) {
      console.log("Error uploading file to S3:");
      console.log(err);
      throw err;
    }
  });
};

exports.delete = (file_key) => {
  let params = {
    Bucket: bucket,
    Key: file_key
  };
  s3.deleteObject(params, function(err, data) {
    if (err) {
      console.log("Error deleting file from S3:");
      console.log(err);
      throw err;
    }
  });
};
