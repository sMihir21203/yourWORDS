import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(req)
        cb(null, "./backend/public/temp"); 
    },
    filename: function (req, file, cb) {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[-T:]/g, "").split(".")[0]; // YYYYMMDDHHMMSS format
        const uniqueFilename = `${timestamp}_${now.getMilliseconds()}${path.extname(file.originalname)}`;

        cb(null, uniqueFilename);
        // console.log(`File Uploaded: ${uniqueFilename}`);
    }
});

export const upload = multer({ storage });

