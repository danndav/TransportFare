import BookingService from '../utilities/services/bookingServices';

/**
 * @exports
 * @class BookingController
 */
class BookingController {
  /**
     * Creates a new Booking
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
  static createBooking(req, res) {
    const user_id = req.userData.id;
    BookingService
      .saveBooking(req.body, user_id)
      .then(data => res.status(201).json({
        status: 'success',
        data,
        message: 'New Booking created successfully',
      }))
      .catch(err => res.status(400).json({
        status:"error",
        error: err.message
      }));
  }


  /**
   * View all Bookings
   * @staticmethod
   * @param  {object} req - Booking object export default BookingController
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static viewAllBookings(req, res) {
    const userId = req.userData.id;
    const typeofUser = req.userData.is_admin;
    BookingService
      .viewAllCreatedBookings(typeofUser, userId)
      .then(response => res.status(200).json({
        status: 'success',
        message: 'Successfully fetched all Bookings',
        data: response.rows,
      }))
      .catch(err => res.status(400).json(err)({
        status:"error",
        error: "error fetching all Bookings"
      }));
  }

  /**
   * View all Bookings
   * @staticmethod
   * @param  {object} req - Booking object export default BookingController
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static DeleteUserBooking(req, res) {
    const userId = req.userData.id;
    const typeofUser = req.userData.is_admin;
    const bookingId = req.params.id;
    BookingService
      .DeleteBooking(typeofUser, userId, bookingId)
      .then(response => res.status(200).json({
        status: 'success',
        message: 'Successfully Deleted Booking',
        data: response.rows,
      }))
      .catch(err => res.status(400).json(err)({
        status:"error",
        error: "Booking Not Deleted Succesfully",
      }));
  }

  /**
     * Update Booking Destination
     * @staticmethod
     * @param  {object} req - Booking object
     * @param {object} res - Response object
     * @return {json} res.json
     */
  static updateBookingSeatNumber(req, res) {
    const {
      trip_id,
    } = req.params;
    const {seat_number} = req.body;
console.log('h111',trip_id)
    BookingService
      .bookingupdateseatNumber(trip_id, seat_number)
      .then(response => res.status(200).json({
        status: "success",
        message: 'Booking SeatNumber Updated Successfully',
        data: response,
      }))
    // eslint-disable-next-line no-unused-vars
    .catch(err => res.status(400).json({
      status:"error",
      error: err.message
    }));
  }
}


export default BookingController;
