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
}

export default BookingController;
