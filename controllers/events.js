const { request, response } = require('express')

const Event = require('../models/Event')

const createEvent = async (req = request, res = response) => {

    try {
        const { body, auth: { uid } } = req
    
        const event = new Event({
            ...body,
            user: uid
        })

        await event.save()
    
        res.status(200).json({
            ok: true,
            data: event
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ups, Hubo un error y no pudo crear el evetn'
        })
    }
}

const getEvents = async (req = request, res = response) => {

    try {
        const { auth: { uid } } = req
    
        const events = await Event.find({ user: uid }).populate('user', 'name')
    
        res.status(200).json({
            ok: true,
            data: events
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ups, No se pudo obtener los eventos'
        })
    }
}

const updateEvent = async (req = request, res = response) => {
    try {
        const { auth: { uid }, params: { id }, body } = req
        
        let event = await Event.findOne({ user: uid, _id: id })

        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Evento no encontrado'
            })
        }

        event = await Event.findByIdAndUpdate(id, body, { new: true })

        // await event.save()

        res.status(200).json({
            ok: true,
            data: event
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ups, Hubo un error actualizando el evento'
        })
    }
}

const deleteEvent = async (req = request, res = response) => {
    try {
        const { auth: { uid }, params: { id } } = req

        const event = await Event.findOne({ user: uid, _id: id })

        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Ups, no se pudo encontrar el evento'
            })
        }
    
        await Event.findByIdAndDelete(id, (err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: err.message
                })
            }

            res.status(200).json({
                ok: true,
                msg: 'Evento eliminado'
            })

        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ups, Hubo un error eliminando el evento'
        })
    }
}

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
}
