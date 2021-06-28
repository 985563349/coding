type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};
