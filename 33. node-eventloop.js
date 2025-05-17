
// setTimeout 和 setImmediate 在主栈中执行时顺序是不一定的
require("fs").readFile("./note.md", function () {
  // poll -> check -> timer
  setTimeout(() => {
    // timers
    console.log("setTimeout");
  });
  setImmediate(() => {
    // check
    console.log("setImmediate");
  });
});
