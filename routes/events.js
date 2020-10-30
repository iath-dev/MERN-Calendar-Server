const { Router } = require('express')
const { check } = require('express-validator')

const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/events')

const isDate = require('../helpers/isDate')
const fieldValidator = require('../middlewares/fieldValidator');
const validateToken = require('../middlewares/validateToken')

const router = Router()

router.use(validateToken)

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check(['start', 'end'], 'Las fechas son obligatorias').custom(isDate),
        fieldValidator
    ],
    createEvent
)

router.get('/', getEvents)

router.put('/:id', updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router
