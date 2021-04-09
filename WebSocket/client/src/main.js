(function () {
  let ws;
  let lockReconnect = false;
  let timer;

  function createWebSocket() {
    try {
      ws = new WebSocket('ws://localhost:8080');
      init();
    } catch {
      reconnect();
    }
  }

  function init() {
    ws.onopen = () => {
      console.log('%c WebSocket open', 'color:green');
      // 开启心跳
      heartCheck.start();
    };

    ws.onmessage = (e) => {
      console.log(e.data);
      // 重置心跳
      heartCheck.start();
    };

    ws.onerror = () => {
      console.log('%c WebSocket error', 'color:red');
      reconnect();
    };

    ws.onclose = () => {
      console.log('%c WebSocket close', 'color:red');
      reconnect();
    };
  }

  function reconnect() {
    if (lockReconnect) return;

    lockReconnect = true;
    clearTimeout(timer);

    // 4s后开启重连
    timer = setTimeout(() => {
      createWebSocket();
      lockReconnect = false;
    }, 4000);
  }

  const heartCheck = {
    timeout: 3000,
    timer: null,
    serverTimer: null,
    start() {
      clearTimeout(this.timer);
      clearTimeout(this.serverTimer);
      this.timer = setTimeout(() => {
        ws.send('ping');

        // 规定时间未返回、断开连接
        this.serverTimer = setTimeout(() => {
          ws.close();
        }, this.timeout);
      }, this.timeout);
    },
  };

  createWebSocket();
})();
