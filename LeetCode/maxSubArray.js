function maxSubArray(nums) {
  let res = nums[0];
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    if (sum > 0) {
      sum += nums[i];
    } else {
      sum = nums[i];
    }
    res = res > sum ? res : sum;
  }

  return res;
}

maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
