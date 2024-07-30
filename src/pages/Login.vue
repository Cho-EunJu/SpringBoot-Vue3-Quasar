<template>
  <q-page class="window-height row justify-center items-center">
    <div class="column">
      <div class="row">
        <h4 class="text-h4 text-primary q-my-md">로그인을 해주세요.</h4>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section class="q-gutter-md">
            <!-- <q-form class="q-gutter-md"> -->
            <q-input square filled clearable v-model="form.email" type="email" label="email" />
            <q-input
              square
              filled
              clearable
              v-model="form.password"
              type="password"
              label="password"
            />
            <!-- </q-form> -->
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="primary"
              size="lg"
              class="full-width"
              label="Login"
              @click="login()"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <router-link class="text-grey-6 inline-block q-mt-md cursor-pointer msg1" to="/join">
              Not reigistered? Created an Account. Click Here !
            </router-link>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import { useLoginStore } from 'src/stores/store_login';

defineOptions({
  name: 'Login',
});

const router = useRouter();
const loginStore = useLoginStore();

const form = reactive({
  email: '',
  password: '',
});

const login = () => {
  api.post('/api/v1/account/login', form).then(res => {
    const token = res.data.user.token;
    const userName = res.data.user.userName;

    window.alert(userName + '님 환영합니다!');

    loginStore.setLoginInfo(token, userName);

    router.push('/');
    // localStorage.setItem('token', token);
    // localStorage.setItem('name', userName);
  });
};
</script>

<style scoped>
.q-card {
  width: 400px;
}
.msg1:hover {
  color: #d84315 !important;
}
</style>
