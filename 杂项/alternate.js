function* alternate(...args) {
  while (true) {
    for (let i = 0; i < args.length; i++) {
      yield args[i];
    }
  }
}

const gen = alternate('one', 'two', 'three');

for (let i = 0; i < 6; i++) {
  console.log(gen.next().value);
}
