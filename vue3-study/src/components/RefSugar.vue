<template>
  <h2>Ref sugar</h2>
  <button @click="add">count: {{ count }}</button>
</template>

<script setup>
ref: count = 1;

const add = () => {
  count++;
};
</script>
