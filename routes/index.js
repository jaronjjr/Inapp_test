var express = require('express');
var router = express.Router();
// import {userController} from "../controller/userController"
import {noteController} from "../controller/note.controller"

router.post("/saveNote",noteController.saveNote);

router.get("/getAllNote",noteController.getAllNote);

router.get("/getNote",noteController.getSingleNote);

router.put("/updateNote",noteController.updateNote);

router.delete("/deleteNote",noteController.removeNote);

module.exports = router;
