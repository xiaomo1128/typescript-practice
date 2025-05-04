(() => {
  type replaced = Replace<"types are fun!", "fun", "awesome">; // expected to be 'types are awesome!'

  type Replace<
    S extends string,
    From extends string,
    To extends string
  > = From extends ""
    ? S
    : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${R}`
    : S;

  type replaced2 = ReplaceAll<"t y p e s", " ", "">; // expected to be 'types'

  type ReplaceAll<
    S extends string,
    From extends string,
    To extends string
  > = From extends ""
    ? S
    : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${ReplaceAll<R, From, To>}`
    : S;
})();
