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
    const userId = req.userData.id;
    BookingService
      .saveBooking(req.body, userId)
      .then(data => res.status(201).json({
        status: 201,
        data,
        message: 'New Booking created successfully',
      }))
      .catch(err => res.status(400).json(err));
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
    const typeofUser = req.userData.isAdmin;
    BookingService
      .viewAllCreatedBookings(typeofUser, userId)
      .then(response => res.status(200).json({
        status: 200,
        message: 'Successfully fetched all Bookings',
        data: response.rows,
      }))
      .catch(err => res.status(400).json(err));
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
    const typeofUser = req.userData.isAdmin;
    const bookingId = req.params.id;
    BookingService
      .DeleteBooking(typeofUser, userId, bookingId)
      .then(response => res.status(200).json({
        status: 200,
        message: 'Successfully Deleted Booking',
        data: response.rows,
      }))
      .catch(err => res.status(400).json(err));
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
      tripId,
    } = req.params;
    const seatnumber = req.body;

    BookingService
      .bookingupdateseatNumber(tripId, seatnumber)
      .then(response => res.status(200).json({
        status: 200,
        message: 'Booking SeatNumber Updated Successfully',
        data: response,
      }))
    // eslint-disable-next-line no-unused-vars
      .catch(err => res.status(404).json({
        status: 404,
        error: 'This Booking does not exist',
      }));
  }
}


export default BookingController;
