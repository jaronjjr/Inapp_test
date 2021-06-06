const db = require("../models");
const Users = db.UserDetails

const getDetails=(email)=>{
  return   Users.findOne({
        where: {
          email: email,
        }
    }).then((data) => {
        next(data);
      })
      .catch((error) => {
        logger.error("Fail! Error -> " + error);
        res.status(400).send(error);
      });
  

};
export const fileService={
    getDetails
}