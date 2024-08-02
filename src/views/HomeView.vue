<template>
  <div class="container-fluid bg-secondary">
    <div class="container">
      <h1 class="display-5 text-white fw-bold text-center py-4">Prueba Vue</h1>
      
      <!-- Filtros para Usuarios y Fotos -->
      <PhotoUserFilters 
        :userFilter="userFilter" 
        :photoFilter="photoFilter" 
        @update:userFilter="userFilter = $event" 
        @update:photoFilter="photoFilter = $event"
      />

      <div class="row pt-5">
        <!-- Lista de Usuarios -->
        <div class="col-12 col-md-6">
          <UserList :filteredUsers="filteredUsers" />
        </div>
        
        <!-- Lista de Fotos -->
        <div class="col-12 col-md-6">
          <PhotoList :paginatedFilteredPhotosByAlbum="paginatedFilteredPhotosByAlbum" />
        </div>
      </div>

      <!-- Paginación -->
      <div v-if="totalPages > 1" class="text-center py-3 text-white">
        <button class="btn btn-primary mx-3" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="btn btn-primary mx-3" @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import { fetchPhotos, fetchUsers } from '../utils/api';
import { Photo, User } from '../types/interfaces';
import UserList from '../components/UserList.vue';
import PhotoList from '../components/PhotoList.vue';
import PhotoUserFilters from '../components/PhotoUserFilters.vue';

export default {
  components: {
    UserList,
    PhotoList,
    PhotoUserFilters
  },
  setup() {
    const users = ref<User[]>([]);
    const photos = ref<Photo[]>([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const photoFilter = ref('');
    const userFilter = ref('');

    onMounted(async () => {
      try {
        users.value = await fetchUsers();
        photos.value = await fetchPhotos();
      } catch (error) {
        console.error('Error loading data:', error);
      }
    });

    const filteredUsers = computed(() => {
      const filterText = userFilter.value.toLowerCase();
      return users.value.filter(user =>
        user.name.toLowerCase().includes(filterText) ||
        user.company.name.toLowerCase().includes(filterText)
      );
    });

    const filteredPhotos = computed(() => {
      const filterText = photoFilter.value.toLowerCase();
      return photos.value.filter(photo =>
        photo.title.toLowerCase().includes(filterText) ||
        photo.albumId.toString().includes(filterText)
      );
    });

    const groupedFilteredPhotos = computed(() => {
      return filteredPhotos.value.reduce((acc, photo) => {
        if (!Object.prototype.hasOwnProperty.call(acc, photo.albumId)) {
          acc[photo.albumId] = [];
        }
        acc[photo.albumId].push(photo);
        return acc;
      }, {} as Record<number, Photo[]>);
    });

    const paginatedFilteredPhotosByAlbum = computed(() => {
      const result: Record<number, Photo[]> = {};
      let count = 0;

      for (const albumId in groupedFilteredPhotos.value) {
        if (Object.prototype.hasOwnProperty.call(groupedFilteredPhotos.value, albumId)) {
          const photosInAlbum = groupedFilteredPhotos.value[Number(albumId)];

          for (const photo of photosInAlbum) {
            if (count >= (currentPage.value - 1) * itemsPerPage && count < currentPage.value * itemsPerPage) {
              if (!result[Number(albumId)]) {
                result[Number(albumId)] = [];
              }
              result[Number(albumId)].push(photo);
            }
            count++;
          }
        }
      }

      return result;
    });

    const totalPages = computed(() => Math.ceil(filteredPhotos.value.length / itemsPerPage));

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    return {
      userFilter,
      photoFilter,
      filteredUsers,
      paginatedFilteredPhotosByAlbum,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
    };
  },
};
</script>
