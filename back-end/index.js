const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

// middleware
app.use(cors())
app.use(express.json()) //req.body

// ROUTES //

// create a yacht
app.post('/yachts', async (req, res) => {
    try {
        const {param_id} = req.body
        const {yacht_name} = req.body
        const newYacht = await pool.query(
            "INSERT INTO yacht (param_id, yacht_name) VALUES ($1, $2) RETURNING *",
            [param_id, yacht_name]
        )
        res.json(newYacht.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// get all yachts
app.get('/yachts', async (req, res) => {
    try {
        const allYachts = await pool.query(
            "SELECT * FROM yacht"
        )
        res.json(allYachts.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// get a yacht
app.get('/yachts/:id', async (req, res) => {
    try {
        const {id} = req.params
        const aYacht = await pool.query(
            "SELECT * FROM yacht WHERE id = $1",
            [id]
        )
        res.json(aYacht.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// update a yacht
app.put('/yachts/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {yacht_name} = req.body
        const updateYacht = await pool.query(
            "UPDATE yacht SET yacht_name = $1 WHERE id = $2 RETURNING *",
            [yacht_name, id]
        )
        res.json(updateYacht.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// delete a yacht
app.delete('/yachts/:id', async (req, res) => {
    try {
        const {id} = req.params
        const deleteYacht = await pool.query(
            "DELETE FROM yacht WHERE id = $1",
            [id]
        )
        res.json("Yacht has been deleted!")
    } catch (error) {
        console.error(error.message)
    }
})


const port = 5000

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})
