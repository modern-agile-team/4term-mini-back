const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const upload = multer({
  //업로드
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `profile/userNo${req.params.userNo}.jpg`);
    },
  }),
});

const postStorage = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",

  metadata: function (req, cb) {
    cb(null, { fieldName: req.body.files.fieldname });
  },
  key: function (req, cb) {
    cb(null, `posts/${req.body.files.originalname}`);
  },
});

function deletePostImages(images) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: {
      Objects: images.reduce((objects, imageUrl) => {
        objects.push({ Key: imageUrl.replace(process.env.AWS_URL, "") });
        return objects;
      }, []),
      Quiet: false,
    },
  };

  s3.deleteObjects(params, function (err, data) {
    if (!err) console.log(data);
  });
}
const deleteProfile = async (req, res, next) => {
  //삭제
  const { userNo } = req.params;
  await s3.deleteObject({ bucket: process.env.AWS_BUCKET_NAME, key: `userNo${userNo}` });
  next();
};

module.exports = {
  uploadPostImages: multer({ storage: postStorage }),
  deletePostImages,
  deleteProfile,
  upload,
};
