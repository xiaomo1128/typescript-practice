const fs = require("fs");

// 读取文件时，若文件不存在都会报错
let content = fs.readFileSync("./31. test.html", "utf-8"); // 同步阻塞，适合读取小文件，模块化采用 readFileSync来读取文件

let exisits = fs.existsSync("./31. test.html"); // 只用同步，异步方法不符合规范，因此不采用
console.log(exisits);

// 对文件操作，一般不采用相对路径，相对路径不明确
const path = require("path");

// __dirname 代表当前文件所在目录 是绝对路径，而且不可变
console.log(path.join(__dirname, "a", "b", "c", "d", "..")); // 根据系统的分割符，将对应的路径拼接起来
console.log(path.resolve(__dirname, "a", "b", "/")); // 根据执行路径，解析出一个绝对路径，默认是可变的（根据执行路径发生变化）

// path.join() 和 path.resolve() 可互相转化，但 resolve 不能遇到 / 会回到根路径

console.log(path.extname("./31. test.html")); // 获取文件后缀名
console.log(path.dirname("./31. test.html")); // 获取父级路径

// vm node中的虚拟机模块 = new Function()
// node 模块化实现 是读取文件，

// eval 会依赖外层作用域 (不能用做模块化实现，模块化要求是 互相不影响)
let ab = 100;
// eval("console.log(ab)");

// 可包装成函数来执行
// let fn = new Function("console.log(ab)"); // 创建一个顶级函数，不依赖于上下文实现 (查看 MDN 官方说法)
// fn();

const vm = require("vm");
// let fn2 = vm.compileFunction("console.log(ab)"); // 类似于 new Function
// fn2();
/**  将变量放到全局作用域中  */
global.ab = 100; // 将变量放到全局作用域中
vm.runInThisContext("console.log(ab)"); // 用做沙箱

// 内部自动添加 .js .json 后缀来查找文件
// 执行流程如下：
// 1. 对 ./32. test 文件做路径处理，把相对路径转为绝对路径，并且添加后缀找到文件
// 2. 读取文件，将内容包装成一个函数，最终返回 module.exports，r 的结果就是 module.exports
// 内部对执行的文件，包装一个函数来实现模块化
let r = require("./32. test");
// let r = (function () {
//   module.exports = "ccc";
//   return module.exports;
// })();
console.log(r);

// require("./32. test"); 源码调试内容：
// 1. Module._load() 加载模块
// 2. Module._resolveFilename() 处理路径为 绝对路径，并且添加文件后缀
// 3. 拿到文件 检查是否加载过 Module._cache 是否有缓存，若有则直接结束
// 4. 没有缓存则 new Module(id, exports={}) exports 是对应模块的导出结果，默认为空
// 5. 将创建的模块缓存
// 6. 根据文件加载模块，给 module.exports 赋值
// 7. 找到对应文件后缀，做加载操作 Module._extensions[.js](this, filename); 策略模式
// 8. 读取文件内容，fs.readFileSync(filename, 'utf8');
// 9. 将字符串执行 module._compile() 编译字符串
// 10. 包裹函数 'exports','require','module','__filename','__dirname'

// module.exports = exports;
// this = exports;
// 11. Reflect.apply(this, [exports, require, module, filename, path,dirname])  module.exports = 'ccc';

//webpack最终打包的结果也是这样
