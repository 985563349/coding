<template>
  <h2>Style Variables</h2>
  <p>hello style variables</p>
  <button @click="changeColor">color: {{ color }}</button>
</template>

<script setup>
import { reactive } from 'vue';

ref: color = 'green';

const styles = reactive({
  margin: '24px 0',
});

const changeColor = () => {
  color = color === 'green' ? 'yellow' : 'green';
};
</script>

<style scoped>
h2 {
  color: v-bind(color);
}

p {
  margin: v-bind('styles.margin');
}
</style>
