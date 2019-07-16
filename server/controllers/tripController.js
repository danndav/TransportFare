import TripService from '../utilities/services/tripServices';

/**
 * @exports
 * @class TripController
 */
class TripController {
  /**
     * Creates a new Trip
     * @staticmethod
     * @param  {object} req - Trip object
     * @param {object} res - Response object
     * @return {json} res.json
     */
  static createTrip(req, res) {
    const userId = req.userData.id;
    TripService
      .saveTrip(req.body, userId)
      .then(data => res.status(201).json({
        status: 201,
        data,
        message: 'New Trip created successfully',
      }))
      .catch(err => res.status(400).json(err));
  }


  /**
   * View all Trips
   * @staticmethod
   * @param  {object} req - Trip objectexport default TripController
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static viewAllTrips(req, res) {
    TripService
      .viewAllCreatedTrips()
      .then(response => res.status(200).json({
        status: 200,
        message: 'Successfully fetched all Trips',
        data: response.rows,
      }))
      /* istanbul ignore next-line */
      .catch(err => res.status(400).json(err));
  }

  /**
     * Update Trip Destination
     * @staticmethod
     * @param  {object} req - Trip object
     * @param {object} res - Response object
     * @return {json} res.json
     */
  static updateTripStatus(req, res) {
    const {
      id,
    } = req.params;
    const status = req.body;

    TripService
      .updateStatus(id, status)
      .then(response => res.status(200).json({
        status: 200,
        message: 'Trip Status Updated Successfully',
        data: response,
      }))
      // eslint-disable-next-line no-unused-vars
      .catch(err => res.status(404).json({
        status: 404,
        error: 'This Trip does not exist',
      }));
  }

  /**
   * View all Trips  by origin
   * @staticmethod
   * @param  {object} req - Trip objectexport default TripController
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static viewAllTripsbyOriginorDestination(req, res) {
    const {
      origin,
      destination,
    } = req.query;

    if (origin && destination) {
      TripService
        .viewAllTripsbyOriginDestination(origin, destination)
        .then(response => res.status(200).json({
          status: 200,
          message: 'Successfully fetched all Trips by Origin and Destination',
          data: response.rows,
        }))
        .catch(err => res.status(400).json(err));
    } else if (origin) {
      TripService
        .viewAllTripsOrigin(origin)
        .then(response => res.status(200).json({
          status: 200,
          message: 'Successfully fetched all Trips by origin',
          data: response.rows,
        }))
        .catch(err => res.status(400).json(err));
    } else if (destination) {
      TripService
        .viewAllTripsDestination(destination)
        .then(response => res.status(200).json({
          status: 200,
          message: 'Successfully fetched all Trips by Destination',
          data: response.rows,
        }))
        .catch(err => res.status(400).json(err));
    } else {
      /* istanbul ignore next-line */
      return res.status(400).json({
        status: 400,
        message: 'Could not fetch any trips',
      });
    }
  }
}

export default TripController;
