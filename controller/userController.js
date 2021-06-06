import {userService} from '../service/userService'


const saveUser=(req, res, next) => {
    console.log("userController")
    userService.saveUser(req, res, (datas) => {
        res.status(200).json({
          status: "success",
          data: datas,
          message: "User Saved successfully",
        });
      })
      .then(() => {})
      .catch((err) => {
        return next(err);
    });
};
export const userController ={
    saveUser
}