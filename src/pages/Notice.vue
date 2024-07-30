<template>
  <q-page>
    <q-page class="q-mx-xl q-my-xl">
      <div v-if="loading"><q-spinner></q-spinner></div>
      <h2 v-if="error">{{ error.message }}</h2>
      <q-table
        v-if="!loading && !error"
        title="공지사항"
        :rows="contents"
        :columns="columns"
        row-key="name"
        @click="detail()"
      >
      </q-table>
    </q-page>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useLoginStore } from 'src/stores/store_login';
import { onMounted } from 'vue';
import { useBoardStore } from 'stores/store_board';
import { date } from 'quasar';

const router = useRouter();
const loginStore = useLoginStore();
const boardStore = useBoardStore();

const { contents, loading, error, fetchBoard } = boardStore;

onMounted(() => {
  if (!loginStore.isLogin) {
    window.alert('로그인 후 이용할 수 있습니다.\n로그인 화면으로 이동합니다.');
    router.push('/login');
  } else {
    fetchBoard('noti');
  }
});

const columns = [
  {
    name: 'name',
    required: true,
    label: '번호',
    align: 'center',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'title',
    required: true,
    label: '제목',
    align: 'left',
    field: row => row.title,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'author',
    required: true,
    label: '작성자',
    align: 'center',
    field: row => row.author,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'writeTime',
    required: true,
    label: '작성일시',
    align: 'center',
    field: row => row.writeTime,
    format: val => `${date.formatDate(val, 'YYYY-MM-DD HH:mm')}`, //date.formatDate(val, 'YYYY-MM-DDTHH:mm')
    sortable: true,
  },
];
</script>

<style lang="scss" scoped></style>
