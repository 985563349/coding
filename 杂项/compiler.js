/**
 * tokenizer 词法分析器
 * @param {string} input  代码字符串
 * @returns token列表
 */
function tokenizer(input) {
  // 输入字符串处理的索引
  let current = 0;
  // token列表
  let tokens = [];

  // 遍历字符串，解析token
  while (current < input.length) {
    let char = input[current];

    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      });
      current++;
      continue;
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }

    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';

      // 匹配连续数字，作为value
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({
        type: 'number',
        value,
      });
      continue;
    }

    // 匹配如下字符串，以 “” 包裹
    if (char === '"') {
      let value = '';
      // 跳过左引号
      char = input[++current];

      // 获取双引号之间所有字符
      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      // 跳过右引号
      char = input[++current];

      tokens.push({
        type: 'string',
        value,
      });
      continue;
    }

    // 匹配函数名， 如(add 2 4)，匹配add
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';

      // 获取连续字符
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({
        type: 'name',
        value,
      });
      continue;
    }

    // 无法识别的字符，抛出错误提示
    throw new TypeError(`I don't know what this character is: ${char} `);
  }

  return tokens;
}

/**
 * parser 语法分析器
 * @param {*} tokens token列表
 * @returns 抽象语法树 AST
 */
function parser(tokens) {
  // token索引列表
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === 'number') {
      current++;
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }

    if (token.type == 'string') {
      current++;
      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    // 函数名
    if (token.type === 'paren' && token.value === '(') {
      // 跳过左括号，获取下一个 token 作为函数名
      token = tokens[++current];

      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };

      token = tokens[++current];

      // 有多个右圆括号，表示有嵌套函数
      // 遇到嵌套的 CallExpression时，使用walk函数来增加 current 变量
      // 右圆括号前的内容就是参数
      while (token.type !== 'paren' || (token.type === 'paren' && token.value !== ')')) {
        node.params.push(walk());
        token = tokens[current];
      }

      // 跳过右括号
      current++;
      return node;
    }
    // 无法识别的字符，抛出错误提示
    throw new TypeError(token.type);
  }

  // AST的根节点
  let ast = {
    type: 'Program',
    body: [],
  };

  // 填充ast.body
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

/**
 * traverser 遍历器
 * @param {*} ast 抽象语法树
 * @param {*} visitor 访问者对象
 */
function traverser(ast, visitor) {
  // 遍历数组中的节点
  function traverseArray(array, parent) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }

  // 遍历节点，参数为当前节点及其父节点
  function traverseNode(node, parent) {
    // 获取访问者对象上对应的方法
    let methods = visitor[node.type];
    // 执行访问者的 enter 方法
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node);
        break;

      case 'CallExpression':
        traverseArray(node.params, node);
        break;

      case 'NumberLiteral':
      case 'StringLiteral':
        break;

      // 无法识别的字符，抛出错误提示
      default:
        throw new TypeError(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  // 开始遍历
  traverseNode(ast, null);
}

/**
 * transformer 转换器
 * @param {*} ast 抽象语法树
 * @returns 新AST
 */
function transformer(ast) {
  // 创建一个新AST
  let newAst = {
    type: 'Program',
    body: [],
  };

  // 通过 _context引用，更新旧节点
  ast._context = newAst.body;

  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        });
      },
    },

    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },

    CallExpression: {
      enter(node, parent) {
        // 创建不同的AST节点
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };

        node._context = expression.arguments;

        // 顶层函数调用本质上是一个语句，写成特殊节点 ExpressionStatement
        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression,
          };
        }

        parent._context.push(expression);
      },
    },
  });

  return newAst;
}

/**
 * codeGenerator 代码生成器
 * @param {*} node AST中的 body 节点
 * @returns 代码字符串
 */
function codeGenerator(node) {
  // 判断节点类型
  switch (node.type) {
    // 根节点，递归 body 节点列表
    case 'Program':
      return node.body.map(codeGenerator).join('\n');

    // 表达式，处理表达式内容
    case 'ExpressionStatement':
      return `${codeGenerator(node.expression)}`;

    // 函数调用，添加左右括号，参数用逗号隔开
    case 'CallExpression':
      return `${codeGenerator(node.callee)}(${node.arguments.map(codeGenerator).join(', ')})`;

    // 标识符、数值，直接输出
    case 'Identifier':
      return node.name;
    case 'NumberLiteral':
      return node.value;

    // 字符串用双引号包起来
    case 'StringLiteral':
      return `"${node.value}"`;

    // 无法识别的字符，抛出错误提示
    default:
      throw new TypeError(node.type);
  }
}

function compiler(input) {
  let tokens = tokenizer(input);
  let ast = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);

  return output;
}

console.log(compiler('(add 2 (subtract 4 2))'));
