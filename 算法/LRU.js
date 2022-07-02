/**
 * LRU:
 * LRU英文全称是 Least Recently Used，英译过来就是 “最近最少使用” 的意思。
 */
class LRUCache {
  constructor(length) {
    this.length = length; // 存储长度
    this.data = new Map(); // 存储数据
  }

  set(key, value) {
    const data = this.data;

    // 删除后再插入，目的是更新插入key的顺序，保证当前key为最近使用
    if (data.has(key)) {
      data.delete(key);
    }
    data.set(key, value);

    // 超出容量，删除最久的数据
    if (data.size > this.length) {
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }

  get(key) {
    const data = this.data;
    if (!data.has(key)) {
      return null;
    }

    // 删除后再插入，目的是更新插入key的顺序，保证当前key为最近使用
    const value = data.get(key);
    data.delete(key);
    data.set(key, value);
  }
}

// const map = new Map();

// map.set('name', 'Jack');
// map.set('age', '20');
// map.set('name', 'Rose');

// console.log(map.keys().next()); // => name

const lruCache = new LRUCache(5);

lruCache.set('name', 'Jack');
lruCache.set('age', '20');
lruCache.set('name', 'Rose');

console.log(lruCache.data.keys().next()); // => age
