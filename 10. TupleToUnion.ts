(() => {
  type Arr = ["1", "2", "3"];
  type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'

  //   type TupleToUnion<T extends any[]> = T[number];

  // infer 推断类型
  type TupleToUnion<T extends any[]> = T extends Array<infer U> ? U : never;
})();
