const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

router.get('/', async (req, res) => {
    try {
        const subs = await Subscriber.find();
        res.json(subs)
    } catch (error) {
        res.status(500).json({ msg: error.msg })
    }
})

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

router.post('/', async (req, res) => {
    const sub = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSub = await sub.save()
        res.status(201).json(newSub)
    } catch (error) {
        res.status(400).json({ msg: error.msg })
    }
})

router.patch('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router