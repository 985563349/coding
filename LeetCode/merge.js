/**
 * 合并两个有序数组 - 逆向双指针
 */

function merge(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let tail = m + n - 1;
  let cur;

  while (p1 >= 0 || p2 >= 0) {
    if (p1 === -1) {
      cur = nums2[p2--];
    } else if (p2 === -1) {
      cur = num1[p1--];
    } else if (nums1[p1] > nums2[p2]) {
      cur = nums1[p1--];
    } else {
      cur = nums2[p2--];
    }
    nums1[tail--] = cur;
  }
}

merge([1, 2, 3], 3, [0, 2, 5, 6], 4);
