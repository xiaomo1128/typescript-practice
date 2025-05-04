(() => {
  // https://github.com/type-challenges/type-challenges/blob/main/questions/00020-medium-promise-all/README.md
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, "foo");
  });

  // expected to be 'Promise<[number, 42, string]>'
  const p = PromiseAll([promise1, promise2, promise3] as const);
  
  // declare function - 这是一个类型声明，表示这个函数存在但不提供实现
  // values: readonly [...T] - 接受一个只读的元组参数，使用扩展运算符 ...T 来捕获元组中的所有元素类型
  declare function PromiseAll<T extends any[]>(
    values: readonly [...T]
  ): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>;
})();
