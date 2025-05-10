// 进程和线程的区别：
// 进程：计算机 以进程来分配任务和调度任务（进程间通信 SDK？ ipc？）
// 进程中包含线程

// 浏览器 由多个进程组成 （每个tab页签都是一个独立进程）
// 浏览器主要进程：主进程、网络进程、渲染进程（GPU加速）、插件进程

// 一个tab页签都是一个独立的进程：渲染线程

// 渲染进程：（控制台 Performance调试）
// ui线程：负责渲染页面、布局、绘制
// js引擎线程：js引擎线程，负责执行js代码（ui线程 与 js线程互斥）
// 主线程：为了保证渲染的一致性，保证整个执行是单线程。
// 定时器线程：负责执行setTimeout、setInterval、请求、用户事件操作 都是异步（每开一个定时器 都会生成一个新的线程）

// 异步任务划分：宏任务、微任务
// 微任务：Promise.then【原生提供】、mutationObserver【html5提供，回调是异步的，应用场景：滚动刷新、滚动加载】、queueMicrotask【原生提供】
// 宏任务：<script />、ui渲染、setTimeout、请求、用户事件、messageChannel、setImmediate

// requestIDleCallback requestFrameAnimation (放在ui线程中) 只能算回调，可当作宏任务？

ducument.body.backgroundColor = "red";
console.log(1);
Promise.resolve().then(() => {
  console.log(2);
  document.body.backgroundColor = "blue"; // 渲染永远在微任务中同步执行,合并上面的渲染一起执行，以最后为准。 如何让页面强制重绘？
});
console.log(3);



