(() => {
  const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

  // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  type result = TupleToObject<typeof tuple>; 

  // type TupleToObject<T extends readonly any[]> = {
  //   [K in T[number]]: K;
  // };

  // type PropertyKey = string | number | symbol;  
  // JavaScript 中所有可能的属性键类型
  type TupleToObject<T extends readonly PropertyKey[]>={
    [K in T[number]]: K;
  }
})();
