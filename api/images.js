const express = require('express');
const imagesRouter = express.Router();
const db = require('../models')

// param route for when :id is given
imagesRouter.param('id', async (req, res, next, id) => {

    try {
        const imageData = await db.Image.findByPk(id)
        if (!imageData) {
            res.status(404).json({ message: 'Image not found' })
        } else {
            req.image = imageData;
            next();
        }
    } catch (err) {
        console.log('Error fetching data: ', err);
        res.status(500).json({ message: 'Error retrieving image', error: err })
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


// gets an image by id, and ALL CAPTIONS
imagesRouter.get('/:id', async (req, res, next) => {

    try {

        const captionsData = await db.Caption.findAll({
            where: {
                userId: req.body.id
            }
        })
        res.status(200).json({ imageData: req.image, captionsData: captionsData })
    } catch (err) {
        console.log('Error fetching data: ', err)
        res.status(500).json({ message: 'Error retrieving captions', error: err })
    }

});






module.exports = imagesRouter;