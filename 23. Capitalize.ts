(() => {
  type capitalized = Capitalize<"hello world">; // expected to be 'Hello world'

  // 首字母大写
  type Capitalize<S extends string> = S extends `${infer F}${infer R}`
    ? `${Uppercase<F>}${R}`
    : S;
})();
