const express = require('express');
const imagesRouter = express.Router();
const db = require('../models');
const myCache = require('../utils/cache');


// param route for when :id is given
imagesRouter.param('id', async (req, res, next, id) => {

    try {

        const imageCacheKey = `image_${id}`
        const cachedImage = myCache.get(imageCacheKey);
        // cache hit. stores in req.image and moves on
        if (cachedImage) {
            req.image = cachedImage;
            return next();
        } else {
            // no cache hit. gets, caches it, stores in req.image and moves on
            const imageData = await db.Image.findByPk(id)
            if (!imageData) {
                return res.status(404).json({ message: 'Image not found' })
            } else {
                myCache.set(imageCacheKey, imageData)
                req.image = imageData;
                return next();
            }
        }
    } catch (err) {
        console.log('Error fetching data: ', err);
        return res.status(500).json({ message: 'Error retrieving image', error: err })
    }

})


// get all images info
imagesRouter.get('', async (req, res, next) => {
    try {
        const imagesData = await db.Image.findAll({});

        res.status(200).json(imagesData);
    } catch (err) {
        console.error('Error fecthing data', err);
        res.status(500).json({ message: 'Error retrieving images', error: err.message })
    }
});


// gets an image by id, and ALL CAPTIONS related to image
imagesRouter.get('/:id', async (req, res, next) => {

    try {

        const captionsCacheKey = `captions_of_image_${Number(req.params.id)}`
        let captionsData = myCache.get(captionsCacheKey)
        // no cachehit: creates captionsData and sets in cache
        if (!captionsData) {

            captionsData = await db.Caption.findAll({
                where: {
                    imageId: req.params.id
                }
            })

            myCache.set(captionsCacheKey, captionsData);
        }


        // returns 
        return res.status(200).json({ imageData: req.image, captionsData: captionsData })
    } catch (err) {
        console.log('Error fetching data: ', err)
        return res.status(500).json({ message: 'Error retrieving captions', error: err })
    }

});






module.exports = imagesRouter;