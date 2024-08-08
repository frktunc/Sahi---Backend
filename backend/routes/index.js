const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Start = require('../models/Start')
const Stop = require('../models/Stop')

router.get('/temperature', (req, res) => {
    const temperature = (Math.random() * 100).toFixed(10); 
    res.json({ temperature: temperature });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send("Authentication Failed!"); 
        }

        if (password === user.password) {
            return res.status(200).send("Giriş yapıldı!");
        } else {
            return res.status(401).send("Authentication Failed!");
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("Internal Server Error"); 
    }
});

router.post('/stop', async (req, res) => {
    try {
        const newStop = new Stop(); 
        newStop.stopCommand.type = 1
        await newStop.save();
        return res.status(200).send("Stop command saved successfully!");
    } catch (error) {
        console.error("Error saving start command:", error);
        return res.status(500).send("Internal Server Error"); 
    }
});

router.patch('/start/:id', async (req, res) => {
    try {
        const { id }= req.params
        const start = await Start.findById(id);
        start.startCommand.value=1
        
        console.log(start)
        await start.save();
        // console.log('first')
        return res.status(200).send("Başlatma komutu başarıyla kaydedildi!");
    } catch (error) {
        console.error("Başlatma komutunu kaydederken hata:", error);
        return res.status(500).send("Sunucu Hatası");
    }
});

router.patch('/stop/:id', async (req, res) => {
    try {
        const { id }= req.params
        const start = await Start.findById(id);
        start.startCommand.value=0
        
        console.log(start)
        await start.save();
        // console.log('first')
        return res.status(200).send("Durdurma komutu başarıyla kaydedildi!");
    } catch (error) {
        console.error("Durdurma komutunu kaydederken hata:", error);
        return res.status(500).send("Sunucu Hatası");
    }
});



module.exports = router;