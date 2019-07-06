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
        return res.status(400).json({
          message: 'Could not create user',
        });
      });
  }
}

export default UserController;
