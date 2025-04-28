const { text } = require('express');
const Fact = require('../models/fact');

const getAll = async (req, res) => {
    try {
        const facts = await Fact.find();

        res.status(200).json(facts);
    } catch (error) {
        res.status(500).json({ message: "Coundn't find the list of facts. Try again" })
        
    }
}

const create = async (req, res) => {
    try {
        const doc = new Fact({
            title: req.body.title,
            text: req.body.text,
        })

        const fact = await doc.save();

        res.status(201).json(fact);
    } catch (error) {
        res.status(500).json({ message: "Couldn't create a fact" });
    }
}

const remove = async (req, res) => {
    try {
        const factId = req.params.id;

        const doc = await Fact.findOneAndDelete({ _id: factId });

        if (!doc) {
            return res.status(404).json({ message: "Fact not found" });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Couldn't delete a fact" });
        
    }
}

const update = async (req, res) => {
    try {
        const factId = req.params.id;

        await Fact.updateOne(
            { _id: factId },
            {
                title: req.body.title,
                text: req.body.text,
            }
        )

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Couldn't update a fact" });
    }
}

module.exports = {
    getAll,
    create,
    remove, 
    update
}