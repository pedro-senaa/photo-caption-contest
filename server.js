const express = require('express');
const imagesRouter = require('./api/images');
const captionsRouter = require('./api/captions');
const app = express();
const db = require('./models');
const authRouter = require('./api/users');
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express')



const PORT = process.env.PORT || 3000;

// swagger stuff
const swaggerDocument = yaml.load(
    fs.readFileSync(path.join(__dirname, './swagger.yaml'), 'utf8')
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({extended: true}))


// connects do db
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

