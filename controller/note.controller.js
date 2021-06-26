import {noteService} from '../service/note.service'


const saveNote=(req, res, next) => {
  noteService.saveNote(req, res, (datas) => {
        res.status(200).json({
          status: "success",
          data: datas,
          message: "Saved successfully",
        });
      })
      .then(() => {})
      .catch((err) => {
        return next(err);
    });
};

const getAllNote = (req, res, next) => {
  noteService
    .getAllNote(req, res, next)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL notes"
      });
    })
    .catch(err => {
      logger.error(JSON.stringify(err.stack));

      return next(err);
    });
};

const getSingleNote = (req, res, next) => {
  let id = req.query.id;
  noteService
    .getSingleNote(id, res, note => {
      res.status(200).json({
        status: "success",
        data: note,
        message: "Retrieved selected note"
      });
    })
    .catch(err => {
      return next(err);
    });
};


const updateNote = (req, res, next) => {
  noteService
    .updateNote(req)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Updated Note"
      });
    })
    .catch(err => {
      logger.error(err);
      return next(err);
    });
};

const removeNote = (req, res, next) => {
  let NoteID = (req.query.id);
  console.log(NoteID,req.query.id,"34");
  noteService
    .removeNote(req, res, next => {
      if (next == 400) {
        res.status(400).send({
          status: "success",
          message: "Note Not Found"
        });
      } else {
        res.status(200).json({
          status: "success",
          message: `Removed successfully`
        });
      }
    })
    // .catch(err => {
    //   return next(err);
    // });
};

export const noteController ={
    saveNote,
    getAllNote,
    getSingleNote,
    updateNote,
    removeNote
}