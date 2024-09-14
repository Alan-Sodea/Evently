
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password || name=="" || password=="" || email=="")
    {
        return res.status(400).json({ error: 'User registration failed' });
    }
    console.log({ name, email, password })
    try {
        const isuser = await User.findOne({ where: { email } });
        if (!isuser)
        {
            const user = await User.create({ name, email, password });
            res.json({name , email, password});
        }
        else
        {
            res.status(400).json({ error: 'User already exist' });
        }
    } catch (error) {
        res.status(400).json({ error: 'User registration failed' });
    }
};

exports.readMe = async (req, res) => {
    const {id} = req.query;
    const user = await User.findOne({ where : {id} });
    if (user)res.json(user);
    else res.status(404).json({ error : "User not found" }); 
};

exports.login = async (req, res) => {
    const { email, password } = req.query;
    try {
        const user = await User.findOne({ where: { email } });
        console.log(user)
        if (!user || !(password == user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        let id = await user.id;
        let name = await user.name;
        res.json({id, name, email, password});
    } catch (error) {
        res.status(400).json({ error: 'User login failed' });
    }
};

exports.readList = async (req, res) => {
    try {   
        const user = await User.findAll();
        res.json({user});
    } catch (error) {
        res.status(400).json({ error: 'User login failed' });
    }
};


exports.modify = async (req, res) => {
    try{
        const { email, password, name } = req.body;

        const user = await User.findOne({ where: { email } });
        
        if (name)user.name = await name;
        if (password)user.password = await password;

        await user.save();
        
        const newUser = await User.findOne({ where: { email } });
        res.json({name : newUser.name, email : newUser.email, password : newUser.password});
    }
    catch (err) {
        console.log(err);
        res.status(400).json({error : "User modifying failed"})
    }
}