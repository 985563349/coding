module.exports = function (source) {
  console.log(source); //=> 源文件内容
  console.log(typeof source); //=> string

  let script = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `;

  return script;
};
