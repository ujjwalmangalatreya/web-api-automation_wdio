import { expect } from 'chai';
import BookingApi from '../api/booking.api.ts';

describe('Booking API', function () {
     this.timeout(10000);  // ✅ Properly set timeout inside function

     let bookingId: number;
     let token: string;

     const bookingData = {
          firstname: 'Jim',
          lastname: 'Brown',
          totalprice: 111,
          depositpaid: true,
          bookingdates: {
               checkin: '2018-01-01',
               checkout: '2019-01-01'
          },
          additionalneeds: 'Breakfast'
     };

     before(async function () {
          token = await BookingApi.getAuthToken();
          console.log('Received auth token:', token);
     });

     it('should create a booking', async function () {
          try {
               const res = await BookingApi.createBooking(bookingData);
               console.log('Create response:', res.data);
               expect(res.status).to.equal(200);
               expect(res.data.booking).to.include(bookingData);
               bookingId = res.data.bookingid;
               console.log('Created booking ID:', bookingId);
          } catch (err: any) {
               console.error('Create booking failed:', err.response?.data || err.message);
               throw err;
          }
     });

     it('should get the booking', async function () {
          const res = await BookingApi.ge(bookingId);
          expect(res.status).to.equal(200);
          expect(res.data.firstname).to.equal(bookingData.firstname);
     });

     it('should update the booking', async function () {
          const updatedData = { ...bookingData, firstname: 'Jane' };
          const res = await BookingApi.updateBooking(bookingId, updatedData, token);
          expect(res.status).to.equal(200);
          expect(res.data.firstname).to.equal('Jane');
     });

     it('should delete the booking', async function () {
          const res = await BookingApi.deleteBooking(bookingId, token);
          expect(res.status).to.equal(201);
     });

     it('should return 404 when getting a deleted booking', async function () {
          try {
               await BookingApi.getBooking(bookingId);
          } catch (err: any) {
               expect(err.response.status).to.equal(404);
          }
     });
});
