const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber');
const subscriber = require('../models/subscriber');

router.get('/', async (req, res) => {
    try {
        const subs = await Subscriber.find();
        res.json(subs)
    } catch (error) {
        res.status(500).json({ msg: error.msg })
    }
})

router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
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

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: "Cannot find subscriber" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.subscriber = subscriber
    next()
}

router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSub = await res.subscriber.save()
        return res.status(200).json(updatedSub)
    } catch (error) {
        return res.json({ msg: error.message })
    }
})

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne();
        return res.status(200).json({ msg: "Deleted subscriber" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

module.exports = router