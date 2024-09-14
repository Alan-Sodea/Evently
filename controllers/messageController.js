const Message = require("../models/messageModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

exports.create = async (req, res) => {
    const { email, text, eventId } = req.body;
    try {
        const user = await User.findOne({ where : {email} });
        if (user)
        {
            const event = await Message.create({text, userId : user.id, eventId });
            res.status(201).json(event);
        }
        else
        {
            res.status(404).json({ error : "User not found" });
        }
    } catch (error) {
        res.status(400).json({ error: 'Message Creation Failed' });
    }
};

exports.read = async (req, res) => {
    const { eventId } = req.query;
    try {
        const event = await Event.findOne({ where: { id : eventId } });

        if (!event) 
        {
            return res.status(401).json({ error: 'Unknown Event' });
        }

        const messages = await Message.findAll({ where: { eventId } });

        if (!messages) 
        {
            return res.status(401).json({ error: 'Reading failed' });
        }

        res.json(messages);
        return messages;
    } catch (error) {
        res.status(400).json({ error: 'Reading failed' });
    }
};

exports.remove = async (req, res) => {
    const { id, email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user)return res.status(401).json({ error: 'Unknown User' });
        const idUser = user.id;

        const message = await Message.findOne({ where: { id } });
        if (!message)
        {
            return res.status(401).json({ error: 'Unknown Event' });
        }

        if (message.userId!=idUser)
        {
            return res.status(400).json({ error: 'Access Denied' });
        }
        await message.destroy();
        return res.status(204).json({message : "Event deleted successfully"});
    } catch (error) {
        res.status(400).json({ error: 'Deleting failed' });
    }
}