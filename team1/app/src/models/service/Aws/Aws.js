"use strict";

const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});
const storage = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fiedlName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `test/ ${file.originalname}`);
  },
});

exports.upload = multer({ storage: storage });
