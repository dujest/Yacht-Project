const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const axios = require('axios')
const PORT = process.env.PORT || 5000;

app.use(express.static('./client'))

// middleware
app.use(cors())
app.use(express.json()) //req.body

// ROUTES //

// create a yacht
app.post('/yachts', async (req, res) => {
    try {
        const { yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity } = req.body
        console.log(req.body)

        const { data: { resistance } } = await axios.post('https://yacht-resistance.herokuapp.com/predict', {
            length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity
        })

        console.log(resistance)

        const newYacht = await pool.query(
            "INSERT INTO yacht (yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity, resistance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity, resistance]
        )

        res.json(newYacht.rows[0])
    } catch (error) {
        console.error(error.message)
        // console.log(error)
    }

})

// get all yachts
app.get('/yachts', async (req, res) => {
    try {
        const allYachts = await pool.query(
            "SELECT * FROM yacht ORDER BY id DESC"
        )
        res.json(allYachts.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// get a yacht
app.get('/yachts/:id', async (req, res) => {
    try {
        const { id } = req.params
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
        console.log(req.params)
        console.log(req.body)
        const { id } = req.params
        const { yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity } = req.body

        const { data: { resistance } } = await axios.post('https://yacht-resistance.herokuapp.com/predict', {
            length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity
        })
        console.log(resistance)
        const updateYacht = await pool.query(
            "UPDATE yacht SET yacht_name = $1, length_wl = $2, beam_wl = $3, draft = $4, displacement = $5, centre_of_buoyancy = $6, prismatic_coefficient = $7, velocity = $8, resistance = $9 WHERE id = $10 RETURNING *",
            [yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity, resistance, id]
        )
        res.json(updateYacht.rows[0])
        console.log(updateYacht.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// delete a yacht
app.delete('/yachts/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteYacht = await pool.query(
            "DELETE FROM yacht WHERE id = $1",
            [id]
        )
        res.json("Yacht has been deleted!")
    } catch (error) {
        console.error(error.message)
    }
})

app.get('*', (req, res) => {
    res.sendFile("./client/index.html")
})

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})