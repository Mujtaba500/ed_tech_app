import multer from "multer";
import fs from 'fs'

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
      
      
        const folderName = `./src/uploads/videos/${req.user.username}`

        // Check if folder exists
        try {
            if (!fs.existsSync(folderName)) {
                // if not, create new folder with username
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

  const videoUpload = multer({
    storage,
    limits: {
        fileSize: 100000000, // 100MB
    },
     //validator
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["video/mp4"];

    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Invalid file type");
      error.code = "INVALID_FILE_TYPE";
      return cb(error, false);
    }

    cb(null, true);
  },
  })

  export default videoUpload