import queryProvider from '../queries';


/** export default BookingService;
 * @exports
 * @class BookingService
 */
class BookingService {
  /**
     * save new Booking
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} userid - Request object
     * @return {string} res findUserById
     */
  static saveBooking(body, user_id) {
    return new Promise((resolve, reject) => {
      queryProvider.findUserById(user_id).then((res) => {
        const { firstname, lastname, email } = res.rows[0];
        queryProvider.saveBookingQuery(body, user_id, firstname, lastname, email)
          .then((respond) => {
            const data = {
              booking_id: respond.rows[0].id,
              user_id: respond.rows[0].createduser,
              trip_id: respond.rows[0].tripid,
              bus_id: respond.rows[0].busid,
              trip_date: respond.rows[0].tripdate,
              seat_number: respond.rows[0].seatnumber,
              first_name: respond.rows[0].firstname,
              last_name: respond.rows[0].setnumber,
              email: respond.rows[0].email,
              created_on: respond.rows[0].createdon,
            };

            resolve(data);
          })
          .catch((err) => { reject(err)});
      })
        .catch((err) => {reject(err)});
    });
  }

  /**
   * view all Booking created
   * @staticmethod
   * @return {string} res
   */
  static viewAllCreatedBookings(typeofUser, userId) {
    return new Promise((resolve, reject) => {
      if (typeofUser === true) {
        queryProvider.findAllBookingsQuery()
          .then(response => resolve(response))
          .catch(err => reject(err));
      } else {
        queryProvider.findAllmyBookingQuery(userId)
          .then(response => resolve(response))
          .catch(err => reject(err));
      }
    });
  }

  /**
   *Delete Booking created
   * @staticmethod
   * @return {string} res
   */
  static DeleteBooking(typeofUser, userId, bookingId) {
    return new Promise((resolve, reject) => {
      if (typeofUser === true) {
        queryProvider.deleteBookingByid(bookingId)
          .then(response => resolve(response))
          .catch(err => reject(err));
      } else {
        queryProvider.UserdeleteBookingByid(userId, bookingId)
          .then(response => resolve(response))
          .catch(err => reject(err));
      }
    });
  }


  /**
     * update Booking seatnumber status
     * @staticmethod
     * @param  {string} BookingId - Request object
     * @param  {string} body - Request object
     * @param  {string} host - Request object
     * @param  {string} user_id - Request object
     * @return {string} res
     */
  static bookingupdateseatNumber(id, seat_number) {
    return new Promise((resolve, reject) => {
      queryProvider
        .updateSeatNumberQuery(id, seat_number)
        .then((res) => {
          console.log(res.rows);
          const data = {
            id: res.rows[0].id,
            seat_number: res.rows[0].seatnumber,
          };
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }
}
export default BookingService;
