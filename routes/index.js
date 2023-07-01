const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res, next) {
    res.render(
        'index',
        {
            title: 'Musical Instrument Inventory App'
        }
    );
    next();
});


module.exports = router;
