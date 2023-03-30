// 模式匹配

// Promise
type GetPromiseValue<T> = T extends Promise<infer Value> ? Value : never;
type GetPromiseValueResult = GetPromiseValue<Promise<'Jee'>>; // => Jee

// 数组
type GetFirst<T extends unknown[]> = T extends [infer First, ...unknown[]] ? First : never;
type GetFirstResult = GetFirst<[1, 2, 3]>; // => 1

type GetLast<T extends unknown[]> = T extends [...unknown[], infer Last] ? Last : never;
type GetLastResult = GetLast<[1, 2, 3]>; // => 3

type GetPopArr<T extends unknown[]> = T extends []
  ? []
  : T extends [...infer Rest, unknown]
  ? Rest
  : never;
type GetPopArrResult = GetPopArr<[1, 2, 3]>; // => [1, 2]

type GetShiftArr<T extends unknown[]> = T extends []
  ? []
  : T extends [unknown, ...infer Rest]
  ? Rest
  : never;
type GetShiftArrResult = GetShiftArr<[1, 2, 3]>; // => [2, 3];

// 字符串
type StartWith<Str extends string, S extends string> = Str extends `${S}${string}` ? true : false;
type StartWithResult = StartWith<'Wong Jee', 'Wong'>; // => true

type EndWith<Str extends string, S extends string> = Str extends `${string}${S}` ? true : false;
type EndWithResult = EndWith<'Wong Jee', 'Jee'>; // => True

type ReplaceType<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : Str;
type ReplaceTypeResult = ReplaceType<'Hello World!', 'World', 'Jee'>; // => Hello Jee!

type TrimLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}`
  ? TrimLeft<Rest>
  : Str;
type TrimLeftResult = TrimLeft<'  a'>; // => a

type TrimRight<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}`
  ? TrimRight<Rest>
  : Str;
type TrimRightResult = TrimRight<'a  '>; // => a

type EmptyString = ' ' | '\n' | '\t';
type Trim<T extends string> = T extends `${EmptyString}${infer Rest}`
  ? Trim<Rest>
  : T extends `${infer Rest}${EmptyString}`
  ? Trim<Rest>
  : T extends `${infer Start}${EmptyString}${infer End}`
  ? Trim<`${Start}${End}`>
  : T;
type TrimResult = Trim<' a b c '>; // => abc

// 函数
type ParametersType<Func extends Function> = Func extends (...args: infer Params) => unknown
  ? Params
  : never;
type ParametersTypeResult = ParametersType<(name: string, age: number) => string>; // => [name: string, age: number]

type MyReturnType<Func extends Function> = Func extends (...args: any[]) => infer Result
  ? Result
  : never;
type MyReturnTypeResult = MyReturnType<(name: string) => 'dong'>; // => dong

// 类
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  hello(this: Person) {
    return "hello I'm " + this.name;
  }
}

const person = new Person('Jee', 24);

type MyInstanceType<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer Result
  ? Result
  : never;
type MyInstanceTypeResult = MyInstanceType<typeof Person>; // => Person

type MyThisType<T> = T extends (this: infer ThisType, ...args: any[]) => unknown ? ThisType : never;
type MyThisTypeResult = MyThisType<typeof person.hello>; // => Person

// 对象
type GetRefProps<Props> = 'ref' extends keyof Props
  ? Props extends { ref?: infer Value | undefined }
    ? Value
    : never
  : never;
// type GetRefProps2<Props extends object> = Props['ref']; // => 无法索引

type GetRefPropsResult = GetRefProps<{ ref?: 1 }>; // => 1
