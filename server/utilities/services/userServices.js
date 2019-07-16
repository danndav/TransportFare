import jwt from 'jsonwebtoken';
import config from '../../config/index';
import passwordValidator from '../comparePassword';
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
            is_admin: res[0].isadmin,
          }, config.jwtSecretKey, {
            expiresIn: 86400,
          });

          const data = {
            token,
            id: res[0].id,
            first_name: res[0].firstname.trim(),
            last_name: res[0].lastname.trim(),
            email: res[0].email.trim(),
            is_admin: res[0].isadmin,
          };

          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  /**
   * validateUserLogin
   * @staticmethod
   * @param  {string} email - newpassword
   *  @param  {string} userpassword - token
   * @return {string} res
   */
  static validateUserLogin(email, userpassword) {
    return new Promise((resolve, reject) => {
      this.findUserByEmail(email)
        .then((res) => {
          passwordValidator
            .compare(userpassword, res.rows[0].password)
            .then(() => {
              const token = jwt.sign({
                id: res.rows[0].id,
                email: res.rows[0].email,
                is_admin: res.rows[0].isadmin,
              }, config.jwtSecretKey, {
                expiresIn: 86400,
              });

              const data = {
                token,
                id: res.rows[0].id,
                first_name: res.rows[0].firstname,
                last_name: res.rows[0].lastname,
                email: res.rows[0].email,
                is_admin: res.rows[0].isadmin,
              };
              resolve(data);
            })
            .catch(() => {
              /* istanbul ignore next-line */
              const response = 'Wrong Password and Email Combination';
              /* istanbul ignore next-line */
              reject(response);
            });
        })
        .catch((err) => {
          const response = 'Wrong Email and Password Combination. Please Check your credentials';
          reject(response);
        });
    });
  }
}

export default UserService;
