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
    acl: "public-read-write",
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

  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `posts/${file.originalname}`);
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
  s3.deleteObject(
    {
      Bucket: process.env.AWS_BUCKET_NAME, // 사용자 버켓 이름
      Key: `profile/userNo${userNo}.jpg`, // 버켓 내 경로
    },
    (err, data) => {
      if (err) {
        throw err;
      }
    }
  );

  next();
};

module.exports = {
  uploadPostImages: multer({ storage: postStorage }),
  deletePostImages,
  deleteProfile,
  upload,
};
