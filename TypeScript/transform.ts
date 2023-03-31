// 构造变换

// 数组
type Push<Arr extends unknown[], Item> = [...Arr, Item];
type PushResult = Push<[1, 2, 3], 4>; // => [1, 2, 3, 4]

type Unshift<Arr extends unknown[], Item> = [Item, ...Arr];
type UnshiftResult = Unshift<[2, 3, 4], 1>; // => [1, 2, 3, 4]

type Zip<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], ...Zip<OneRest, OtherRest>]
    : []
  : [];

type ZipResult = Zip<[1, 2, 3], ['a', 'b', 'c']>; // => [[1, 'a'], [2, 'b'], [3, 'c']]

// 字符串
type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Last}`
  ? `${Uppercase<First>}${Last}`
  : Str;
type CapitalizeStrResult = CapitalizeStr<'hello'>; // => Hello

type CamelCase<Str extends string> = Str extends `${infer Left}_${infer Right}${infer Rest}`
  ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
  : Str;
type CamelCaseResult = CamelCase<'dong_dong_dong'>; // => dongDongDong

type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? `${Prefix}${DropSubStr<Suffix, SubStr>}`
  : Str;
type DropSubStrResult = DropSubStr<'dong~~~', '~'>; // => dong

// 函数
type AppendArguments<Func extends Function, Arg> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : Func;

type AppendArgumentsResult = AppendArguments<(name: string) => boolean, number>; // => (args_0: string, args_1: number) => boolean

// 索引类型
type Mapping<Obj extends object> = {
  [P in keyof Obj]: [Obj[P], Obj[P], Obj[P]];
};
type MappingResult = Mapping<{ a: 1; b: 2 }>; // => { a: [1, 1, 1]; b: [2, 2, 2] }

type UppercaseKey<Obj extends object> = {
  [P in keyof Obj as Uppercase<P & string>]: Obj[P];
};
type UppercaseKeyResult = UppercaseKey<{ a: 1; b: 2 }>; // => { A: 1, B: 2 }

type FilterByValueType<Obj extends object, ValueType> = {
  [P in keyof Obj as Obj[P] extends ValueType ? P : never]: Obj[P];
};
type FilterByValueTypeResult = FilterByValueType<{ a: number; b: string; c: boolean }, number>; // => { a: number }

type OmitByValueType<Obj extends object, ValueType> = {
  [P in keyof Obj as Obj[P] extends ValueType ? never : P]: Obj[P];
};
type OmitByValueTypeResult = OmitByValueType<{ a: number; b: string; c: boolean }, number>; // => { b: string, c: boolean }
