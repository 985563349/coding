<template>
  <h2>Ref sugar</h2>
  <button @click="add">count: {{ count }}</button>
</template>

<script setup>
// 使用ref语法糖，在setup中对其进行访问时不再需要.value
ref: count = 1;

const add = () => {
  count++;
};
</script>
