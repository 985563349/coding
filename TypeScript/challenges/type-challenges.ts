/**
 * RequiredByKeys<T, K>
 */

type User = {
  name?: string;
  age?: number;
  address?: string;
};

type Merge<T> = {
  [P in keyof T]: T[P];
};

// 方案一：
// type RequiredByKeys<T, K = keyof T> = Merge<
//   { [P in keyof T as P extends K ? P : never]-?: T[P] } & {
//     [P in keyof T as P extends K ? never : P]: T[P];
//   }
// >;

// 方案二：
// type RequiredByKeys<T, K = keyof T> = Merge<
//   T & {
//     [P in keyof T as P extends K ? P : never]-?: T[P];
//   }
// >;

// 方案三：
type RequiredByKeys<T, K extends keyof T = keyof T> = Merge<Required<Pick<T, K>> & Omit<T, K>>;
type RequiredByKeysResult = RequiredByKeys<User, 'name'>;

/**
 * Split<S, D>
 */
type Split<S, D extends string = ','> = S extends `${infer Head}${D}${infer Tail}`
  ? [Head, ...Split<Tail, D>]
  : S extends D
  ? []
  : [S];
type SplitResult = Split<'a,b,c'>;

/**
 * SubTypeOf<T, U>
 */
type SubTypeOf<T, U> = T extends U ? true : false;
