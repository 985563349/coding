// 类型编程

// 重载函数使用 ReturnType 返回的是最后一个重载的返回值类型。
type ReturnTypeResult = ReturnType<((a: number) => number) & ((a: string) => string)>; // => string

// 联合类型转交叉类型
type UnionToIntersection2<U> = (U extends U ? (x: U) => unknown : never) extends (
  x: infer R
) => unknown
  ? R
  : never;

// 联合类型转重载函数
type UnionToFuncIntersection<T> = UnionToIntersection2<T extends any ? () => T : never>;
type UnionToFuncIntersectionResult = UnionToFuncIntersection<'a' | 'b'>; // => () => a & () => b

// 联合类型转元组
type UnionToTuple<T> = UnionToIntersection2<
  T extends any ? () => T : never
> extends () => infer Return
  ? [...UnionToTuple<Exclude<T, Return>>, Return]
  : [];

type UnionToTupleResult = UnionToTuple<'a' | 'b' | 'c'>; // => ['a', 'b', 'c']
