const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const routes = require('./routes')
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'client')))

// middleware
app.use(cors())
app.use(express.json()) //req.body

// routes
app.use('/yachts', routes)

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})
