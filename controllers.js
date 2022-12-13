const axios = require('axios')
const pool = require('./db')
const path = require('path')
const { createCustomError } = require('./custom-error')
const yachtSchema = require('./validate')
const { YachtBluePrint } = require('./models/yacht')
const { predictResistance } = require('./connectors/resistance')
const { insertYacht, selectYacht, selectYachts, updateYacht, deleteYacht } = require('./dal/yacht')

// create a yacht
const createYacht = async (req, res) => {

    const newYacht = new YachtBluePrint(req.body)

    const yachtResistance = await predictResistance(newYacht)

    const createdYacht = await insertYacht(yachtResistance)

    res.status(201).json(createdYacht)

}

// get all yachts
const getAllYachts = async (req, res) => {

    const allYachts = await selectYachts()

    res.status(200).json(allYachts)

}

// get a yacht
const getYacht = async (req, res) => {

    const { id } = req.params

    const yacht = await selectYacht(id)

    res.status(200).json(yacht)

}

// update a yacht
const putYacht = async (req, res) => {

    const { id } = req.params

    const newYacht = new YachtBluePrint(req.body)

    const yachtResistance = await predictResistance(newYacht)

    const updatedYacht = await updateYacht(id, yachtResistance)

    res.status(201).json(updatedYacht)

}

// delete a yacht
const delYacht = async (req, res) => {

    const { id } = req.params

    await deleteYacht(id)

    res.status(200).json("Yacht has been deleted!")

}

const getIndexHtml = async (req, res) => {
    res.sendFile(path.join(__dirname, "client/index.html"))
}

module.exports = {
    createYacht,
    getAllYachts,
    getYacht,
    putYacht,
    delYacht,
    getIndexHtml
}