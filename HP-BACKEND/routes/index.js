const express = require("express");
const router = express.Router();
const Start = require('../models/Start')

// router.post('/start', async (req, res) => {
//     try {
//         const newStart = new Start(); 
//         newStart.startCommand.type = 1
//         await newStart.save();
//         return res.status(200).send("Start command saved successfully!");
//     } catch (error) {
//         console.error("Error saving start command:", error);
//         return res.status(500).send("Internal Server Error"); 
//     }
// });
// router.patch('/start/:id', async (req, res) => {
//     try {
//         const { id }= req.params
//         const start = await Start.findById(id);
//         start.startCommand.value=1
        
//         console.log(start)
//         await start.save();
//         // console.log('first')
//         return res.status(200).send("Başlatma komutu başarıyla kaydedildi!");
//     } catch (error) {
//         console.error("Başlatma komutunu kaydederken hata:", error);
//         return res.status(500).send("Sunucu Hatası");
//     }
// });


router.get('/start/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const start = await Start.findById(id);
        if (!start) {
            return res.status(404).send("Start command not found!");
        } console.log(start)
        return res.status(200).json(start);
        
    } catch (error) {
        console.error("Başlatma komutunu alırken hata:", error);
        return res.status(500).send("Sunucu Hatası");
    }
});


module.exports = router;