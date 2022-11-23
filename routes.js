const express = require('express')
const router = express.Router()

const { createYacht, getAllYachts, getYacht, updateYacht, deleteYacht, getIndexHtml } = require('./controllers')

router.route('/').get(getAllYachts).post(createYacht)
router.route('/:id').get(getYacht).put(updateYacht).delete(deleteYacht)
router.route('*').get(getIndexHtml)

module.exports = router
