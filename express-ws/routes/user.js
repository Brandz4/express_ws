const express = require('express');
const user = express.Router();

const db = require('../config/db');

user.post("/", async (req, res, next) => {
    const {user_name, user_mail, user_password} = req.body; 

    if(user_name && user_mail && user_password){
        const query = `INSERT INTO user (user_name, user_mail, user_password)` + 
    ` VALUES ('${user_name}', '${user_mail}', '${user_password}')`;
    
    const rows = await db.query(query);

    return (rows.affectedRows == 1) ? res.status(201).json({ code: 201, message: "User registered correctly"}) :
    res.status(500).json({ code: 500, message: "Error"});
    } 
    return res.status(500).json({ code: 500, message: "Incomplete fields"});
});

user.get("/", async (req, res, next) => { 

    const query = `SELECT * FROM user`;
    
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows});
});

//Para exportar: 
module.exports = user; 