"use strict";

// 모듈 호출
const AWS = require("aws-sdk"),
    multer = require("multer"),
    multerS3 = require("multer-s3");

// aws 설정
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

// s3 설정
class S3 {
    upload = multer({
        storage: multerS3({
            s3,
            bucket: "modernagile",
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: "public-read",
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, `mini_project/profile_image/${req.body.nickname}`);
            },
        }),
    });

    delete = (req, res, next) => {
        s3.deleteObject(
            {
                Bucket: "modernagile",
                Key: `mini_project/profile_image/${req.nickname}`,
            },
            function (err, data) {
                if (err) {
                    console.log(err);
                    return res.json(err.toString());
                } else {
                    console.log("S3 delete : Success :)");
                    next();
                }
            }
        );
    };
}

module.exports = S3;
