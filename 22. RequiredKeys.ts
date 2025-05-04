(() => {
  type Result = RequiredKeys<{ foo: number; bar?: string }>; // expected to be “foo”

  type x = { foo: number } extends { foo: number; bar?: string } ? 1 : 2;

  type RequiredKeys<T, K = keyof T> = K extends keyof T
    ? T extends Required<Pick<T, K>>
      ? K
      : never
    : never;
})();
