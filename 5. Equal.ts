// type Equal<T, P> = T extends P ? (P extends T ? true : false) : false;
// type Equal<T, P> = [T, P] extends [P, T] ? true : false;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type User1 = {
  name?: string;
  age: number;
  address: string;
};

// Ponicode: Generate Values
type User2 = {
  name?: string;
} & {
  age: number;
  address: string;
};

// Ponicode: Generate Values
type Y1 = Equal<string, string>; // true
// Ponicode: Generate Values
type Y2 = Equal<string, number>; // false
// Ponicode: Generate Values
type Y3 = Equal<{ name: string }, { name: string }>; // true
// Ponicode: Generate Values
type Y4 = Equal<{ name: string }, { age: number }>; // false
// Ponicode: Generate Values
type Y5 = Equal<{ name: string }, { name?: string }>; // false
// Ponicode: Generate Values
type Y6 = Equal<User1, User2>; // true
/**============================== */
// Ponicode: Generate Values
type Y7 = Equal<true, boolean>; // boolean 特殊处理
// Ponicode: Generate Values
type Y8 = Equal<1 | 2, 1>; // boolean 特殊处理

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]

/**============================== */
// Ponicode: Generate Values
type Y9 = Equal<any, string>; // true
// Ponicode: Generate Values
type Y10 = Equal<{ name: string }, { readonly name: string }>; // true
