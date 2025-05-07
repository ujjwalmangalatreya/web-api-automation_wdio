import { expect } from 'chai';
import BookingApi from '../api/booking.api';

describe('Booking API', () => {
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


     before(async () => {
          token = await BookingApi.getAuthToken();
     });

     it('should create a booking', async () => {
          const res = await BookingApi.createBooking(bookingData);
          expect(res.status).to.equal(200);
          expect(res.data.booking).to.include(bookingData);
          bookingId = res.data.bookingid;
     });

     it.only('should get the booking', async () => {
          const res = await BookingApi.getBooking(bookingId);
          expect(res.status).to.equal(200);
          expect(res.data.firstname).to.equal(bookingData.firstname);
     });

     it('should update the booking', async () => {
          const updatedData = { ...bookingData, firstname: 'Jane' };
          const res = await BookingApi.updateBooking(bookingId, updatedData, token);
          expect(res.status).to.equal(200);
          expect(res.data.firstname).to.equal('Jane');
     });

     it('should delete the booking', async () => {
          const res = await BookingApi.deleteBooking(bookingId, token);
          expect(res.status).to.equal(201);
     });

     it('should return 404 when getting a deleted booking', async () => {
          try {
               await BookingApi.getBooking(bookingId);
          } catch (err: any) {
               expect(err.response.status).to.equal(404);
          }
     });
});
