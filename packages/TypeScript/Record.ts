type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};
