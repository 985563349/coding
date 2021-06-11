<template>
  <h2>toRefs</h2>
  <p style="color: orange">like: {{ like }} 🍊</p>
  <button @click="age++">increment1</button>
  <button @click="ageRef++">increment2</button>
</template>

<script setup>
import { reactive, toRefs, toRef } from 'vue';

const like = reactive({
  name: 'LiuYuGe',
  age: 21,
  gender: 'female',
});

// 直接解构会丢失响应
let { age } = like;

// 使用toRefs解构不会丢失响应
let { age: ageRef } = toRefs(like);

// 使用toRef获取属性也不会丢失响应
// let { age: ageRef } = toRef(like, 'age');
</script>

<style scoped>
p {
  margin-bottom: 6px;
}

button {
  margin-right: 10px;
}
</style>
