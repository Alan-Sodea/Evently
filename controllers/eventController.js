const Event = require('../models/eventModel');
const User = require('../models/userModel');

exports.create = async (req, res) => {
    const { email, title, urlImg, desc, date } = req.body;
    try {
        const user = await User.findOne({ where : {email} });
        if (user)
        {
            const event = await Event.create({ title, userId : user.id, urlImg, desc, date });
            res.status(201).json(event);
        }
        else
        {
            res.status(404).json({ error : "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Event Registration failed' });
    }
};

exports.read = async (req, res) => {
    const { id } = req.query;
    try {
        const event = await Event.findOne({ where: { id } });

        if (!event) 
        {
            return res.status(401).json({ error: 'Unknown Event' });
        }
        res.json(event);
        return event;
    } catch (error) {
        res.status(400).json({ error: 'Reading failed' });
    }
};

exports.readAll = async (req, res) => {
    try {
        const event = await Event.findAll();
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: 'Reading failed' });
    }
};

exports.readMe = async (req, res) => {
    const {email} = req.query;

    const user = await User.findOne({ where : {email} });
    if (user)
    {
        try 
        {
            const event = await Event.findAll({where : {userId: user.id}});
            res.json(event);
        } catch (error) {
            res.status(400).json({ error: 'Reading failed' });
        }
    }
    else
    {
        res.status(404).json({ error : "User not found" });
    }    
};

exports.update = async (req, res) => {
    const { id, email, title, urlImg, desc, date, certified } = req.query;

    try {

        let user = await User.findOne({ where: { email } });
        if (!user)return res.status(401).json({ error: 'Unknown User' });
        let userId = await user.id;

        const event = await Event.findOne({ where: { id } });
        if (!event)
        {
            return res.status(401).json({ error: 'Unknown Event' });
        }
        if (event.userId!=userId)
        {
            return res.status(400).json({ error: 'Access Denied' });
        }

        if (title) event.title = title;
        if (urlImg) event.urlImg = urlImg;
        if (desc) event.desc = desc;
        if (date) event.date = date;
        if (certified) event.certified = certified;
        await event.save();
        res.json(event);

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Reading failed' });
    }
};

exports.remove = async (req, res) => {
    const { id, email } = req.query;
    // console.log(req)
    try {
        const user = await User.findOne({ where: { email } });
        if (!user)return res.status(401).json({ error: 'Unknown User' });
        const idUser = user.id;

        const event = await Event.findOne({ where: { id } });
        if (!event)
        {
            return res.status(401).json({ error: 'Unknown Event' });
        }

        if (event.userId!=idUser)
        {
            return res.status(400).json({ error: 'Access Denied' });
        }
        await event.destroy();
        return res.status(204).json({message : "Event deleted successfully"});
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Deleting failed' });
    }
}