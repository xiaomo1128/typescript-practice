(() => {
  type I = Union2Intersection<"foo" | 42 | true>; // expected to be 'foo' & 42 & true

  type I2 = Union2Intersection<4 | []>;
  type I3 = Union2Intersection<[] | 1>;

  // 交叉类型
  // type Union2Intersection<T> = (
  //   T extends any ? (k: T) => void : never
  // ) extends (k: infer I) => void
  //   ? I
  //   : never;

  // 联合类型
  // [U] extends [U] ? (arg: U) => void : never - 这一步始终返回 (arg: U) => void（这里使用数组包装是为了防止分布式条件类型的行为）
  type Union2Intersection<U> = (
    [U] extends [U] ? (arg: U) => void : never
  ) extends (arg: infer T) => void
    ? T
    : never;

  // 什么是 分布式条件类型的行为？
})();
