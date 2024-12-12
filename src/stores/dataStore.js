import {defineStore} from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
  state: () => ({
    films: [],
    filmsTotal: null,
    halls: [],
    hallsTotal: null,
    errorMsg: "",
    errorCode: null,
  }),
  actions: {
    async getFilms(perpage = 5, page = 0) {
      try {
        const { data } = await axios.get(backendUrl +'/film', {
          params: {
            perpage,
            page,
          }
        })
        this.films = data;
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

    async getFilmsTotal() {
      try {
        const {data} = await axios.get( backendUrl + '/film_total');
        this.filmsTotal = data;
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

    async getHalls(perpage = 5, page = 0) {
      try {
        const { data } = await axios.get(backendUrl +'/hall', {
          params: {
            perpage,
            page,
          }
        })
        this.halls = data;
        console.log(data)
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

    async getHallsTotal() {
      try {
        const {data} = await axios.get( backendUrl + '/hall_total');
        this.hallsTotal = data;
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

    async createHall(formData) {
      this.errorMsg = "";
      try {
        const {data} = await axios.post(backendUrl + '/hallPicture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        });
        this.errorCode = data.code;
        this.errorMsg = data.message;
      } catch (e) {
        if (e.response) {
          this.errorCode = 11;
          this.errorMsg = e.response.data.message;
        } else if (e.request) {
          this.errorCode = 12;
          this.errorMsg = e.message;
        } else {
          this.errorCode = 13;
        }
        console.log(e);
      }
    }
  }
})