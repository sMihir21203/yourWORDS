import { uploadData } from "./multer.middleware.js";
import { errorHandler } from "./errorHandler.middlerware.js";
import {veryfyJWT} from "./auth.middleware.js"

export{
    uploadData,
    errorHandler,
    veryfyJWT
}