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
        status: 201,
        data,
        message: 'New user created successfully',
      }))
      .catch((err) => {
        if (err.rowCount >= 1) {
          return res.status(400).json({
            status: 400,
            message: 'User with this email exists already',
          });
        }
        /* istanbul ignore next-line */
        return res.status(400).json({
          message: 'Could not create user',
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
      .then(data => res.status(200).json({
        status: 200,
        data,
        message: 'Authentication Successful',
      }))
      .catch(err => res.status(401).json({
        status: 401,
        responseMessage: err,
      }));
  }
}

export default UserController;
