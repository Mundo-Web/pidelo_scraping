import cors from 'cors'
import express from "express"

import apiRoutes from './routes/api.js'
import webRoutes from './routes/web.js'

const { json, urlencoded } = express
const app = express()
const PORT = process.env.PORT || 8080
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.use('/api', apiRoutes)
app.use('/', webRoutes)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})