type ParseQueryString<Str extends string> = Str extends `${infer Param}&${infer Rest}`
  ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
  : ParseParam<Str>;

type ParseParam<Param extends string> = Param extends `${infer Key}=${infer Value}`
  ? {
      [K in Key]: Value;
    }
  : Record<string, any>;

type MergeParams<OneParam extends Record<string, any>, OtherParam extends Record<string, any>> = {
  [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
      ? MergeValues<OneParam[Key], OtherParam[Key]>
      : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never;
};

type MergeValues<One, Other> = One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other];

type ParseQueryStringResult = ParseQueryString<'a=1&b=2&c=3'>;

// 当返回值与返回值类型不兼容时，建议使用函数重载的方式来声明类型，否则就需要使用 as any 来处理。
function parseQueryString<Str extends string>(queryString: Str): ParseQueryString<Str>;
function parseQueryString(queryString: string) {
  if (!queryString?.length) {
    return {};
  }

  const result: Record<string, any> = {};

  queryString.split('&').forEach((item) => {
    const [key, value] = item.split('=');
    if (key in result) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });

  return result;
}

const queryString = parseQueryString('a=1&b=2&c=3');
