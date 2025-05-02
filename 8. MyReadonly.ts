(() => {
  interface Todo {
    title: string;
    description: string;
  }

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar",
  };

  todo.title = "Hello"; // Error: cannot reassign a readonly property
  todo.description = "barFoo"; // Error: cannot reassign a readonly property

  type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
  };
  // ------我是分割线------

  interface Todo2 {
    title: string;
    description: string;
    completed: boolean;
  }

  const todo2: MyReadonly2<Todo2, "title" | "description"> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  };

  todo2.title = "Hello"; // Error: cannot reassign a readonly property
  todo2.description = "barFoo"; // Error: cannot reassign a readonly property
  todo2.completed = true; // OK

  //   type MyReadonly2<T, K extends keyof T> = Omit<T, K> & Readonly<T>;
  
  type MyReadonly2<T, K extends keyof T = keyof T> = {
    +readonly [P in K]: T[P];
  } & {
    [key in keyof T as key extends K ? never : key]: T[key];
  };
})();
