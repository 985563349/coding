// 类型特性

/**
 * 如何判断一个类型是 any 类型？
 *
 * 特性：any 类型与任何类型交叉都是 any，如：1 & any 结果是 any。
 */
// 此处的 'a' 和 'b'可以换成任意两个不同的类型。
type IsAny<T> = 'a' extends 'b' & T ? true : false;
type IsAnyResult = IsAny<string>; // => false
type IsAnyResult2 = IsAny<any>; // => true

// 类型是否相同
type IsEqual1<A, B> = (A extends B ? true : false) & (B extends A ? true : false);
type IsEqualResult = IsEqual1<'a', any>; // => true 无法判断any
type IsEqualResult2 = IsEqual1<'a', 'a'>; // => true

type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? true
  : false;
type IsEqualResult3 = IsEqual2<'a', any>; // => false

// 是否为联合类型
type IsUnion1<A, B = A> = A extends A ? ([A] extends [B] ? false : true) : never;

/**
 * 是否为never类型
 *
 * 特性：如果条件类型左边是类型参数，并且传入的是never，那么直接返回never。
 */
type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverResult = IsNever<never>; // => true

// 如果条件类型的左边是类型参数，并且传入的是any，那么会返回trueType和falseType的合并。
type TestAny<T> = T extends number ? 1 : 2;
type TestAnyResult = TestAny<any>; // => 1 | 2

/**
 * 是否为元组类型
 *
 * 特性：元组类型的length是数字字面量，而数组的length是number。
 */
type len = [1, 2, 3]['length']; // => 3
type len2 = number[]['length']; // => number

type IsTuple<T> = T extends [...infer Items] ? NotEqual<Items['length'], number> : false;
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? false
  : true;
type IsTupleResult = IsTuple<[1, 2, 3]>; // => true
type IsTupleResult2 = IsTuple<number[]>; // => false

/**
 * 联合类型转交叉类型
 */
type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (
  x: infer R
) => unknown
  ? R
  : never;
type UnionToIntersectionResult = UnionToIntersection<{ a: 1 } | { b: 2 }>; // => { a: 1 } & { b: 2 }

/**
 * 提取索引类型中的可选索引
 *
 * 特性：可选索引的值为 undefined 和值类型的联合类型
 *
 * Pick一个可选索引，extends {} 判断的结果为 true，如：{} extends { age?: number } ? true : false; // => true
 */
type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};
type GetOptionalResult = GetOptional<{ name: string; age?: number }>; // => { age?: number | undefined }

// 提取索引类型中的必选索引
type GetRequired<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? never : Key]: Obj[Key];
};
type GetRequiredResult = GetRequired<{ name: string; age?: number }>; // => { name: string }

/**
 * 剔除索引类型中的索引签名
 *
 * 特性：索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以。
 */
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};
type RemoveIndexSignatureResult = RemoveIndexSignature<{ a: string; [prop: string]: any }>; // => { a: string }

/**
 * 过滤 class 中的 public 属性
 *
 * 特性：keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略
 */

class Dong {
  public name: string;
  protected age: number;
  private hobbies: string[];

  constructor() {
    this.name = 'dong';
    this.age = 8;
    this.hobbies = ['sleep', 'eat'];
  }
}
type publicKey = keyof Dong; // => name
type ClassPublicProps<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};
type ClassPublicPropsResult = ClassPublicProps<Dong>; // => { name: string }

/**
 * as const
 *
 * TypeScript默认推导出来的不是字面量类型，通过 as const可以转换为字面量类型，但类型是带有readonly修饰的（因为const有常量的意思，所以无法修改）。
 */
const obj = { a: 1, b: 2 };
type objType = typeof obj; // => { a: number, b : number }
const arr = [1, 2, 3];
type arrType = typeof arr; // => number[]

const obj2 = { a: 1, b: 2 } as const;
const arr2 = [1, 2, 3] as const;
type objType2 = typeof obj2; // => { readonly a: 1, readonly b: 2 }
type arrType2 = typeof arr2; // => readonly [1, 2, 3]

// 加上 as const 后进行模式匹配时需要加上 readonly 修饰否则无法成功匹配。
type ReverseArr<Arr> = Arr extends readonly [infer A, infer B, infer C] ? [C, B, A] : never;
type ReverseArrResult = ReverseArr<[1, 2, 3]>; // => [3, 2, 1]
type ReverseArrResult2 = ReverseArr<arrType2>; // => [3, 2, 1]
