Page({
  data: {
    text: '',
    todos: []
  },

  onLoad () {
    this.getTodos();
  },

  handleInput(e) {
    this.setData({ text: e.detail.value })
  },

  async getTodos() {
    const { result } = await wx.cloud.callFunction({
      name: 'todo',
      data: {
        $url: 'get'
      } 
    })
    this.setData({ todos: result })
  },

  async addTodo() {
    const { text } = this.data

    if (!text) return

    await wx.cloud.callFunction({
      name: 'todo',
      data: {
        $url: 'add',
        content: text
      }
    })
    this.setData({ text: '' })
    this.getTodos();
  },

  async updateTodo(e) {
    // 小程序组件是真的很难用
    const checked = !!e.detail.value.length;
    const { id } = e.target.dataset;

    console.log(checked)

    await wx.cloud.callFunction({
      name: 'todo',
      data: {
        $url: 'update',
        id,
        done: checked
      }
    })
    this.getTodos();
  },

  async deleteTodo(e) {
    const { id } = e.target.dataset
    await wx.cloud.callFunction({
      name: 'todo',
      data: {
        $url: 'delete',
        id
      }
    })
    this.getTodos()
  }
})