const axios = require('axios')
const pool = require('./db')
const path = require('path')
const { createCustomError } = require('./custom-error')

// create a yacht
const createYacht = async (req, res) => {

    const { yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity } = req.body
    console.log(req.body)

    const { data: { resistance } } = await axios.post(`${process.env.YACHT_RESISTANCE_URL}/predict`, {
        length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity
    })
    if (!resistance) {
        throw createCustomError('The resistance can not be predicted:', 404)
    }
    console.log(resistance)

    const newYacht = await pool.query(
        "INSERT INTO yacht (yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity, resistance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity, resistance]
    )

    res.status(201).json(newYacht.rows[0])


}

// get all yachts
const getAllYachts = async (req, res) => {

    const allYachts = await pool.query(
        "SELECT * FROM yacht ORDER BY id DESC"
    )
    res.status(200).json(allYachts.rows)

}

// get a yacht
const getYacht = async (req, res) => {

    const { id } = req.params
    const aYacht = await pool.query(
        "SELECT * FROM yacht WHERE id = $1",
        [id]
    )
    if (!aYacht) {
        throw createCustomError(`No yacht with id: ${id}`, 404)
    }
    res.status(200).json(aYacht.rows[0])

}

// update a yacht
const updateYacht = async (req, res) => {

    console.log(req.params)
    console.log(req.body)
    const { id } = req.params
    const { yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity } = req.body

    const { data: { resistance } } = await axios.post(`${process.env.YACHT_RESISTANCE_URL}/predict`, {
        length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity
    })
    if (!resistance) {
        throw createCustomError('The resistance can not be predicted:', 404)
    }
    console.log(resistance)

    const updateYacht = await pool.query(
        "UPDATE yacht SET yacht_name = $1, length_wl = $2, beam_wl = $3, draft = $4, displacement = $5, centre_of_buoyancy = $6, prismatic_coefficient = $7, velocity = $8, resistance = $9 WHERE id = $10 RETURNING *",
        [yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity, resistance, id]
    )
    res.status(200).json(updateYacht.rows[0])
    console.log(updateYacht.rows[0])

}

// delete a yacht
const deleteYacht = async (req, res) => {

    const { id } = req.params
    const deleteYacht = await pool.query(
        "DELETE FROM yacht WHERE id = $1",
        [id]
    )
    if (!deleteYacht) {
        throw createCustomError(`No yacht with id: ${id}`, 404)
    }
    res.status(200).json("Yacht has been deleted!")

}

const getIndexHtml = async (req, res) => {
    res.sendFile(path.join(__dirname, "client/index.html"))
}

module.exports = {
    createYacht,
    getAllYachts,
    getYacht,
    updateYacht,
    deleteYacht,
    getIndexHtml
}
