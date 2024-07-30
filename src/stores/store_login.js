import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userName: localStorage.getItem('name') || '',
  }),
  getters: {
    isLogin: state => !!state.token,
    getUserName: state => state.userName,
    getToken: state => state.token,
  },
  actions: {
    setLoginInfo(token, userName) {
      this.token = token;
      this.userName = userName;
      localStorage.setItem('token', token);
      localStorage.setItem('name', userName);
    },
    logout() {
      this.token = '';
      this.userName = '';
      localStorage.removeItem('token');
      localStorage.removeItem('name');
    },
  },
});
