/**
 * 顶层类型与底层类型
 *
 *        unknown
 * number string boolean ...
 *         never
 *
 * unknown为顶层类型，never为底层类型
 * 下层类型的可以赋值给上层类型，反过来就不行。另外 any 既不是顶层类型也不是底层类型，所以可以给任何类型赋值。
 */

/**
 * 类型运算
 *
 * 在类型运算中，联合类型取更高层的类型，交叉类型取更低层的类型
 */
type A1 = 'a' | never; // => a
type A2 = 'a' & never; // => never

type B1 = 'b' | unknown; // => unknown
type B2 = 'b' & unknown; // => b

/**
 * 条件类型
 *
 * extends ? :
 */
type Type<T> = T extends 2 ? true : false;
type TypeResult = Type<1>; // => false

/**
 * 映射类型
 * 把一个集合映射为另一个集合
 */

type MapType<T> = {
  [K in keyof T]: [T[K], T[K], T[K]];
};
type MapTypeResult = MapType<{ a: 1; b: 2 }>; // => { a: [1, 1, 1], b: [2, 2, 2] }

/**
 * 重映射
 *
 * 把一个集合的索引映射成另外的索引
 * 通过 as 对索引进行修改，使用 & 对类型进行收窄
 * 此处的 K 类型为 string | number | symbol，和 string 交叉就只会剩下 string
 * 交叉类型会把同一类型合并，不同类型舍弃
 */

type MapType2<T> = {
  [K in keyof T as `${K & string}${K & string}${K & string}`]: T[K];
};
type MapType2Result = MapType2<{ a: 1; b: 2 }>; // => { aaa: 1, bbb: 2 }
