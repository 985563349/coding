function binarySearch(data, target) {
  // 上、下界指针
  let start = 0;
  let end = data.length - 1;

  while (start <= end) {
    // 找出中间值
    const mid = ~~((start + end) / 2);

    if (data[mid] === target) {
      return mid;
    } else if (data[mid] < target) {
      // 查找值 大于 中间值，偏移上界指针值
      start = mid + 1;
    } else {
      // 查找值 小于 中间值，偏移下届指针
      end = mid - 1;
    }
  }

  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 2));
