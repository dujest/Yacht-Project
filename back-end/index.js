const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

// middleware
app.use(cors())

const port = 5000

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})
