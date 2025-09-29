const express = require('express');
const imagesRouter = require('./api/images');
const captionsRouter = require('./api/captions');
const app = express();
const db = require('./models');
const authRouter = require('./api/users');



const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}))



db.sequelize.authenticate()
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error('Error connecting to database', err);
        process.exit(1);
    })





app.use('/images', imagesRouter);
app.use('/users', authRouter)
app.use('/captions', captionsRouter);


app.get('', (req, res, next) => {
    res.send('Server is running and ready!!!!!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

