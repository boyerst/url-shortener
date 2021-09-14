const express = require('express');
const router = express.Router();

const Url = require('../models/Url.js');

//GET Route = /:code
//GET Route description = redirect to original URL
router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            url.clicks++;
            await url.save();
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No url found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Server error');
    }
})

module.exports = router;