function runTest(withDeopt) {
  const startMemory = process.memoryUsage().heapUsed;
  let arr = new Array(1000).fill(0);

  if (withDeopt) {
    arr[0] = "string"; // 类型污染，触发去优化
  }

  let start = performance.now();
  for (let i = 0; i < 100000; i++) {
    let sum = 0;
    for (let j = 0; j < arr.length; j++) {
      sum += arr[j];
    }
  }
  const endMemory = process.memoryUsage().heapUsed;
  return {
    time: performance.now() - start,
    memory: (endMemory - startMemory) / 1024 / 1024, // 转换为MB
  };
}

// 运行多次取平均值以减少波动
function averageTime(withDeopt, runs = 5) {
  let totalTime = 0;
  let totalMemory = 0;
  for (let i = 0; i < runs; i++) {
    const result = runTest(withDeopt);
    totalTime += result.time;
    totalMemory += result.memory;
  }
  return {
    time: totalTime / runs,
    memory: totalMemory / runs,
  };
}

const optimizedResult = averageTime(false);
const deoptimizedResult = averageTime(true);

console.log("优化后的平均时间:", optimizedResult.time.toFixed(2), "ms");
console.log("优化后的平均内存使用:", optimizedResult.memory.toFixed(2), "MB");
console.log("去优化后的平均时间:", deoptimizedResult.time.toFixed(2), "ms");
console.log(
  "去优化后的平均内存使用:",
  deoptimizedResult.memory.toFixed(2),
  "MB"
);
