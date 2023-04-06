/**
 * 计数
 *
 * TypeScript类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取length的方式完成数值计算，把数值的加减乘除转化为对数组的提取和构造。
 */

type BuildArray<
  Length extends number,
  ResultArr extends unknown[] = []
> = ResultArr['length'] extends Length ? ResultArr : BuildArray<Length, [...ResultArr, unknown]>;

type Add<A extends number, B extends number> = [...BuildArray<A>, ...BuildArray<B>]['length'];
type AddResult = Add<1, 2>; // => 3

type Subtract<A extends number, B extends number> = BuildArray<A> extends [
  ...arr1: BuildArray<B>,
  ...arr2: infer Rest
]
  ? Rest['length']
  : never;
type SubtractResult = Subtract<3, 2>; // => 1

type Multiply<A extends number, B extends number, ResultArr extends unknown[] = []> = B extends 0
  ? ResultArr['length']
  : Multiply<A, Subtract<B, 1>, [...ResultArr, ...BuildArray<A>]>;
type MultiplyResult = Multiply<3, 4>; // => 12

type Divide<A extends number, B extends number, CountArr extends unknown[] = []> = A extends 0
  ? CountArr['length']
  : Divide<Subtract<A, B>, B, [...CountArr, unknown]>;
type DivideResult = Divide<6, 3>; // => 2

type StrLen<
  Str extends string,
  CountArr extends unknown[] = []
> = Str extends `${infer First}${infer Rest}`
  ? StrLen<Rest, [...CountArr, unknown]>
  : CountArr['length'];
type StrLenResult = StrLen<'hello world'>; // => 11

type GreaterThan<A extends number, B extends number, CountArr extends unknown[] = []> = A extends B
  ? false
  : CountArr['length'] extends A
  ? false
  : CountArr['length'] extends B
  ? true
  : GreaterThan<A, B, [...CountArr, unknown]>;
type GreaterThanResult = GreaterThan<1, 2>; // => false

type FibonacciLoop<
  PreArr extends unknown[],
  CurrentArr extends unknown[],
  IndexArr extends unknown[] = [],
  Num extends number = 1
> = IndexArr['length'] extends Num
  ? CurrentArr['length']
  : FibonacciLoop<CurrentArr, [...PreArr, ...CurrentArr], [...IndexArr, unknown], Num>;
type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;
type FibonacciResult = Fibonacci<8>; // => 21
