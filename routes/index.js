var express = require('express');
var router = express.Router();
import {userController} from "../controller/userController"
import {fileController} from "../controller/fileController"
import {upload}from "../utils/multer"

router.post("/user",userController.saveUser);

router.post("/files",upload.single("file"),fileController.sendFile);


module.exports = router;
