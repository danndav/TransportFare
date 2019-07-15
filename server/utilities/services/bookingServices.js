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
  static saveBooking(body, userid) {
    return new Promise((resolve, reject) => {
      queryProvider.findUserById(userid).then((res) => {
        const { firstname, lastname, email } = res.rows[0];
        console.log('bodyyyy', body, userid);
        console.log(res.rows[0]);
        queryProvider.saveBookingQuery(body, userid, firstname, lastname, email)
          .then((respond) => {
            const data = {
              bookingId: respond.rows[0].id,
              userId: respond.rows[0].userid,
              TripId: respond.rows[0].tripid,
              busId: respond.rows[0].busid,
              tripDate: respond.rows[0].tripdate,
              seatNumber: respond.rows[0].setnumber,
              firstName: respond.rows[0].firstname,
              lastName: respond.rows[0].setnumber,
              email: respond.rows[0].email,
              createdOn: respond.rows[0].createdon,
            };

            console.log(data);
            console.log('hello there', res);

            resolve(data);
          })
          .catch(err => reject(err));
      })
        .catch(err => reject(err));
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
        queryProvider.deleteTripByBusid(bookingId)
          .then(response => resolve(response))
          .catch(err => reject(err));
      } else {
        queryProvider.UserdeleteBookingByid(userId, bookingId)
          .then(response => resolve(response))
          .catch(err => reject(err));
      }
    });
  }
}
export default BookingService;
