(() => {
  type trimed = TrimLeft<"  Hello World  ">; // expected to be 'Hello World  '

  type whitespace = " " | "\t" | "\n";

  type TrimLeft<S extends string> = S extends `${whitespace}${infer R}`
    ? TrimLeft<R>
    : S;

  type trimmed2 = Trim<"  Hello World  ">; // expected to be 'Hello World'

  type Trim<S extends string> = S extends `${whitespace}${infer R}`
    ? Trim<R>
    : S extends `${infer K}${whitespace}`
    ? Trim<K>
    : S;
})();
