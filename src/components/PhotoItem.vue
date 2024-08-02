<template>
  <div class="card mb-3 rounded-3 border-info">
    <img :src="photo.thumbnailUrl" :alt="photo.title" class="card-img-top" />
    <div class="card-body">
      <p class="card-text">{{ photo.title }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Photo } from '../types/interfaces';

export default defineComponent({
  name: 'PhotoItem',
  props: {
    photo: {
      type: Object as PropType<Photo>,
      required: true
    }
  }
});
</script>
