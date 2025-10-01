const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 600, checkperiod: 120 })
// creates main cache
// key for images: image_{id_for_image}
// key for caption of a image: captions_of_image_{id for image}
module.exports = myCache;