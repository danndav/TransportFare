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
  static findBusStatus(bus_id) {
    console.log('printbus', bus_id);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Trips WHERE busid = ${bus_id} And status = 'active'`;
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
  static findSeatNumberByTripid(trip_id, seat_number) {
    console.log('printbuseee', trip_id, seat_number);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Bookings WHERE tripid = '${trip_id}' And seatnumber = '${seat_number}'`;
      db.query(query)
        .then((result) => {
          console.log('theeee', result);
          console.log('rowww', result.rowCount);
          if (result.rowCount >= 1) {
            console.log("I'm in here");
            reject(new Error("this seat number is not available"));
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          reject(new Error('Error finding trip Id from trip') );
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
            reject(new Error("Error finding destination and origin from trip.") );
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          reject(new Error("Error finding destination and destinationfrom trip.") );
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
            reject(new Error("Trip origin can not be fetched.") );
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          reject(new Error("Error finding origin from trip.") );
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
            reject(new Error("Error finding destination from trip.") );
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          reject(new Error("Error finding destination from trip.") );
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
  static findBusByBusid(bus_id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Buses WHERE id = ${bus_id}`;
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
  static findBusByplateNumberQuery(plate_number) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Buses WHERE number_plate = '${plate_number}' `;
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
  static deleteBusByplateNumber(number_plate) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Buses WHERE number_plate = '${number_plate}'`;
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
  static deleteSeatNumber(seat_number) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Bookings WHERE seatnumber= '${seat_number}'`;
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
  static deleteTripIdFromBooking(trip_id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Bookings WHERE tripid = '${trip_id}'`;
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
  static deleteBookingByid(booking_id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Bookings WHERE id = '${booking_id}'`;
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
  static UserdeleteBookingByid(user_id, booking_id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Bookings WHERE id = '${booking_id}' and createduser='${user_id}'`;
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
  static deleteTripByBusid(bus_id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Trips WHERE busid = '${bus_id}'`;
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
      first_name,
      last_name,
      password,
      phone_number,
    } = body;

    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const created_at = `${date} ${time}`;
    const is_admin='';
    const isAdmin = is_admin ? is_admin : false
   

    return new Promise((resolve, reject) => {
      this.findUserByEmailQuery(email)
        .then((error) => {
          reject(new Error("This email already exists please sign with a different email.") );
        })
        .catch(() => {
          bcrypt.hash(password, saltRounds).then((hash) => {
            const queryBody = `
                              INSERT INTO users(email,firstname, lastname, password, phonenumber, createdon, isadmin)
                              VALUES ( '${email}','${first_name}', '${last_name}', '${hash}', '${phone_number}','${created_at}', '${isAdmin}') returning * `;
            db.query(queryBody)
              .then((result) => {
                if (result.rowCount) {
                  resolve(result.rows);
                } else if (!(result.rowCount)) {
                  reject(new Error("Could not save user") );
                }
              })
              .catch((e) => {
                console.log(e)
                reject(new Error("could not save user") );
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
  static saveBusQuery(body, user_id) {
    const {
      number_plate,
      manufacturer,
      model,
      year,
      capacity,
    } = body;

    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const created_at = `${date} ${time}`;

    return new Promise((resolve, reject) => {
      this.findBusByplateNumberQuery(number_plate)
        .then((error) => {
          reject(error);
        })
        .catch(() => {
          const queryBody = `
            INSERT INTO Buses(userid, number_plate, manufacturer, model, year, capacity, createdon)
  VALUES (${user_id}, '${number_plate}', '${manufacturer}', '${model}', '${year}', '${capacity}', '${created_at}') returning * `;
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
  static saveTripQuery(body, user_id) {
    const {
      bus_id,
      origin,
      destination,
      trip_date,
      fare,
      status,
    } = body;


    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const created_at = `${date} ${time}`;
    const trip_dateformat = moment(trip_date).format('DD-MM-YYYY');

    return new Promise((resolve, reject) => {
      this.findBusByBusid(bus_id)
        .then((res) => {
          const {
            capacity,
          } = res.rows[0];
          this.findBusStatus(bus_id).then(() => {
            const queryBody = `
                INSERT INTO Trips(createduser, busid, origin, destination, tripdate, fare, status,capacity, createdon)
      VALUES ( ${user_id},'${bus_id}','${origin}', '${destination}','${trip_dateformat}','${fare}','${status}','${capacity}','${created_at}') returning * `;
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
          }).catch((error) => {
            reject(new Error("This bus ID is already assigned to a trip.") );
          });
        })
        .catch((error) => {
          reject(new Error("This bus ID is is not found.") );
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
            reject(new Error('Trip Id does not exists') );
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((error) => {
          reject(new Error('Error finding Trip') );
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
  static updateSeatNumberQuery(trip_id, seat_number) {
    console.log('bodyyy', seat_number);
    return new Promise((resolve, reject) => {
      this.findTripsById(trip_id).then((res) => {
        const {
          capacity,
        } = res.rows[0];
        console.log('omoo', res.rows[0].capacity);
         
        if (Number(seat_number) > Number(capacity)) {
          reject(new Error(`this seat number is not available pls select from 1 to ${capacity}`) );
         
        }
        this.findSeatNumberByTripid(trip_id, seat_number).then((respond) => {
          if (respond.rows.length > 0) {
          reject(new Error('this seatNumber has been taken pls choose available seat number') );
            
          }
          const queryBody = `UPDATE Bookings SET seatnumber = '${seat_number}' WHERE tripid = '${trip_id}' returning * `;
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
              
              console.log(erro);
              reject(erro);
            });
        }).catch((error) => {
          console.log(error);
          return reject(error);
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
  static saveBookingQuery(body, user_id, useremail, userfname, userlname) {
    const {
      trip_id,
      seat_number,
    } = body;

console.log('trtrtrt',trip_id,seat_number)
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdAt = `${date} ${time}`;

    return new Promise((resolve, reject) => {
      this.findTripsById(trip_id).then((res) => {
        const {
          tripdate,
          busid,
          capacity,
        } = res.rows[0];
        
        if (Number(seat_number) > Number(capacity)) {
          reject(new Error(`this seat number is not available pls select from 1 to ${capacity}`) );
         
        }
        this.findSeatNumberByTripid(trip_id, seat_number).then((respond) => {
          if (respond.rows.length > 0) {
          reject(new Error('this seatNumber has been taken pls choose available seat number') );
            
          }

          const queryBody = `
                INSERT INTO Bookings(createduser, tripid, busid, tripdate, seatnumber,firstname, lastname, email,createdon)
      VALUES ( ${user_id},'${trip_id}','${busid}', '${tripdate}','${seat_number}','${userfname}','${userlname}','${useremail}','${createdAt}') returning * `;
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
          return reject(error);
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
