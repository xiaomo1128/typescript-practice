(() => {
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type TodoPreview = MyOmit<Todo, "description" | "title">;

  const todo: TodoPreview = {
    completed: false,
  };

  // key in keyof T 不能直接 extends K
  type MyOmit<T, K extends keyof T> = {
    [key in keyof T as key extends K ? never : key]: T[key];
  };
})();
