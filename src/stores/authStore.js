import {defineStore} from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuth: false,
    errorMsg: ""
  }),
  actions: {
    async login(info) {
      this.errorMsg = "";
      try {
        const { data } = await axios.post(backendUrl + '/login', info);
        this.token = data.token;
        this.user = data.user;
        this.isAuth = true;
        localStorage.setItem('token', this.token);
      } catch (e) {
        if (e.response) {
          this.errorMsg = e.response.data.message;
        } else if (e.request) {
          this.errorMsg = e.message;
        } else {
          console.log(e)
        }
      }
    },
    async getUser() {
      this.errorMsg = "";
      try {
        const {data} = await axios.get(backendUrl + '/getUser',{
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
        this.user = data;
      }  catch (e) {
        if (e.response) {
          this.errorMsg = e.response.data.message;
        } else if (e.request) {
          this.errorMsg = e.message;
        } else {
          console.log(e)
        }
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      this.isAuth = false;
      localStorage.removeItem('token');
    }
  }
})