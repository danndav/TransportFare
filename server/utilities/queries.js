import bcrypt from 'bcrypt';
import moment from 'moment';
import db from './database/connect';


const saltRounds = 10;
const obj = {};
const err = {};


/**
 * @exports
 * @class queryProvider
 */
class queryProvider {
  /**
   * Find user by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static findUserByEmailQuery(email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE email = '${email}' `;
      db.query(query)
        .then((result) => {
          if (!(result.rowCount)) {
            err.Message = 'user does not exist';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          err.Message = 'Error Finding User';
          err.Status = '02';
          reject(err);
        });
    });
  }


  /**
   * Find busid by user
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static findBusStatus(busid) {
    console.log('printbus', busid);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Trips WHERE busid = ${busid} And status = 'active'`;
      db.query(query)
        .then((result) => {
          console.log('theeee', result);
          if (result.rowCount >= 1) {
            err.Message = 'bus not available';
            err.Status = 400;
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          console.log('yea error', error);
          err.Message = 'Error Finding busid from trip';
          err.Status = '02';
          reject(err);
        });
    });
  }


  /**
   * Find busid by user
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static findSeatNumberByTripid(tripid, seatnumber) {
    console.log('printbuseee', tripid, seatnumber);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Bookings WHERE tripid = '${tripid}' And seatnumber = '${seatnumber}'`;
      db.query(query)
        .then((result) => {
          console.log('theeee', result);
          console.log('rowww', result.rowCount);
          if (result.rowCount >= 1) {
            err.Message = 'seatnumber not available';
            err.Status = 400;
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          console.log('yea error', error);
          err.Message = 'Error Finding tripid from trip';
          err.Status = '02';
          reject(err);
        });
    });
  }

  /**
   * Find busid by user
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static viewAllTripsbyOriginDestinationQuery(origin, destination) {
    console.log('originnnnn', destination, origin);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Trips WHERE origin = '${origin}' and destination = '${destination}' `;
      db.query(query)
        .then((result) => {
          console.log('theeee', result);
          console.log('rowww', result.rowCount);
          if (!(result.rowCount)) {
            err.Message = 'Trips destination and origin cant be fetched';
            err.status = 400;
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          console.log('yea error', error);
          err.Message = 'Error Finding origin from trip';
          err.Status = '02';
          reject(err);
        });
    });
  }


  /**
   * Find busid by user
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static findAllTripsbyOriginQuery(origin) {
    console.log('printbuseee', origin);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Trips WHERE origin = '${origin}' `;
      db.query(query)
        .then((result) => {
          console.log('theeee', result);
          console.log('rowww', result.rowCount);
          if (!(result.rowCount)) {
            err.Message = 'Trips origin cant be  fetched';
            err.status = 400;
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          console.log('yea error', error);
          err.Message = 'Error Finding origin from trip';
          err.Status = '02';
          reject(err);
        });
    });
  }

  /**
   * Find busid by user
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static findAllTripsbyDestinationQuery(destination) {
    console.log(destination);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Trips WHERE destination = '${destination}' `;
      db.query(query)
        .then((result) => {
          console.log('theeee', result);
          console.log('rowww', result.rowCount);
          if (!(result.rowCount)) {
            err.Message = 'Trips destination cant be fetched';
            err.Status = 400;
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          console.log('yea error', error);
          err.Message = 'Error Finding destination from trip';
          err.Status = '02';
          reject(err);
        });
    });
  }


  /**
   * Find Trip By id
   * @staticmethod
   * @param  {string} id - Request object
   * @return {string} res
   */
  static findTripsById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Trips WHERE id = '${id}'`;
      db.query(query)
        .then((result) => {
          if (!(result.rowCount)) {
            err.Message = 'Trip number not found';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.Message = 'Error Finding trip';
          err.Status = '02';
          reject(err);
        });
    });
  }


  /**
   * Find user By id
   * @staticmethod
   * @param  {string} id - Request object
   * @return {string} res
   */
  static findUserById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE id = '${id}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            err.Message = 'user Array Empty';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.Message = 'Error Finding user';
          err.Status = '02';
          reject(err);
        });
    });
  }


  /**
   * Find bus by userid
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static findBusByBusid(busid) {
    return new Promise((resolve, reject) => {
      console.log('busid', busid);
      const query = `SELECT * FROM Buses WHERE id = ${busid}`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            err.Message = 'bus does not exist';
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          console.log(error);
          err.Message = 'Error Finding Bus';
          err.Status = '02';
          reject(err);
        });
    });
  }

  /**
   * Find bus by plate number
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static findBusByplateNumberQuery(plateNumber) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Buses WHERE number_plate = '${plateNumber}' `;
      db.query(query)
        .then((result) => {
          if (!(result.rowCount)) {
            err.Message = 'bus does not exist';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.Message = 'Error Finding Bus';
          err.Status = '02';
          reject(err);
        });
    });
  }


  /**
   * Delete user by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static deleteUserByEmailQuery(email) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM users WHERE email = '${email}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const message = 'user does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            const response = 'User Deleted';
            resolve(response);
          }
        })
        .catch((error) => {
          const messager = 'Error Finding User';
          reject(error);
        });
    });
  }

  /**
   * Delete user by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static deleteBusByplateNumber(numberPlate) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Buses WHERE number_plate = '${numberPlate}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const message = 'plate number does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            const response = 'bus Deleted';
            resolve(response);
          }
        })
        .catch((error) => {
          const messager = 'Error Finding bus';
          reject(error);
        });
    });
  }


  /**
   * Delete user by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static deleteSeatNumber(seatNumber) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Bookings WHERE seatnumber= '${seatNumber}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const message = 'seatnumber number does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            const response = 'seatnumber Deleted';
            resolve(response);
          }
        })
        .catch((error) => {
          const messager = 'Error Finding seatnumber';
          reject(error);
        });
    });
  }


  /**
   * Delete user by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static deleteTripIdFromBooking(tripid) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Bookings WHERE tripid = '${tripid}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const message = 'tripid number does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            const response = 'tripid Deleted';
            resolve(response);
          }
        })
        .catch((error) => {
          const messager = 'Error Finding tripid';
          reject(error);
        });
    });
  }

  /**
   * Find all Booking
   * @staticmethod
   * @param  {string} id - Request object
   * @return {string} res
   */
  static findAllmyBookingQuery(users) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Bookings WHERE createduser = '${users}'`;
      db.query(query)
        .then((result) => {
          if (!(result.rowCount)) {
            err.Message = 'Bookings Array Empty';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.Message = 'Error Finding All Trips';
          err.Status = '02';
          reject(err);
        });
    });
  }


  /**
   * Find all Booking
   * @staticmethod
   * @param  {string} id - Request object
   * @return {string} res
   */
  static findAllBookingsQuery() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Bookings ';
      db.query(query)
        .then((result) => {
          if (!(result.rowCount)) {
            err.Message = 'Bookings Array Empty';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.Message = 'Error Finding All Trips';
          err.Status = '02';
          reject(err);
        });
    });
  }


  /**
   * Delete user by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static deleteBookingByid(bookingId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Bookings WHERE id = '${bookingId}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const message = {};
            message.status = 400;
            message.error = 'booking id does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            const response = 'booking Deleted';
            resolve(response);
          }
        })
        .catch((error) => {
          const messager = 'Error Finding Booking Id';
          reject(error);
        });
    });
  }

  /**
   * Delete user by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static UserdeleteBookingByid(userId, bookingId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Bookings WHERE id = '${bookingId}' and createduser='${userId}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const message = {};
            message.status = 400;
            message.error = 'booking id does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            const response = 'booking Deleted';
            resolve(response);
          }
        })
        .catch((error) => {
          const messager = 'Error Finding Booking Id';
          reject(error);
        });
    });
  }


  /**
   * Delete user by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static deleteTripByBusid(busid) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Trips WHERE busid = '${busid}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const message = 'busid does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            const response = 'bus Deleted';
            resolve(response);
          }
        })
        .catch((error) => {
          const messager = 'Error Finding bus';
          reject(error);
        });
    });
  }


  /**
   * save new user
   * @staticmethod
   * @param  {string} body - Request object
   * @return {string} res
   */
  static saveUserQuery(body) {
    const {
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
      isAdmin,
    } = body;

    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdAt = `${date} ${time}`;


    return new Promise((resolve, reject) => {
      this.findUserByEmailQuery(email)
        .then((error) => {
          reject(error);
        })
        .catch(() => {
          bcrypt.hash(password, saltRounds).then((hash) => {
            const queryBody = `
                              INSERT INTO users(email,firstname, lastname, password, phonenumber, createdon, isadmin)
                              VALUES ( '${email}','${firstName}', '${lastName}', '${hash}', '${phoneNumber}','${createdAt}', '${isAdmin}') returning * `;
            db.query(queryBody)
              .then((result) => {
                if (result.rowCount) {
                  resolve(result.rows);
                } else if (!(result.rowCount)) {
                  const response = 'Could Not Save User';
                  reject(response);
                }
              })
              .catch((e) => {
                reject(e);
              });
          });
        });
    });
  }

  /**
   * Save Account Query
   * @staticmethod
   * @param  {string} body - Request object
   * @param  {string} userid - Request object
   * @return {string} res
   */
  static saveBusQuery(body, userid) {
    const {
      numberPlate,
      manufacturer,
      model,
      year,
      capacity,
    } = body;

    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdAt = `${date} ${time}`;

    return new Promise((resolve, reject) => {
      this.findBusByplateNumberQuery(numberPlate)
        .then((error) => {
          reject(error);
        })
        .catch(() => {
          const queryBody = `
            INSERT INTO Buses(userid, number_plate, manufacturer, model, year, capacity, createdon)
  VALUES (${userid}, '${numberPlate}', '${manufacturer}', '${model}', '${year}', '${capacity}', '${createdAt}') returning * `;
          db.query(queryBody)
            .then((result) => {
              if (result.rowCount >= 1) {
                resolve(result);
              } else if (result.rowCount === 0) {
                const response = 'Could Not Save Buses';
                reject(response);
              }
            })
            .catch((e) => {
              reject(e);
            });
        });
    });
  }


  /**
   * Save Trip Query
   * @staticmethod
   * @param  {string} body - Request object
   * @param  {string} userid - Request object
   * @return {string} res
   */
  static saveTripQuery(body, userid) {
    const {
      busId,
      origin,
      destination,
      tripDate,
      fare,
      status,
    } = body;


    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdAt = `${date} ${time}`;
    const tripDateformat = moment(tripDate).format('DD-MM-YYYY');

    return new Promise((resolve, reject) => {
      this.findBusByBusid(busId)
        .then((res) => {
          const {
            capacity,
          } = res.rows[0];
          this.findBusStatus(busId).then(() => {
            const queryBody = `
                INSERT INTO Trips(createduser, busid, origin, destination, tripdate, fare, status,capacity, createdon)
      VALUES ( ${userid},'${busId}','${origin}', '${destination}','${tripDateformat}','${fare}','${status}','${capacity}','${createdAt}') returning * `;
            db.query(queryBody)
              .then((result) => {
                if (result.rowCount >= 1) {
                  resolve(result);
                } else if (result.rowCount === 0) {
                  const response = 'Could Not Save Trip';
                  reject(response);
                }
              })
              .catch((e) => {
                console.log('firsterror', e);
                reject(e);
              });
          }).catch(() => {
            const obj1 = {};
            obj1.status = 404;
            obj1.Error = 'This bus id is already assign to a trip';
            reject(obj1);
          });
        })
        .catch((error) => {
          err.status = 400;
          err.Message = 'this bus id does not exist';
          reject(error);
        });
    });
  }

  /**
   * Find all user
   * @staticmethod
   * @param  {string} id - Request object
   * @return {string} res
   */
  static findAllTripsQuery() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Trips';
      db.query(query)
        .then((result) => {
          if (!(result.rowCount)) {
            err.Message = 'Trips Array Empty';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.Message = 'Error Finding All Trips';
          err.Status = '02';
          reject(err);
        });
    });
  }


  /**
   * Update Trips Status Query
   * @staticmethod
   * @param  {string} Tripsid - Request object
   * @param  {string} body - Request object
   * @return {string} res
   */
  static updateTripStatusQuery(id, body) {
    const {
      status,
    } = body;
    return new Promise((resolve, reject) => {
      const queryBody = `UPDATE Trips SET status = '${status}' WHERE id = '${id}' returning * `;
      db.query(queryBody)
        .then((result) => {
          if (result.rowCount === 0) {
            const response = 'Trips does not exist';
            reject(response);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          const error = 'Error Finding trip';
          reject(error);
        });
    });
  }


  /**
   * Update Trips Status Query
   * @staticmethod
   * @param  {string} Tripsid - Request object
   * @param  {string} body - Request object
   * @return {string} res
   */
  static updateSeatNumberQuery(tripId, body) {
    const {
      seatNumber,
    } = body;
    console.log('bodyyy', body);
    return new Promise((resolve, reject) => {
      this.findTripsById(tripId).then((res) => {
        const {
          capacity,
        } = res.rows[0];
        console.log('omoo', res.rows[0]);
        console.log('seattttttt', typeof (seatNumber), typeof (capacity));
        if (Number(seatNumber) > Number(capacity)) {
          const obj2 = {};
          obj2.status = 400;
          obj2.Message = `this seat number is not available pls select from 1 to ${capacity}`;
          return reject(obj2);
        }
        this.findSeatNumberByTripid(tripId, seatNumber).then((respond) => {
          console.log('alllll', respond.rows.length);
          if (respond.rows.length > 0) {
            const obj2 = {};
            obj2.status = 400;
            obj2.Message = 'this seatNumber has been taken pls choose available seat number';
            reject(obj2);
          }

          console.log('testmeee', seatNumber, tripId);
          const queryBody = `UPDATE Bookings SET seatnumber = '${seatNumber}' WHERE tripid = '${tripId}' returning * `;
          db.query(queryBody)
            .then((result) => {
              if (result.rowCount === 0) {
                console.log('identity.', result.rowCount);
                const response = 'Trips does not exist';
                reject(response);
              } else if (result.rowCount >= 1) {
                obj.rowCount = result.rowCount;
                obj.rows = result.rows;
                resolve(obj);
              }
            })
            .catch((erro) => {
              const error = 'Error Finding trip';
              console.log(erro);
              reject(error);
            });
        }).catch((error) => {
          console.log(error);
          return reject(err);
        });
      })
        .catch((error) => {
          console.log(error);
          return reject(err);
        });
    });
  }


  /**
   * Save Booking Query
   * @staticmethod
   * @param  {string} body - Request object
   * @param  {string} userid - Request object
   * @return {string} res
   */
  static saveBookingQuery(body, userid, useremail, userfname, userlname) {
    const {
      tripId,
      seatNumber,
    } = body;

    console.log('tripppiddd', tripId, seatNumber);


    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdAt = `${date} ${time}`;

    return new Promise((resolve, reject) => {
      this.findTripsById(tripId).then((res) => {
        const {
          tripdate,
          busid,
          capacity,
        } = res.rows[0];
        console.log('seattttttt', typeof (seatNumber), typeof (capacity));
        if (Number(seatNumber) > Number(capacity)) {
          const obj2 = {};
          obj2.status = 400;
          obj2.Message = `this seat number is not available pls select from 1 to ${capacity}`;
          return reject(obj2);
        }
        this.findSeatNumberByTripid(tripId, seatNumber).then((respond) => {
          console.log('alllll', respond.rows.length);
          if (respond.rows.length > 0) {
            const obj2 = {};
            obj2.status = 400;
            obj2.Message = 'this seatNumber has been taken pls choose available seat number';
            reject(obj2);
          }

          const queryBody = `
                INSERT INTO Bookings(createduser, tripid, busid, tripdate, seatnumber,firstname, lastname, email,createdon)
      VALUES ( ${userid},'${tripId}','${busid}', '${tripdate}','${seatNumber}','${userfname}','${userlname}','${useremail}','${createdAt}') returning * `;
          db.query(queryBody)
            .then((result) => {
              if (result.rowCount >= 1) {
                resolve(result);
              } else if (result.rowCount === 0) {
                const response = 'Could Not Save Booking';
                reject(response);
              }
            })
            .catch((e) => {
              console.log('firsterror', e);
              reject(e);
            });
        }).catch((error) => {
          console.log(error);
          return reject(err);
        });
      })
        .catch((error) => {
          console.log(error);
          return reject(err);
        });
    });
  }
}

export default queryProvider;
