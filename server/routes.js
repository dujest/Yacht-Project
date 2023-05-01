const express = require('express')
const router = express.Router()

const {
    createYacht,
    getAllYachts,
    getYacht,
    putYacht,
    delYacht,
    getIndexHtml,
} = require('./controllers')

router.route('/').get(getAllYachts).post(createYacht)
router.route('/:id').get(getYacht).put(putYacht).delete(delYacht)
router.route('*').get(getIndexHtml)

module.exports = router
