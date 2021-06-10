<template>
  <h2>Lifecycle Hooks</h2>
  <button @click="add">count: {{ count }}</button>
  <button>unmounted</button>
</template>

<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';

ref: count = 0;

const add = () => {
  count++;
};

const unmounted = () => {};

onBeforeMount(() => {
  console.log('%cbefore mount', 'color: red');
});

onMounted(() => {
  console.log('%cmounted', 'color: green');
});

onBeforeUpdate(() => {
  console.log('%cbeforeUpdate', 'color: red');
});

onUpdated(() => {
  console.log('%cupdated', 'color: green');
});

onBeforeUnmount(() => {
  console.log('%cbefore unmount', 'color: red');
});

onUnmounted(() => {
  console.log('%cunmounted', 'color: green');
});
</script>
