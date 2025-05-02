(() => {
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }
  /**------------------------------------------------------------ */

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }; // expected to be "title" | "description"

  //   todo.title = "Hello"; // Error: cannot reassign a readonly property
  //   todo.description = "World"; // Error: cannot reassign a readonly property

  type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
  };
  /**------------------------------------------------------------ */
  const todo2: MyReadonly2<Todo, "title" | "description"> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  };

  todo2.title = "Hello"; // Error: cannot reassign a readonly property
  todo2.description = "World"; // Error: cannot reassign a readonly property
  todo2.completed = true; // Error: cannot reassign a readonly property

  /**
   * 使用 Omit<T, K> & Readonly<T> 会使所有属性只读，而不仅仅是 K 中的属性
   * 没有默认参数，不支持省略 K 参数的情况
   */
  // type MyReadonly2<T, K extends keyof T> = Omit<T, K> & Readonly<T>;

  type MyReadonly2<T, K extends keyof T = keyof T> = {
    +readonly [P in K]: T[P];
  } & {
    /**
     * as key extends K ? never : key 是类型映射，过滤掉在 K 中的键
     * 如果 key 在 K 中，结果是 never（被排除）
     * 如果 key 不在 K 中，保持原样
     */
    [key in keyof T as key extends K ? never : key]: T[key];
  };
})();
