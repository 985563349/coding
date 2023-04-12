/**
 * 型变
 *
 * 型变分为两种：一种是子类型可以赋值给父类型，叫做协变。一种是父类型可以赋值给子类型，叫做逆变。
 */

/**
 * 谁是子类型？谁是父类型。
 *
 * 更宽泛的是父类型，更具体的是子类型。例如：number 就是，number | string，是子类型。
 */

// 协变
interface Person {
  name: string;
  age: number;
}

interface Jee {
  name: string;
  age: number;
  hobbies: string[];
}

/**
 *  此处 Jee 是 Person 的子类型，因为它更具体，所以可以赋值给 Person 类型。
 *
 *  在 TypeScript 中，只要结构是一致的，那么就可以确定父子关系，这种叫做（结构类型系统）。而其他语言，例如 Java 类型关系是通过 extends 继承确定的，这种叫做（名义类型系统）。
 */

let person: Person = {
  name: '',
  age: 24,
};

let jee: Jee = {
  name: 'jee',
  age: 24,
  hobbies: ['sleep'],
};

person = jee;

/**
 * 逆变
 *
 * 函数的参数具有逆变性质，而返回值是协变的。
 */
let printHobbies: (jee: Jee) => void;
printHobbies = (jee: Jee) => {
  console.log(jee.hobbies);
};

let printName: (person: Person) => void;
printName = (person: Person) => {
  console.log(person.name);
};

// printName 的参数是 printHobbies 参数的父类型，复写后 printHobbies 参数类型仍然被约束为 Jee，而函数运行时实际只用到 Person 上的属性，所以这里类型是安全的。这就是一个逆变的过程。
printHobbies = printName;
// printName = printHobbies // 此处复写会抛出错误

// 参数逆变，返回值协变
type Func = (a: string) => void;
const func: Func = (a: 'hello') => undefined; // 此处参数类型是逆变的，所以 'hello' 类型不能赋值给 string 类型。返回值类型是协变的，所以 undefined 可以赋值给 void。

/**
 * 双向协变
 *
 * 当父类型可以赋值给子类型，子类型也可以赋值给父类型，既逆变又协变，就叫双向协变。
 *
 * ts编译选项，strictFunctionTypes 设置为false，则开启双向协变。通常情况下双向协变无法保证类型安全，所以不建议开启。
 */

/**
 * 不变
 *
 * 非父子类型之间不会发生型变，只要类型不同，就会报错。
 */

interface Dog {
  name: string;
  gender: boolean;
}

let dog: Dog = {
  name: 'dog',
  gender: false,
};

person = dog; // 抛出异常，类型不同
