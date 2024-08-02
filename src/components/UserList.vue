<template>
  <ul>
    <h3 class="text-start">Usuarios</h3>
    <li class="text-danger" v-if="filteredUsers.length === 0">No se encontraron usuarios que coincidan con el filtro.</li>
    <UserItem v-for="user in filteredUsers" :key="user.id" :user="user" />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import UserItem from '../components/UserItem.vue';
import { User } from '../types/interfaces';

export default defineComponent({
  name: 'UserList',
  components: {
    UserItem
  },
  props: {
    filteredUsers: {
      type: Array as PropType<User[]>,
      required: true
    }
  }
});
</script>
