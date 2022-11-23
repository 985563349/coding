function* infiniteLists(start = 0) {
  while (true) {
    yield start++;
  }
}

const gen = infiniteLists();

for (let i = 0; i < 6; i++) {
  console.log(gen.next().value);
}
