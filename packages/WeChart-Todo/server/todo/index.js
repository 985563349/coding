// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const COLLECTION = 'todos'

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })

  app.router('get', async (ctx, next) => {
    const { data } = await db.collection(COLLECTION).get()
    ctx.body = data.reverse()
  })

  app.router('add', async (ctx, next) => {
    const { content } = ctx._req.event
    await db.collection(COLLECTION).add({ data: { content, done: false } })
  })

  app.router('delete', async (ctx, next) => {
    const { id } = ctx._req.event;
    await db.collection(COLLECTION).where({ _id: id }).remove();
  })

  app.router('update', async (ctx, next) => {
    const { id, done } = ctx._req.event;
    await db.collection(COLLECTION).where({ _id: id }).update({ data: { done } })
  })

  return app.serve();
}