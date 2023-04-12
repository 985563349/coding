/**
 * 类型编程
 *
 * 类型编程可以动态生成类型，对已有类型做修改。例如，返回值的类型由参数的类型运算得到，就需要使用到类型编程。
 *
 * 类型编程的意义在于提供更精确的类型提示和检查。
 */

// 此处的范型约束为 unknown[] | []，与 as const 效果类似
declare function ttt<T extends unknown[]>(values: T): T;
const res = ttt([1, 2, 3]); // => number[]

declare function ttt2<T extends unknown[] | []>(values: T): T;
const res2 = ttt2([1, 2, 3]); // => [number, number, number]

// 柯里化
type CurriedFunc<Params, Return> = Params extends [infer Arg, ...infer Rest]
  ? (arg: Arg) => CurriedFunc<Rest, Return>
  : Return;

declare function currying<Func>(
  fn: Func
): Func extends (...args: infer Params) => infer Result ? CurriedFunc<Params, Result> : never;

const func = (a: string, b: number, c: boolean) => {};
const curriedFunc = currying(func); // => (arg: string) => (arg: number) => (arg: boolean) => void

type CurriedFunc2<Func> = Func extends (...args: [infer First, ...infer Rest]) => infer Return
  ? Rest['length'] extends 0
    ? Func
    : (arg: First) => CurriedFunc2<(...args: Rest) => Return>
  : never;
type CurriedFunc2Result = CurriedFunc2<(a: number, b: string, c: boolean) => boolean>; // => (arg: number) => (arg: string) => (c: boolean) => boolean

// 字符串
type CamelCaseToKebabCase<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? First extends Lowercase<First>
    ? `${First}${CamelCaseToKebabCase<Rest>}`
    : `-${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
  : Str;

type CamelCaseToKebabCaseResult = CamelCaseToKebabCase<'helloWorld'>; // => hello-world

// 数组
type Chunk<
  Arr extends unknown[],
  Len extends number,
  Cur extends unknown[] = [],
  Res extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? Cur['length'] extends Len
    ? Chunk<Rest, Len, [First], [...Res, Cur]>
    : Chunk<Rest, Len, [...Cur, First], Res>
  : [...Res, Cur];

type ChunkResult = Chunk<[1, 2, 3, 4, 5], 2>; // => [[1, 2], [3, 4], [5]]

// 索引类型
type TupleToNestedObject<Tuple extends unknown[], Value> = Tuple extends [
  infer First,
  ...infer Rest
]
  ? {
      [Key in First as Key extends keyof any ? Key : never]: Rest extends unknown[]
        ? TupleToNestedObject<Rest, Value>
        : Value;
    }
  : Value;

type TupleToNestedObjectResult = TupleToNestedObject<['a', 'b', 'c'], number>; // => { a: { b: { c: number } } }

type Copy<T> = {
  [P in keyof T]: T[P];
};

type PartialOjectPropByKeys<
  Obj extends Record<string, any>,
  Key extends keyof any = keyof Obj
> = Copy<Partial<Pick<Obj, Extract<keyof Obj, Key>>> & Omit<Obj, Key>>;

type PartialOjectPropByKeysResult = PartialOjectPropByKeys<
  { a: number; b: string; c: boolean },
  'a' | 'c'
>; // => { a?: number, b: string, c?: boolean }

/**
 * 函数重载
 *
 * 重载的写法一共有三种
 */
// 1、同名函数实现重载
declare function fn(a: string): string;
declare function fn(a: number): number;

// 如果有函数的实现，就不用带 declare 了
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any) {
  return a + b;
}
add(1, 2);
add('a', 'b');

// 2、接口定义函数重载
interface Func {
  (a: string): string;
  (a: number): number;
}

declare const fn2: Func;
fn2(1);
fn2('a');

// 3、交叉类型定义重载
type Func2 = ((a: string) => string) & ((a: number) => number);
declare const fn3: Func2;
fn3(1);
fn3('a');
