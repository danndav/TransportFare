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
}

export default BookingController;
