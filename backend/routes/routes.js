const express = require('express');
const router = express.Router();
const Schemas = require('../Schemas');


//Getting all
// router.get("/", (req, res) => {
//   res.send("Hello");
// });

//Getting one

//Creating one 
router.post('/', async (req, res) => {
    const menu = new Schemas.Menu({name: "Big Mango", price:2.00});
    try {
         const newMenu = await menu.save();
         res.status(201).json(newMenu);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});
//Updating one 
//Deleting one 

module.exports = router;