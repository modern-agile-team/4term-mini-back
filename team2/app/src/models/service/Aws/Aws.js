const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_KEYID,
  secretAccessKey: process.env.S3_PRIVATE_KEY,
  region: process.env.REGION,
});

let upload = multer({
  //업로드
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `profile/userNo${req.params.userNo}.jpg`);
    },
  }),
});
exports.upload = multer(upload);

exports.deleteProfile = async (req, res, next) => {
  //삭제
  const { userNo } = req.params;
  await s3.deleteObject({ bucket: process.env.S3_BUCKET_NAME, key: `userNo${userNo}` });
  next();
};
