// Box
const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  inspect: () => `Box(${x})`,
});

// Maybe
const Maybe = (x) => ({
  map: (f) => Maybe(x == null ? x : f(x)),
  fold: (f) => f(x),
  inspect: () => `Maybe(${x})`,
});

// Either
const Either = (l, r) => ({
  map: (f) => (r == null ? Either(f(l), r) : Either(l, f(r))),
  fold: (f) => (r == null ? f(l) : f(r)),
  inspect: () => `Either(${l}, ${r})`,
});
