import Helper from '../utilities/helper';

/**
 * @class DummyAuthentication
 * @description To verify user
 * @exports Authorization
 */
class Authorization {
  /**
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {object} payload
   */
  static verifyUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = Helper.verifyToken(token);
      req.userData = decoded;

      return next();
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        error: 'user not found, please register to perform this action',
      });
    }
  }


  /**
   * @param  {object} req - The Admin request object
   * @param  {object} res - The Admin res response object
   * @param  {function} next - The next() Function
   * @returns {object} payload
   */
  static verifyAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = Helper.verifyToken(token);
      req.userData = decoded;
      if (req.userData.isAdmin === false) {
        return res.status(403).send({
          status: 'error',
          error: 'You are not authorized to perform this action',
        });
      }

      return next();
    } catch (error) {
      return res.status(401).send({
        status: 'error',
        error: 'Authentication Failed',
      });
    }
  }
}

export default Authorization;
