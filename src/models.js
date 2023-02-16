const yachtSchema = require('./validate')

class YachtBluePrint {
    yacht_name = null
    length_wl = null
    beam_wl = null
    draft = null
    displacement = null
    centre_of_buoyancy = null
    prismatic_coefficient = null
    velocity = null

    constructor(data) {
        yachtSchema.validateSync(data, { strict: true, abortEarly: false })
        const {
            yacht_name,
            length_wl,
            beam_wl,
            draft,
            displacement,
            centre_of_buoyancy,
            prismatic_coefficient,
            velocity,
        } = data
        this.yacht_name = yacht_name
        this.length_wl = length_wl
        this.beam_wl = beam_wl
        this.draft = draft
        this.displacement = displacement
        this.centre_of_buoyancy = centre_of_buoyancy
        this.prismatic_coefficient = prismatic_coefficient
        this.velocity = velocity
    }
}

class YachtDB extends YachtBluePrint {
    resistance = null

    constructor(data) {
        const { resistance, ...rest } = data
        if (!resistance) {
            throw createCustomError('Resistance can not be predicted:', 404)
        }
        super(rest)
        this.resistance = resistance
    }
}

module.exports = {
    YachtBluePrint,
    YachtDB,
}
