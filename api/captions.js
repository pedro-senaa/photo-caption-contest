const express = require('express');
const captionsRouter = express.Router();
const db = require('../models');
const { isAuthenticated } = require('../middleware/auth');
const myCache = require('../utils.js/cache');




// param checker for if imageId
captionsRouter.param('imageId', async (req, res, next, imageId) => {
    // tries to get imageData in db
    try {
        // tries to find image in cache
        const imageCacheKey = `image_${imageId}`
        const cachedImage = myCache.get(imageCacheKey)

        // cache hit
        if (cachedImage) {
            req.image = cachedImage;
            return next();
            // cache no hit
        } else {
            // gets data in db
            const imageData = await db.Image.findByPk(id)
            // data not found
            if (!imageData) {
                return res.status(404).json({ message: 'Image not found!' })
            } else {
                // data found. Stores in cache and attaches to req.image and nexts
                myCache.set(imageCacheKey, imageData);
                req.image = imageData
                return next();
            }
        }
    } catch (err) {
        // err handling
        console.log('Error fetching data: ', err);
        res.status(500).json({ message: 'Error retrieving image', error: err })
    }


});






// posts caption @ image with imageId given
captionsRouter.post('/:imageId', isAuthenticated, async (req, res, next) => {

    // get stuff
    const imageId = Number(req.params.imageId)
    const userId = req.user.id
    const { text } = req.body;

    // sends error if anything is missing
    if (!userId || !text) {
        res.status(400).json({ error: 'userId or text is required' })
    }


    try {
        // middleware isAuthenticade handles the user existing 
        // creates new caption with imageId and userId foreignkeys, and sends caption data 
        const newCaption = await db.Caption.create({
            text: text,
            imageId: imageId,
            userId: userId,
        });

        // deletes cached captions (invalidating)
        myCache.del(
            `captions_for_image_${imageId}`
        )


        return res.status(200).json({ message: 'Caption created!', caption: newCaption })

        //handles errors
    } catch (err) {
        console.log('Error fetching data: ', err)
        res.status(500).json({ message: 'Error retrieving captions', error: err })
    }
});

module.exports = captionsRouter;