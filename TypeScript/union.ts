/**
 * 联合分散
 *
 * 联合类型中的每个类型都是互相独立的，TypeScript对它做了特殊处理，当遇到字符串类型、条件类型时会把每个类型单独传入做计算，最后把计算结果合并成联合类型。
 */

// 分布式条件类型
type UppercaseA<Char extends string> = Char extends 'a' ? Uppercase<Char> : Char;
type UppercaseAResult = UppercaseA<'a' | 'b' | 'c'>; // => b | c | a

type Camelcase<Str extends string> = Str extends `${infer Left}_${infer Right}${infer Rest}`
  ? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
  : Str;

type CamelcaseResult = Camelcase<'aa_aa_aa' | 'bb_bb_bb' | 'cc_cc_cc'>; // => aaAaAa | bbBbBb | ccCcCc

// 判断是否为联合类型
// A extends A 的意义在于触发分布式条件类型，让 A 的每个类型单独传入。
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type IsUnionResult1 = IsUnion<'a' | 'b'>; // => true
type IsUnionResult2 = IsUnion<'a'>; // => false

// A、B虽然都属于同一个联合类型，但条件类型中如果左边的是联合类型，会把每个元素单独传入做计算，而右边则不会。
type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never;
type TestUnionResult = TestUnion<'a' | 'b'>; // => { a: 'a', b: 'a' | 'b' } | { a: 'b', b: 'a' | 'b' }

// 通过number索引数组类型可以转为联合类型
type Union = ['a', 'b'][number];

// 字符串与联合类型
type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}_${Element[number]}--${Modifiers[number]}`;
// 字符串类型中遇到联合类型，会每个元素单独传入计算。
type BEMResult = BEM<'menu', ['item'], ['active', 'disabled']>; // => menu_item--active | menu_item--disabled

// 全组合
type Combination<A extends string, B extends string> = A | B | `${A}${B}` | `${B}${A}`;
type CombinationResult = Combination<'a', 'b'>; // => a | b | ab | ba

type AllCombination<A extends string, B extends string = A> = A extends A
  ? Combination<A, Exclude<B, A>>
  : never;
type AllCombinationResult = AllCombination<'a' | 'b' | 'c'>;
