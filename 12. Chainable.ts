// (() => {
  declare const config: Chainable;

  // K extends keyof T ? never : K 防止添加重复的键，如果尝试添加已存在的键，TypeScript 会报错
  // Chainable<Omit<T, K> & { [P in K]: V }> 移除之前可能存在的同名属性 (Omit<T, K>)，然后添加新的属性 ({ [P in K]: V })
  type Chainable<T = {}> = {
    option<K extends PropertyKey, V>(
      key: K extends keyof T ? never : K,
      value: V
    ): Chainable<Omit<T, K> & { [P in K]: V }>;
    get(): T;
  };

  const result = config
    .option("foo", 123)
    .option("name", "type-challenges")
    .option("bar", { value: "Hello World" })
    .get();

  interface Result {
    foo: number;
    name: string;
    bar: {
      value: string;
    };
  }
// })();
