/* eslint-disable indent */
import queryProvider from '../queries';


/** export default TripService;
 * @exports
 * @class TripServices
 */
class TripServices {
  /**
     * save new Trip
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} Tripid - Request object
     * @return {string} res
     *
     */
  static saveTrip(body, userid) {
    return new Promise((resolve, reject) => {
      queryProvider
        .saveTripQuery(body, userid)
        .then((res) => {
          const data = {
            id: res.rows[0].id,
            createduser: res.rows[0].createduser,
            busId: res.rows[0].busid,
            origin: res.rows[0].origin,
            destination: res.rows[0].destination,
            tripDate: res.rows[0].tripdate,
            fare: res.rows[0].fare,
            status: res.rows[0].status,
          };
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }


    /**
   * view all Trips created
   * @staticmethod
   * @return {string} res
   */
  static viewAllCreatedTrips() {
    return new Promise((resolve, reject) => {
      queryProvider
        .findAllTripsQuery()
        .then(response => resolve(response))
        /* istanbul ignore next-line */
        .catch(err => reject(err));
    });
  }


    /**
     * update Trip status
     * @staticmethod
     * @param  {string} TripId - Request object
     * @param  {string} body - Request object
     * @param  {string} host - Request object
     * @param  {string} user_id - Request object
     * @return {string} res
     */
    static updateStatus(id, body) {
      return new Promise((resolve, reject) => {
          queryProvider
              .updateTripStatusQuery(id, body)
              .then((res) => {
                  console.log(res.rows);
                  const data = {
                      id: res.rows[0].id,
                      status: res.rows[0].status,
                  };
                  resolve(data);
              })
              .catch(err => reject(err));
      });
  }

       /**
   * view all Trips by origin
   * @staticmethod
   * @return {string} res
   */
  static viewAllTripsbyOriginDestination(origin, destination) {
    return new Promise((resolve, reject) => {
      queryProvider
        .viewAllTripsbyOriginDestinationQuery(origin, destination)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

     /**
   * view all Trips by origin
   * @staticmethod
   * @return {string} res
   */
  static viewAllTripsOrigin(origin) {
    return new Promise((resolve, reject) => {
      queryProvider
        .findAllTripsbyOriginQuery(origin)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

   /**
   * view all Trips by destination
   * @staticmethod
   * @return {string} res
   */
  static viewAllTripsDestination(destination) {
    return new Promise((resolve, reject) => {
      queryProvider
        .findAllTripsbyDestinationQuery(destination)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }
}

export default TripServices;
