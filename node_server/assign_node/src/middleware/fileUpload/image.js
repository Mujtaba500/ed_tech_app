import multer from "multer";
import fs from 'fs'

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        const folderName = `./src/uploads/images/${req.user.username}`

        console.log(file)

        // Check if folder exists
        try {
            if (!fs.existsSync(folderName)) {
                // if not, create new folder with user name
              fs.mkdirSync(folderName);
            }
          } catch (err) {
            console.error(err);
          }

      cb(null, folderName);
    },
    filename: (req, file, cb) => {
      const name = file.originalname;
      const index = name.indexOf(".");
      const fileFormat = name.slice(index);
      cb(null, file.fieldname + "-" + Date.now() + fileFormat);
    },
  });

  const upload = multer({
    storage,
    limits: {
        fileSize: 10000000, // 10MB
    },
     //validator
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];

    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Invalid file type");
      error.code = "INVALID_FILE_TYPE";
      return cb(error, false);
    }

    cb(null, true);
  },
  })

  export default upload