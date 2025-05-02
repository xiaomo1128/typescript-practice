(() => {
  const add = (a: number, b: number) => a + b;
  const three = add(1, 2);

  // const Currying =
  //   (fn, arr = []) =>
  //   (...args) =>
  //     ((arg) => (arg.length === fn.length ? fn(...arg) : Currying(fn, arg)))([
  //       ...arr,
  //       ...args,
  //     ]);

  type Fn<Args, R> = Args extends [infer Fist]
    ? (p: Fist) => R
    : Args extends [any: infer First, ...rest: infer Rest]
    ? (p: First) => Fn<Rest, R>
    : never;

  // 先定义类型
  type CurryingFn<F extends Function> = F extends (
    first: infer First,
    ...remaining: infer Rest
  ) => infer Ret
    ? Rest["length"] extends 0
      ? F
      : (first: First) => CurryingFn<(...args: Rest) => Ret>
    : any;
  // ------------------------------------------------------------
  // 然后是函数声明（类型定义）- TypeScript 要求函数声明（重载签名）必须紧跟着具体实现。
  // {} 包含 Function 类型
  // Function 是一个函数类型的基类（函数类的实例、类、function）
  //   function Currying<F extends (...args: any) => {}>(
  //     fn: F
  //   ): Fn<Parameters<F>, ReturnType<F>>;
  function Currying<F extends Function>(fn: F): CurryingFn<F>;
  // 紧接着是函数实现
  function Currying(func) {
    return function curried(...args) {
      if (args.length >= func.length) {
        return func.apply(this, args);
      } else {
        return function (...args2) {
          return curried.apply(this, args.concat(args2));
        };
      }
    };
  }

  const curriedAdd = Currying(add);
  const five = curriedAdd(2)(3);
  console.log("five", five); // 5
})();
