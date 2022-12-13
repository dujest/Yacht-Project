const pool = require('../db')
const { createCustomError } = require('../custom-error')

const insertYacht = async (newYacht) => {
    const insert = await pool.query(
        "INSERT INTO yacht (yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity, resistance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [newYacht.yacht_name, newYacht.length_wl, newYacht.beam_wl, newYacht.draft, newYacht.displacement, newYacht.centre_of_buoyancy, newYacht.prismatic_coefficient, newYacht.velocity, newYacht.resistance]
    )
    console.log(insert)
    return insert.rows[0]
}

const selectYachts = async () => {
    const allYachts = await pool.query(
        "SELECT * FROM yacht ORDER BY id DESC"
    )

    return allYachts.rows
}

const selectYacht = async (id) => {
    const result = await pool.query(
        "SELECT * FROM yacht WHERE id = $1",
        [id]
    )
    if (!result || result.rows.length === 0) {
        throw createCustomError(`No yacht with id: ${id}`, 404)
    }

    return result.rows[0]
}

const updateYacht = async (id, data) => {
    const result = await pool.query(
        "UPDATE yacht SET yacht_name = $1, length_wl = $2, beam_wl = $3, draft = $4, displacement = $5, centre_of_buoyancy = $6, prismatic_coefficient = $7, velocity = $8, resistance = $9 WHERE id = $10 RETURNING *",
        [data.yacht_name, data.length_wl, data.beam_wl, data.draft, data.displacement, data.centre_of_buoyancy, data.prismatic_coefficient, data.velocity, data.resistance, id]
    )
    if (!result || result.rows.length === 0) {
        throw createCustomError(`No yacht with id: ${id}`, 404)
    }

    return result.rows[0]
}

const deleteYacht = async (id) => {
    const result = await pool.query(
        "DELETE FROM yacht WHERE id = $1",
        [id]
    )
    if (!result) {
        throw createCustomError(`No yacht with id: ${id}`, 404)
    }
}

module.exports = {
    insertYacht,
    selectYacht,
    selectYachts,
    updateYacht,
    deleteYacht
}