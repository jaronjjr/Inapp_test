const db = require("../models");
const Users = db.UserDetails

const saveUser = (req,res)=>{
    if (
        req.body.first_name != "" &&
        req.body.last_name != "" &&
        req.body.email != ""
      ) {
        
          return Users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            age: req.body.age
          })
            .then((data) => {
              next(data);
            })
            .catch((error) => {
              logger.error("Fail! Error -> " + error);
              res.status(400).send(error);
            });
        } 
      else {
        res.status(400).json({
          message: "null or no inputs",
        });
      }
};
export const userService={
    saveUser
}