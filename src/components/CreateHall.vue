<script setup>
  import { useDataStore } from '@/stores/dataStore.js';
  import { computed, ref } from 'vue';
  import { useToast } from 'primevue/usetoast';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import Toast from 'primevue/toast';

  const dataStore = useDataStore();
  const hallName = ref('');
  let hallImg = null;

  const errorMsg = computed(() => dataStore.errorMsg);
  const errorCode = computed(() => dataStore.errorCode);

  const toast = useToast();

  const changeCaption = event => {
    const file = event.target.files[0];
    if (file) {
      document.getElementById('file-label').innerHTML = '<span class="pi pi-file mx-3"/>' + file.name;
      hallImg = file;
    }
    else {
      document.getElementById('file-label').innerHTML = '<span class="pi pi-upload mx-3"/> Выбрать изображение';
      hallImg = null;
    }
  }

  const createHall = async() => {
    const formData = new FormData();
    formData.append('name', hallName.value);
    formData.append('image', hallImg);
    await dataStore.createHall(formData);
    if (errorCode.value > 0) {
      toast.add({
        severity: 'error',
        summary: "Ощибка добавления данных",
        detail: errorMsg.value,
        life: 4000
      });
    }
    else {
      toast.add({
        severity: 'success',
        summary: 'Данные успешно добавлены',
        detail: errorMsg.value,
        life: 4000});
    }

  }


</script>

<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createHall" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">Добавление зала</h2>
      <div class="flex flex-col">
        <InputText type="text" placeholder="Введите наименование" v-model="hallName"/>
      </div>
      <div class="mb-4 mt-4">
        <label for="file" id="file-label" class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2">
          <span class="pi pi-upload mx-3"/>
            Выбрать изображение
        </label>
        <input type="file" hidden id="file" name="file" v-on:change="changeCaption" required accept="image/*">
      </div>
      <div class="flex flex-col mt-6">
        <Button type="submit" label="Создать"/>
      </div>
    </form>
  </div>
<Toast position="bottom-right"/>
</template>

<style scoped>

</style>