import nc from 'next-connect'

const handler = nc()

handler.get((req, res) => {
  res.json({ message: 'Hello from the API route!' })
})

export default handler
