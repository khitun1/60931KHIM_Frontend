<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useDataStore } from '@/stores/dataStore.js';
import { computed, onMounted, ref } from 'vue';
import router from '@/router/index.js';
import Button from 'primevue/button';


const store = useDataStore();
const halls = computed(() => store.halls);
const perpage = ref(5);
const offset = ref(0);
const total = computed(() => store.hallsTotal);

onMounted(async() => {
  await store.getHalls();
  await store.getHallsTotal();
})

console.log(halls.value)

const onPageChange = async(e) => {
  offset.value = e.first;
  perpage.value = e.rows;
  await store.getHalls(perpage.value, offset.value / perpage.value);
}
</script>

<template>
  <DataTable
    :value="halls"
    :lazy="true"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions=" [2, 5, 10]"
    :totalRecords="total"
    @page="onPageChange"
    responsive-layout="scroll"
    :laading="true"
    :first="offset"
  >
    <Column field="id" header="N°"/>
    <Column field="name" header="Hall's title"/>

    <Column header="Image">
      <template #body="slotProps">
        <img :src="slotProps.data.picture_url" :alt="slotProps.data.image" class="w-24 rounded" />
      </template>
    </Column>
    <template #footer>
      <div class="text-end">
        <Button type="button" @click="router.push('/createHall')" class="pi-plus" label="Добавить зал"/>
      </div>
    </template>
  </DataTable>
</template>

<style scoped>

</style>