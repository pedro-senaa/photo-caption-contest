const express = require('express');
const captionsRouter = express.Router();
const db = require('../models')


// param checker for if imageId is not given
captionsRouter.param('imageId', async (req, res, next, id) => {
    // tries to get imageData in db
    try {
        const imageData = await db.Image.findByPk(id)
        if (!imageData) {
            // sends error if unsucesful
            res.status(404).json({ message: 'Image not found' })
        } else {
            // stores data in req.image and moves on
            req.image = imageData;
            next();
        }
    } catch (err) {
        // err handling
        console.log('Error fetching data: ', err);
        res.status(500).json({ message: 'Error retrieving image', error: err })
    }


});






// posts caption @ image with imageId given
captionsRouter.post('/:imageId', async (req, res, next) => {

    // 
    const imageId = Number(req.params.id)
    const { userId, text } = req.body;

    // sends error if caption is not well writen
    if (!userId || !text) {
        res.status(400).json({ error: 'userId or text is required' })
    }


    try {
        // gets user data and handle missing users
        const user = await db.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' })
        }
        // creates new captions @ imageId with correct user and sends it 
        const newCaption = await db.Caption.create({
            text: text,
            imageId: imageId,
            userId: userId,
        });

        res.status(200).json({ message: 'Caption created!', caption: newCaption })

    //handles errors
    } catch (err) {
        console.log('Error fetching data: ', err)
        res.status(500).json({ message: 'Error retrieving captions', error: err })
    }
});

module.exports = captionsRouter;