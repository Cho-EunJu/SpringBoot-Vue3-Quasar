import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { useLoginStore } from './store_login';

export const useBoardStore = defineStore('board', {
  state: () => ({
    contents: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchBoard(boardCode) {
      this.loading = true;
      const loginStore = useLoginStore();
      const token = loginStore.getToken;

      try {
        const response = await api.get(`/api/v1/board/${boardCode}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.contents = response.data;
        console.log(this.contents);
      } catch (error) {
        this.error = error;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
