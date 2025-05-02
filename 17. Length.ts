(() => {
  type tesla = ["tesla", "model 3", "model X", "model Y"];

  type spaceX = [
    "FALCON 9",
    "FALCON HEAVY",
    "DRAGON",
    "STARSHIP",
    "HUMAN SPACEFLIGHT"
  ];

  type teslaLength = Length<tesla>; // expected 4

  type spaceXLength = Length<spaceX>; // expected 5

  // type Length<T extends any[]> = T["length"] extends 0 ? never : T["length"];
  type Length<T extends readonly any[]> = T extends { length: infer L } // 字符串数组解构 length 方法
    ? L
    : never;
})();
