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
            console.log(err)
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
     console.log(result)
    });
  };
  

  const removeNote =  (req, res, next) => {
     noteModel.findByPk(req.query.id).then(noteExist => {
      if (!noteExist) {
        next(400);
      } else {
         return noteModel.destroy({
          where: { id: req.query.id }
        })
          .then(() => {
            next(200);
          })
          .catch(err => {
           console.log(err)
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