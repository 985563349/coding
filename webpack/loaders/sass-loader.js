const sass = require('sass');

module.exports = function (source) {
  // 源文件内容source默认为string类型

  // 同步解析
  // const result = sass.renderSync({ data: source });
  // return result.css.toString();

  // 异步解析
  const callback = this.async();
  sass.render({ data: source }, (error, result) => {
    callback(error, result.css.toString());
  });
};
