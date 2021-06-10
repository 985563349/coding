<template>
  <div id="app">
    <h1>App</h1>
    <p>hello vue3</p>
    <hr />
    <RefSugar />
    <hr />
    <StyleVariables />
    <hr />
    <Lifecycle />
  </div>
</template>

<script setup>
import RefSugar from './components/RefSugar.vue';
import StyleVariables from './components/StyleVariables.vue';
import Lifecycle from './components/Lifecycle.vue';
</script>

<style>
* {
  margin: 0;
}

h1,
h2,
hr {
  margin: 24px 0;
}
</style>
