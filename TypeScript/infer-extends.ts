// infer extends 简化类型编程

// 此处 Last 会抛出异常: 不能将类型“Last”分配给类型“string | number | bigint | boolean | null | undefined”。
type TestLast<Arr extends string[]> = Arr extends [...infer Rest, infer Last]
  ? `last: ${Last}`
  : never;

// 处理方案1:
// Last extends string ? `last: ${Last}` : never

// 处理方案2:
// `last: ${Last & string}`

// 处理方案3（推荐方案）:
// 使用 infer 时加上 extends 来约束推导的类型，这样提取出的就不是 unknown 了，而是约束的类型。
// [...infer Rest, infer Last extends string]

// 字符串转number
type StrToNum<Str> = Str extends `${infer Num extends number}` ? Num : Str;
type StrToNumResult = StrToNum<'123'>; // => 123

enum Code {
  a = 111,
  b = 222,
  c = 'abc',
}

type Res = `${Code}`; // => '111' | '222' | 'abc'
type StrToNumResult2 = StrToNum<`${Code}`>; // => 111 | 222 | 'abc'

// 字符串转布尔
type StrToBool<Str> = Str extends `${infer Bool extends boolean}` ? Bool : Str;
type StrToBoolResult = StrToBool<'true'>; // => true
