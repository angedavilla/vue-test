<template>
  <div class="row pt-5">
    <div class="col-md-6">
      <h2 class="fw-bold my-3 text-start">Lista de Usuarios</h2>
      <div class="mb-3">
        <input 
          type="text" 
          class="form-control w-75 border border-info" 
          v-model="internalUserFilter"
          placeholder="Filtro para usuarios por nombre o compañía" 
        />
      </div>
    </div>

    <div class="col-md-6">
      <h2 class="my-3 text-start fw-bold">Álbumes de Fotos</h2>
      <div class="mb-3">
        <input 
          type="text" 
          class="form-control w-75 border border-info" 
          v-model="internalPhotoFilter"
          placeholder="Filtro de fotos por álbum o título" 
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PhotoUserFilters',
  props: {
    userFilter: {
      type: String,
      required: true
    },
    photoFilter: {
      type: String,
      required: true
    }
  },
  emits: ['update:userFilter', 'update:photoFilter'],
  computed: {
    internalUserFilter: {
      get(): string {
        return this.userFilter;
      },
      set(value: string) {
        this.$emit('update:userFilter', value);
      }
    },
    internalPhotoFilter: {
      get(): string {
        return this.photoFilter;
      },
      set(value: string) {
        this.$emit('update:photoFilter', value);
      }
    }
  }
});
</script>
