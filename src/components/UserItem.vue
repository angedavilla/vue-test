<template>
  <li class="mt-3">
    <strong class="fs-5">Nombre:</strong> {{ user.name }}<br />
    <strong class="fs-5">Nombre de usuario:</strong> {{ user.username }}<br />
    <strong class="fs-5">Correo electrónico:</strong> {{ user.email }}<br />
    <strong class="fs-5">Compañía:</strong> {{ user.company.name }}
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { User } from '../types/interfaces';

export default defineComponent({
  name: 'UserItem',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  }
});
</script>
