import jwt from 'jsonwebtoken';
import config from '../../config/index';
import queryProvider from '../queries';


/**
 * @exports
 * @class UserService
 */
class UserService {
  /**
   * Find user by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      queryProvider
        .findUserByEmailQuery(email)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }


  /**
   * save new user
   * @staticmethod
   * @param  {string} body - Request object
   * @return {string} res
   */
  static saveUser(body) {
    return new Promise((resolve, reject) => {
      queryProvider
        .saveUserQuery(body)
        .then((res) => {
          const token = jwt.sign({
            id: res[0].id,
            email: res[0].email,
            isAdmin: res[0].isadmin,
          }, config.jwtSecretKey, {
            expiresIn: 86400,
          });

          const data = {
            token,
            id: res[0].id,
            firstName: res[0].firstname.trim(),
            lastName: res[0].lastname.trim(),
            email: res[0].email.trim(),
            isAdmin: res[0].isadmin,
          };

          resolve(data);
        })
        .catch(err => reject(err));
    });
  }
}

export default UserService;
