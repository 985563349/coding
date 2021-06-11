<template>
  <div id="app">
    <h1>App</h1>
    <p>hello vue3</p>
    <hr />

    <RefSugar />
    <hr />

    <StyleVariables />
    <hr />

    <Lifecycle v-if="visible" />

    <button @click="() => (visible = !visible)">
      {{ visible ? 'hidden' : 'show' }}
    </button>
    <hr />

    <Reactive />
    <hr />

    <ToRefs />
    <hr />

    <Watch />
  </div>
</template>

<script setup>
import RefSugar from './components/RefSugar.vue';
import StyleVariables from './components/StyleVariables.vue';
import Lifecycle from './components/Lifecycle.vue';
import Reactive from './components/Reactive.vue';
import ToRefs from './components/ToRefs.vue';
import Watch from './components/Watch.vue';

ref: visible = true;
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
