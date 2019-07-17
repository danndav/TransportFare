import UserService from '../utilities/services/userServices';

/**
 * @exports
 * @class UserController
 */
class UserController {
  /**
   * Creates a new user
   * @staticmethod
   * @param  {object} req - user object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static createUser(req, res) {
    UserService
      .saveUser(req.body)
      .then(data => res.status(201).json({
        status: "success",
        data,
        message: 'New user created successfully',
      }))
      .catch((error) => {
        console.log(error)
        return res.status(400).json({
          status:"error",
          error: error.message
        });
      });
  }

  /**
   * Creates a new user
   * @staticmethod
   * @param  {object} req - user object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static loginUser(req, res) {
    const {
      email,
      password,
    } = req.body;
    UserService
      .validateUserLogin(email, password)
      .then(data =>res.status(200).json({
        status: 'success',
        data,
        message: 'Authentication Successful',
      }))
      .catch(err => res.status(401).json({
        status: 'error',
        error: err,
      }));
  }
}

export default UserController;
