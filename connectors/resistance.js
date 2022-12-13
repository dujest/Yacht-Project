const { YachtDB } = require("../models/yacht")
const axios = require('axios')

const predictResistance = async (yacht) => {

    const { data: { resistance } } = await axios.post(`${process.env.YACHT_RESISTANCE_URL}/predict`, yacht)

    const yacht_resistance = new YachtDB({
        ...yacht, resistance
    })

    return yacht_resistance

}

module.exports = {
    predictResistance
}