import BusService from '../utilities/services/busServices';

/**
 * @exports
 * @class BusController
 */
class BusController {
  /**
     * Creates a Bus
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
  static createBus(req, res) {
    const userId = req.userData.id;
    BusService
      .saveBus(req.body, userId)
      .then(data => res.status(201).json({
        status: 201,
        data,
        message: 'New Bus created successfully',
      }))
      .catch((err) => { /* istanbul ignore next-line */
        if (err.rowCount >= 1) {
          return res.status(400).json({
            status: 400,
            message: 'Bus with this platenumber exists already',
          });
        }
        /* istanbul ignore next-line */
        return res.status(400).json({
          message: 'Could not create buses',
        });
      });
  }
}

export default BusController;
