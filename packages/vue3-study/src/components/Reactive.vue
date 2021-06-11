<template>
  <h2>Reactive</h2>
  <p>count: {{ count }}</p>
  <p>numeral: {{ numeral }}</p>
  <p style="color: orange">like: {{ like }} 🍊</p>
  <p>set: {{ set }}</p>
  <p>map: {{ map }}</p>
  <p>fnc: {{ fnc.value }}</p>
</template>

<script setup>
import { ref, reactive } from 'vue';

/**
 * 定义响应式数据的两种方式：
 *  ref: 用于定义基本类型值
 *  reactive: 用于定义引用类型值
 *
 *  reactive可用于定义对象、数组、map、set、函数，无论属性是否事先存在，都能触发视图更新
 */
const count = ref(0);
const numeral = reactive([]);
const like = reactive({});
const set = reactive(new Set([]));
const map = reactive(new Map([['name', 'LiuYuGe']]));
const fnc = reactive(function () {});

setTimeout(() => {
  // 修改对象
  like.name = 'LiuYuGe';
  like.age = 21;
  // 修改map
  map.set('age', 21);
  // 修改函数
  fnc.value = 'value';
}, 1000);

setInterval(() => {
  // ref值需要通过.value访问
  count.value++;
  // reactive值可以直接访问
  if (numeral.length < 10) numeral.push(numeral.length);
  // 修改set
  if (set.size < 10) set.add(set.size);
}, 1000);
</script>

<style scoped>
p {
  margin-bottom: 6px;
}
</style>
