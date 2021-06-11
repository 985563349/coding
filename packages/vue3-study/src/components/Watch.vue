<template>
  <h2>Watch</h2>
  <p>count: {{ count }}</p>
  <p style="color: orange">like: {{ like }}🍊</p>
  <button @click="like.age++">change</button>
</template>

<script setup>
import { ref, reactive, watch, watchEffect, onMounted } from 'vue';

const like = reactive({ name: 'LiuYuGe', age: 21 });
const count = ref(0);
// 使用ref语法糖watch无法直接监听
// ref: count = 1;

/**
 * watch监听单个值：count
 * watch监听多个值：[count1, count2],
 * watch监听计算属性： () => count.value
 * watch监听多个计算属性：[() => count1.value, () => count2.value]
 *
 * callback(newVal: 新值, oldVal: 旧值, onInvalidate: 清除副作用)
 *
 * options: {
 *    deep: boolean; 深度监听
 *    immediate: 立即已当前值触发callback
 * }
 */
const stopWatch = watch(count, (newVal, oldVal) => {
  console.log(`newVal: ${newVal} oldVal: ${oldVal}`);
  // watch停止监听
  if (newVal > 3) stopWatch();
});

/**
 * callback(onInvalidate: 清除副作用)
 *
 * options: {
 *  flush: 'pre' | 'post' | 'sync'; pre 组件更新前触发callback，post 组件更新后触发callback，sync同步触发callback
 *  onTrack: (event) => void; 响应式属性作为依赖被追踪时调用
 *  onTrigger: (event) => void; 依赖变化导致副作用函数执行时调用
 * }
 */

const stopWatchEffect = watchEffect(() => {
  console.log(`watchEffect: ${count.value}`);
  // watchEffect停止监听
  if (count.value > 3) stopWatchEffect();
});

watchEffect(() => {
  // 无法直接深度监听
  console.log(`like: ${like}`);
  /**
   * 以下两种情况可以监听：
   *    console.log(`age: ${like.age}`)
   *    console.log(`like: ${JSON.stringify(like)}`)
   */
});

onMounted(() => {
  setInterval(() => {
    count.value++;
  }, 1000);
});
</script>
