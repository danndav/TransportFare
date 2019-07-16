/* eslint-disable indent */
import queryProvider from '../queries';


/** export default UserService;
 * @exports
 * @class BusServices
 */
class BusServices {
  /**
     * save new bus
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} userid - Request object
     * @return {string} res
     */
  static saveBus(body, userid) {
    return new Promise((resolve, reject) => {
      queryProvider
        .saveBusQuery(body, userid)
        .then((res) => {
          const data = {
            id: res.rows[0].id,
            user_id: res.rows[0].userid,
            number_plate: res.rows[0].number_plate,
            manufacturer: res.rows[0].manufacturer,
            model: res.rows[0].model,
            year: res.rows[0].year,
            capacity: res.rows[0].capacity,
            created_at: res.rows[0].createdon,
          };
          resolve(data);
        })
        .catch((err) => {
 console.log('err1', err);
           return reject(err);
          });
    });
  }
}

export default BusServices;
