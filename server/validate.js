const yup = require('yup')

const yachtSchema = yup.object({
    yacht_name: yup.string().required(),
    length_wl: yup.number().required(),
    beam_wl: yup.number().required(),
    draft: yup.number().required(),
    displacement: yup.number().required(),
    centre_of_buoyancy: yup.number().required(),
    prismatic_coefficient: yup.number().required(),
    velocity: yup.number().required(),
})

module.exports = yachtSchema
