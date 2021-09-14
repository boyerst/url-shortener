const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url.js');

//POST Route = /api/url/shorten
//POST Route description = Create short URL
router.post('/', async (req, res) => {
    const longUrlPassed = req.body.longUrl;
    console.log(req.body, 'dsadas');
    const shortUrlPassed = req.body.shortUrl;

    const baseUrl = "http://" + req.headers.host;

    //Check base URL
    if (!validUrl.isUri(baseUrl)) {
        res.status(401).json('Invalid base url');
    }

    urlCode = shortid.generate();
    if (shortUrlPassed === '') {
        //Create URL
    } else {
        urlCode = shortUrlPassed;
        let url = await Url.findOne({ urlCode });
        //Check if URL already exists
        if (url) {
            //Redirect to Home Page
            return res.redirect(baseUrl);
        }
    }

    //Check original url
    if (validUrl.isUri(longUrlPassed)) {
        try {
            let url = await Url.findOne({ longUrl: longUrlPassed });
            const shortUrl = baseUrl + '/' + urlCode;

            url = new Url({
                longUrl: longUrlPassed,
                shortUrl,
                urlCode
            });
            await url.save();
            console.log('Short URL stored Successfully');

            return res.redirect(baseUrl);
        } catch (err) {
            console.log(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid Long url');
    }

});

module.exports = router;



