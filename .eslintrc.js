module.exports = {
  "root" : true,
  "parserOptions": { 
    "parser": 'babel-eslint',
    "ecmaVersion": 8,
    "sourceType": "module",
  },
  "env": {
    "browser": true
  },
  "extends": [
    'standard'
  ],
  "plugins": [
  ],
  "rules": {
    // 控制语句不能省略花括号
    "curly": 1,
    // 不能有空的函数
    "no-empty-function": 1,
    // 与null比较时必须使用 === or !==
    "no-eq-null": 1,
    // 禁止使用eveal解析
    "no-implied-eval": 1,
    // 小数点之前或之后必须有一个数字
    "no-floating-decimal": 1,
    // 禁止全局命名变量和函数
    "no-implicit-globals": 1,
    // 数组括号内必须换行
    "array-bracket-newline": ["warn", { "minItems": 2 }],
    // 一行代码中使用同样的规则
    "block-spacing": ["warn","always"],
    // 大括号使用一致的风格 Stroustrup
    "brace-style": ["warn"],
    // 使用一致的缩进 
    "indent": ["warn", 2,{ "VariableDeclarator": 1 }],
    // 禁止使用 空格 和 tab 混合缩进
    "no-mixed-spaces-and-tabs": 1,
    // 强制使用一致的反勾号、双引号或单引号
    "quotes": ["warn"],
    // 禁止未使用过的变量
    "no-unused-vars": ["warn"],
    // 要求使用骆驼拼写法
    "camelcase": ["warn"],
    // 要求使用 === 和 !==
    "eqeqeq": 0,
    // 此规则可帮助你定位由变量漏写、参数名漏写和意外的隐式全局变量声明所导致的潜在引用错误
    "no-undef": ["warn"],
    // 该规则强制对象属性的冒号左右的空格的一致性。它可以单独验证每一个属性，或它可以确保对象中的属性在垂直方向上对齐。
    "key-spacing": ["warn"],
    // 要求或禁止使用拖尾逗号
    "comma-dangle": ["warn"],
    // 在非空文件中存在拖尾换行是一个常见的 UNIX 风格。它的好处同输出文件到终端一样，方便在串联和追加文件时不会打断 shell 的提示。
    "eol-last": ["warn"],
    // 禁用行尾空白  有时在编辑文件的过程中，你可以在行的末尾以额外的空格作为结束。这些空格差异可以被源码控制系统识别出并被标记为差异，给开发人员带来挫败感。虽然这种额外的空格并不会造成功能性的问题，许多编码规范要求在提交代码之前删除尾部空格。
    "no-trailing-spaces": ["warn"],
    // 禁止使用 Array 构造函数
    "no-array-constructor": ["warn"],
    // 在一个方法中应该允许多少个变量声明。
    "one-var": ["warn","never"],
    // 禁止重新声明变量
    "no-redeclare": ["warn"],
    // 禁止未使用过的表达式 
    "no-unused-expressions": ["warn"],
    // 不允许使用逗号操作符
    "no-sequences": ["error"],
    // 禁止在嵌套的语句块中出现变量或 function 声明 
    "no-inner-declarations": ["warn"],
    // 禁止扩展原生对象
    "no-extend-native": ["warn"],
    // 要求在语句末尾使用分号
    "semi": ["warn", "always"],
    // 强制在逗号周围使用空格
    "comma-spacing": ["warn"],
    // 要求或禁止函数圆括号之前有一个空格
    "space-before-function-paren": ["warn"],
    // 禁止对 function 声明重新赋值
    "no-func-assign": ["warn"],
    // 这个规则在文件内的任何地方寻找制表符：代码，注释或其他东西
    "no-tabs": ["warn"],
    // 空白对于分离代码代码段逻辑是有帮助的，但过量的空白会占用更多的屏幕 默认最大连续空2行
    "no-multiple-empty-lines": ["warn"],
    // 此规则在对象文字的大括号，解构赋值和导入/导出说明符中强制执行一致的间距。
    "object-curly-spacing": ["warn"],
    "standard/object-curly-even-spacing": ["warn"],
    // 此规则的目的在于标记出可以被正常函数调用所替代的 Function.prototype.call() 和 Function.prototype.apply() 的使用。
    "no-useless-call": ["warn"],
    // 禁止在对象字面量中出现重复的键
    "no-dupe-keys": ["warn"],
    // 禁用不必要的转义
    "no-useless-escape": ["warn"],
    "no-new": 0,
    // 要求构造函数首字母大写
    "new-cap": ["Warn"],
    // 禁止在条件语句中出现赋值操作符
    "no-cond-assign": ["warn"],
    // 禁止在条件中使用常量表达式
    "no-constant-condition": ["warn"],
    // 禁止出现多个空格  在某行中，出现多个空格而且不是用来作缩进的，通常是个错误
    "no-multi-spaces": ["warn"],
    // 要求或禁止块内填充 一些风格指南要求块语句以空行开始并且以空行结束。目标是通过块内容和周围代码视觉上地分离来提高可读性
    "padded-blocks": ["warn"],
    // 要求或禁止语句块之前的空格
    "space-before-blocks": ["warn"],
    // 强制关键字周围空格的一致性
    "keyword-spacing": ["warn"],
    // 禁止或强制圆括号内的空格
    "space-in-parens": ["warn"],
    // 要求中缀操作符周围有空格 
    "space-infix-ops": ["warn"],
    // 在函数的名字和调用它的圆括号之间是否插入可选的空格
    "func-call-spacing": ["warn"],
    // 要求或禁止在一元操作符之前或之后存在空格
    "space-unary-ops": ["warn"],
    // 要求或禁止在注释前有空白 
    "spaced-comment": ["warn"],
    // 要求或者禁止Yoda条件 类似于星球大战中 Yoda 的讲话方式 字面量在先而变量在第二
    "yoda": ["warn"],
    "no-irregular-whitespace": ["warn"],
    // 分号前后不能有空格
    "semi-spacing": ["warn"],
    // 此规则防止使用重复的名称。
    "no-dupe-keys": ["error"],
    // 要求使用 Error 对象作为 Promise 拒绝的原因
    "prefer-promise-reject-errors": ["warn"],
    "promise/param-names": ["warn"]
  }
};