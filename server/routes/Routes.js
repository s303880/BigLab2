const express = require('express');
const FILMS = require('../modules/Filmdao');
const db = require('../modules/DB');


const filmRouter = express.Router();
const f = new FILMS(db.db);


filmRouter.get("/getFilms", async (req, res)=>{

    let x;
    try{
        x = await f.getFilms();    
    }catch(err){
        console.log(err)
        return res.status(503).json({err:"generic error"})
    }
    
    return res.status(200).json({x})

})

module.exports = filmRouter