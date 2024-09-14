const Register = require("../models/RegisterModel")
const Event = require("../models/eventModel");
const User = require("../models/userModel");

exports.create = async (req, res) =>
{
    const { eventId, userId } = req.body;
    
    try {
        const linka = await Register.findOne({ where : {userId : userId, eventId : eventId} });
        console.log({linka})
        const user = await User.findOne({ where : {id : userId} });
        const event = await Event.findOne({ where : {id : eventId} });
        if (user && event)
        {
            if (linka != null && linka !=undefined) res.json(linka);
            else
            {
                const link = await Register.create({userId : user.id, eventId });
                res.status(201).json(link);
            }   
        }
        else
        {
            res.status(404).json({ error : "User or Event not found" });
        }
    } catch (error) {
        res.status(400).json({ error: 'Event Registration Failed' });
        console.log({err})
    }
}

exports.read = async (req, res) =>
{
    const { userId } = req.query;
    try {
        const user = await User.findOne({ where : {id : userId} });
        if (user)
        {
            const links = await Register.findAll({ where : {userId} });
            res.status(201).json(links);
        }
        else
        {
            // console.log()
            res.status(404).json({ error : "User or Event not found" });
        }
    } catch (error) {
        res.status(400).json({ error: 'Event Registration Failed' });
    }
}


exports.remove = async (req, res) =>
{
    const { userId, eventId } = req.query;
    try {
        let elt = await Register.destroy({ where : {userId, eventId} });
        res.json({elt});
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Event deletion Failed' });
    }
}