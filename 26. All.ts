(() => {
  type Test1 = [1, 1, 1];

  type Test2 = [1, 1, 2];

  type Todo = All<Test1, 1>; // should be same as true

  type Todo2 = All<Test2, 1>; // should be same as false

  type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
    ? 1
    : 2
    ? true
    : false;

  type All<T extends any[], U> = Equal<T[number], U>;
})();
