const effectStack = [];

function subscribe(effect, subs) {
  // 订阅关系建立
  subs.add(effect);
  // 依赖关系建立
  effect.deps.add(subs);
}

function cleanup(effect) {
  // 从该 effect 订阅的所有 state 对应的 subs 中移除该 effect
  for (subs of effect.deps) {
    subs.delete(effect);
  }
  // 从该 effect 依赖的所有 state 对应的 subs 移除
  effect.deps.clear();
}

function useState(value) {
  const subs = new Set();

  const getter = () => {
    // 取出当前上下文的 effect
    const effect = effectStack[effectStack.length - 1];
    if (effect) {
      // 建立发布订阅关系
      subscribe(effect, subs);
    }
    return value;
  };

  const setter = (newValue) => {
    value = newValue;
    // 通知所有订阅该 state 变化的 effect 执行
    for (const effect of [...subs]) {
      effect.execute();
    }
  };

  return [getter, setter];
}

function useEffect(callback) {
  const execute = () => {
    cleanup(effect);
    effectStack.push(effect);

    try {
      callback();
    } finally {
      effectStack.pop();
    }
  };

  const effect = {
    execute,
    deps: new Set(),
  };

  execute();
}

function useMemo(callback) {
  const [s, set] = useState();
  // 首次执行 callback，初始化 value
  useEffect(() => set(callback()));
  return s;
}

const [count, setCount] = useState(0);

useEffect(() => {
  console.log('count:', count());
});

setCount(1);
