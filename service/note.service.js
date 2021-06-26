import models from "../models";
const noteModel = models.note

  
  const isNoteExist = title => {
    return noteModel.count({
      where: {
        title: title
      }
    }).then(count => {
      if (count == 0) {
        return false;
      }
      return true;
    });
  };
  
  const saveNote = async (req, res, next) => {
    await isNoteExist(req.body.title).then(noteExist => {
      if (noteExist) {
        res.status(200).json({
          status: "success",
          message: "Allready exist"
        });
      } else {
        return noteModel.create({
          title: req.body.title,
          description: req.body.description,
          date: req.body.date
        })
          .then(note => {
            next(note);
          })
          .catch(err => {
            logger.error("Fail! Error -> " + err);
          });
      }
    });
  };

  const getAllNote = (req, res, next) => {
    return noteModel.findAndCountAll();
  };
  
  const getSingleNote = (id, res, next) => {
    return noteModel.findByPk(id).then(note => {
      next(note);
    });
  };
  
  const updateNote = req => {
    return noteModel.update(req.body, {
      where: { id: req.query.id }
    }).then(result => {
      // logger.info(result);
    });
  };
  
  // const removeNote = (req,res,NoteID) => {
  //   // logger.info(NoteID);
  
  //   noteModel.findByPk(NoteID).then(note => {
  //     if (!note) {
  //       return res.status(400).send({
  //         message: "Note Not Found"
  //       });
  //     }
  //     else{
  //       return noteModel.destroy({
  //         where: { id: NoteID }
  //       })
  //     }
  //   });
  
    // return noteModel.destroy({
    //   where: { id: NoteID }
    // })
    // .then(() => {
    //   logger.info("deleted successfully a note with id = " + NoteID);
    // });
  // };

  const removeNote =  (req, res, next) => {
     noteModel.findByPk(req.query.id).then(noteExist => {
      if (!noteExist) {
        // res.status(400).json({
        //   status: "success",
        //   message: "note doesnot exist"
        // });
        next(400);
      } else {
         return noteModel.destroy({
          where: { id: req.query.id }
        })
          .then(() => {
            next(200);
          })
          .catch(err => {
            // logger.error("Fail! Error -> " + err);
          });
      }
    });
  };


export const noteService ={
    saveNote,
    getAllNote,
    getSingleNote,
    updateNote,
    removeNote
}