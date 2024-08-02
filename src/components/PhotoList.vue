<template>
  <div v-if="Object.keys(paginatedFilteredPhotosByAlbum).length === 0">
    <p class="text-danger">No se encontraron fotos que coincidan con el filtro.</p>
  </div>
  <div v-for="(photos, albumId) in paginatedFilteredPhotosByAlbum" :key="albumId" class="album">
    <h3 class="text-center">Album {{ albumId }}</h3>
    <div class="row">
      <div v-for="photo in photos" :key="photo.id" class="col-md-4 col-6 mt-4">
        <PhotoItem :photo="photo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PhotoItem from '../components/PhotoItem.vue';
import { Photo } from '../types/interfaces';

export default defineComponent({
  name: 'PhotoList',
  components: {
    PhotoItem
  },
  props: {
    paginatedFilteredPhotosByAlbum: {
      type: Object as PropType<Record<number, Photo[]>>,
      required: true
    }
  }
});
</script>
