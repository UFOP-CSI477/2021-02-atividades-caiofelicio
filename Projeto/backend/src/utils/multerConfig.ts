import multerS3 from "multer-s3"
import multer from "multer"
import S3 from "aws-sdk/clients/s3"
import crypto from "crypto"
import path from "path"
import { AWS_KEY, AWS_BUCKET, AWS_SECRET, STORAGE_TYPE, AWS_REGION } from "../../variables.env"

const s3 = new S3({
  credentials: {
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
  },
  region: AWS_REGION
})

const storageType = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename: (req: any, file: any, cb: any) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const filename = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, filename);
      });
    },
  }),
  s3: multerS3({
    s3: s3,
    bucket: AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)

        const fileName = `${hash.toString("hex")}-${file.originalname}`

        cb(null, fileName)
      })
    }
  })
}

const multerConfig = multer({
  storage: storageType[STORAGE_TYPE],
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) return cb(null, true)

    cb(new Error("Invalid file type"))

  }
})

export default multerConfig