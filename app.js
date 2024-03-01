const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/address', require('./routes/addressRoutes'))

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
