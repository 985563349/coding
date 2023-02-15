// 代理Functor，让Functor在组合中使用
// map :: Functor f => (a -> b) -> f a -> f b
const map = (f) => (functor) => functor.map(f);

Identity('flamethrowers').map((x) => x.toUpperCase());

Identity('bombs')
  .map((x) => x.concat(' away'))
  .map((x) => x.length);

Maybe('Malkovich Malkovich').map((x) => x.match(/a/gi));

Maybe(null).map((x) => x.match(/a/gi));

Maybe({ name: 'Boris' })
  .map((x) => x.age)
  .map((x) => x + 10);

Maybe({ name: 'Dinah', age: 14 })
  .map((x) => x.age)
  .map((x) => x + 10);

// safeHead :: [a] -> Maybe(a)
const safeHead = (xs) => Maybe(xs[0]);
const streetName = compose(
  map((x) => x.street),
  safeHead,
  (x) => x.addresses
);

streetName({ addresses: [] });
streetName({ addresses: [{ street: 'Shady Ln', number: 4201 }] });
