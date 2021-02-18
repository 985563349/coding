// 非递归版
function binarySearch(data, target) {
  let start = 0;
  let end = data.length - 1;

  while (start <= end) {
    const mid = ~~((start + end) / 2);

    if (data[mid] === target) {
      return mid;
    } else if (data[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 2));
