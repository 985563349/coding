class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Hello World Plugin', (state) => {
      console.log('Hello World!');
    });
  }
}

module.exports = HelloWorldPlugin;
