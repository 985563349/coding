// 递归

// Promise
type DeepPromiseValue<T> = T extends Promise<infer ValueType> ? DeepPromiseValue<ValueType> : T;
type DeepPromiseValueResult = DeepPromiseValue<Promise<Promise<number>>>; // => number

// 数组
type ReverseArr<Arr extends unknown[]> = Arr extends [infer First, ...infer Rest]
  ? [...ReverseArr<Rest>, First]
  : Arr;
type ReverseArrResult = ReverseArr<[1, 2, 3, 4, 5]>; // => [5, 4, 3, 2, 1]

type IncludesArr<Arr extends unknown[], FindItem> = Arr extends [infer First, ...infer Rest]
  ? First extends FindItem
    ? true
    : IncludesArr<Rest, FindItem>
  : false;
type IncludesArrResult = IncludesArr<[1, 2, 3], 2>; // => true

type RemoveArr<Arr extends unknown[], Item, Result extends unknown[] = []> = Arr extends [
  infer First,
  ...infer Rest
]
  ? First extends Item
    ? RemoveArr<Rest, Item, Result>
    : RemoveArr<Rest, Item, [...Result, First]>
  : Result;

type RemoveArrResult = RemoveArr<[1, 2, 3], 2>;

type BuildArray<
  Length extends number,
  Ele extends unknown,
  Result extends unknown[] = []
> = Result['length'] extends Length ? Result : BuildArray<Length, Ele, [...Result, Ele]>;
type BuildArrayResult = BuildArray<3, number>; // => [number, number, number]

// 字符串
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer First}${From}${infer Last}`
  ? `${First}${To}${ReplaceAll<Last, From, To>}`
  : Str;
type ReplaceAllResult = ReplaceAll<'abbc', 'b', 'd'>; // => addc

type StringToUnion<Str extends string> = Str extends `${infer First}${infer Last}`
  ? First | StringToUnion<Last>
  : never;
type StringToUnionResult = StringToUnion<'abc'>; // => a | b | c

type ReverseString<Str extends string> = Str extends `${infer First}${infer Last}`
  ? `${ReverseString<Last>}${First}`
  : Str;
type ReverseStringResult = ReverseString<'abc'>; // => cba

// 对象
// 类型惰性计算
// type DeepReadonly<Obj extends Record<string, any>> = {
//   readonly [P in keyof Obj]: Obj[P] extends object
//     ? Obj[P] extends Function
//       ? Obj[P]
//       : DeepReadonly<Obj[P]>
//     : Obj[P];
// };

type DeepReadonly<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [P in keyof Obj]: Obj[P] extends object
        ? Obj[P] extends Function
          ? Obj[P]
          : DeepReadonly<Obj[P]>
        : Obj[P];
    }
  : never;

type DeepReadonlyResult = DeepReadonly<{
  a: {
    b: {
      c: {
        f: () => 'dong';
      };
    };
  };
}>;
