<template>
  <h2>Lifecycle Hooks</h2>
  <button @click="add">count: {{ count }}</button>
  <button @click="throwError">throw error</button>
</template>

<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
} from 'vue';

ref: count = 0;

const add = () => {
  count++;
};

const throwError = () => {
  throw Error('error');
};

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

onErrorCaptured(() => {
  // 无法捕获组件自身错误
  console.log('%ccaptrued', 'color: red');
});

onBeforeUnmount(() => {
  console.log('%cbefore unmount', 'color: red');
});

onUnmounted(() => {
  console.log('%cunmounted', 'color: green');
});
</script>

<style scoped>
button {
  margin-right: 10px;
}
</style>
