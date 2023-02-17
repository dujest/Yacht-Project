const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const errorHandlerMiddleware = require('./errors/error-handler')
const PORT = process.env.PORT || 5000

app.use(express.static('./client'))

// middleware
app.use(cors())
app.use(express.json()) //req.body

// routes
app.use('/yachts', routes)
app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})
