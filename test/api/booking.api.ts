import axios from 'axios';

const BASE_URL = 'https://restful-booker.herokuapp.com';

export default class BookingApi {
     static async createBooking(data: any) {
          return axios.post(`${BASE_URL}/booking`, data, {
               headers: { 'Content-Type': 'application/json' }
          });
     }

     static async getBooking(id: number) {
          try {
               return axios.get(`${BASE_URL}/booking/${id}`);   
          } catch (error: any) {
               console.error('Create booking error:', error.response?.data || error.message);
               throw error;   
          }
          
     }

     static async updateBooking(id: number, data: any, token: string) {
          return axios.put(`${BASE_URL}/booking/${id}`, data, {
               headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': `token=${token}`
               }
          });
     }

     static async deleteBooking(id: number, token: string) {
          return axios.delete(`${BASE_URL}/booking/${id}`, {
               headers: { 'Cookie': `token=${token}` }
          });
     }


     static async getAuthToken() {
          const res = await axios.post(`${BASE_URL}/auth`, {
               username: 'admin',
               password: 'password123'
          }, {
               headers: { 'Content-Type': 'application/json' }
          });
          return res.data.token;
     }
}
