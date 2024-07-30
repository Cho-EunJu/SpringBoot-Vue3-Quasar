<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <router-link style="text-decoration: none; color: #fff" to="/">
            Quasar + SpringBoot App
          </router-link>
        </q-toolbar-title>

        <div v-if="loginStore.isLogin" class="text-h5">
          {{ loginStore.getUserName }} 님 환영합니다. |
          <q-icon
            name="logout"
            class="cursor-pointer"
            title="로그아웃"
            @click="loginStore.logout()"
          ></q-icon>
        </div>
        <div v-else class="text-h5">
          <router-link style="text-decoration: none; color: #fff" to="/login">
            로그인 <q-icon name="login" class="cursor-pointer" title="로그인"></q-icon>
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
// import { reactive } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useLoginStore } from 'src/stores/store_login';

defineOptions({
  name: 'MainLayout',
});

const linksList = [
  {
    title: 'Notice',
    caption: 'github.com/quasarframework',
    icon: 'format_list_bulleted',
    to: '/notice',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const loginStore = useLoginStore();
</script>
