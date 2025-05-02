(() => {
  interface Todo {
    readonly xxx?: number;
    readonly title: string;
    readonly description: string;
    completed: boolean;
  }
  type Keys = GetReadonlyKeys<Todo>; // expected to be "title" | "description"

  type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
    ? 1
    : 2
    ? true
    : false;

  //   type GetReadonlyKeys<T> = keyof {
  //     [K in keyof T as Equal<Pick<T, K>, Readonly<Pick<T, K>>> extends true
  //       ? K
  //       : never]: T[K];
  //   };

  type GetReadonlyKeys<T> = {
    [P in keyof Required<T>]: Equal<
      { [k in P]: T[k] }, // 无readonly修饰的属性
      { -readonly [R in P]: T[R] } // 移除readonly修饰的属性
    > extends true
      ? never
      : P;
  }[keyof T];
})();
