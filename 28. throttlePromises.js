// 使用Vue/React实现AutoComplete组件~

// Promise节流

// https://bigfrontend.dev/zh/problem/throttle-Promises Promise节流

// 等等 大家可以通过https://bigfrontend.dev/进行练习

/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
function throttlePromises(funcs, max) {
  return new Promise((resolve, reject) => {
    let concurrentCount = 0; // 当前正在执行的 Promise 数量
    let latestCalledFuncIndex = -1; // 最近启动的函数索引
    let resultCount = 0; // 已完成的 Promise 数量
    let hasError = false; // 是否有错误发生
    const result = []; // 存储所有 Promise 结果的数组

    const fetchNext = () => {
      if (hasError || latestCalledFuncIndex === funcs.length - 1) return;
      const nextFuncIndex = latestCalledFuncIndex + 1;
      const next = funcs[nextFuncIndex];
      concurrentCount++;
      latestCalledFuncIndex++;
      next().then(
        (data) => {
          // 存储结果，更新计数，减少并发数，检查是否全部完成
          result[nextFuncIndex] = data;
          resultCount++;
          concurrentCount--;
          if (resultCount === funcs.length) {
            resolve(result);
            return;
          }
          fetchNext();
        },
        (err) => {
          // 标记错误状态，拒绝整个 Promise
          hasError = true;
          reject(err);
        }
      );
      // 递归控制并发数
      // 如果当前并发数小于最大限制，则继续执行下一个 Promise
      if (concurrentCount < max) {
        fetchNext();
      }
    };
    fetchNext();
  });
}
