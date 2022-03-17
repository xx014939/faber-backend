require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const nftsRouter = require('./routes/nfts')
app.use('/nfts', nftsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})