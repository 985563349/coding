type Merge<T, U> = {
  [P in keyof (T & U)]: P extends keyof U ? U[P] : (T & U)[P];
};
