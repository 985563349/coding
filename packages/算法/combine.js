/**
 *  有这样三个数组：
 *    let names = ['iPhoneX', 'iPhone XS']
 *    let colors = ['黑色', '白色']
 *    let storages = ['64g', '256g']
 *
 *  需要将其排列组合起来，最终得到这样一个数组
 *    [
 *      ['iPhoneX', '黑色', '64g'],
 *      ['iPhoneX', '黑色', '256g'],
 *      ['iPhoneX', '白色', '64g'],
 *      ['iPhoneX', '白色', '256g'],
 *      ['iPhone XS', '黑色', '64g'],
 *      ['iPhone XS', '黑色', '256g'],
 *      ['iPhone XS', '白色', '64g'],
 *      ['iPhone XS', '白色', '256g']
 *    ]
 */

const names = ['iPhoneX', 'iPhone XS'];
const colors = ['黑色', '白色'];
const storages = ['64g', '256g'];

function combine(...chunks) {
  const res = [];

  function helper(chunkIndex, prev) {
    const chunk = chunks[chunkIndex];
    const isLase = chunkIndex === chunks.length - 1;

    for (let i = 0; i < chunk.length; i++) {
      const cur = prev.concat(chunk[i]);
      if (isLase) {
        // 如果已处理到数组最后一项，则把拼接的结构放入返回值中
        res.push(cur);
      } else {
        helper(chunkIndex + 1, cur);
      }
    }
  }

  helper(0, []);

  return res;
}

combine(names, colors, storages);
