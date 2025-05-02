(() => {
  type I = GetRequired<{ foo: number; bar?: string }>; // expected to be { foo: number }

  // Omit<T, P> extends T ? never : P 是重点
  type GetRequired<T> = {
    [P in keyof T as Omit<T, P> extends T ? never : P]: T[P];
  };
})();
