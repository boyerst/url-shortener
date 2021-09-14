const mongoose = require('mongoose');
const urlSchema = new.mongoose.Schema({
    urlCode: String,
    longURL: String, 
    shortURL: String,
    date: {
      type: String, 
      default: Date.now
    },
    clicks: {
      type: Number,
      required: true,
      default: 0
    }
});


module.exports = mongoose.model('Url', urlSchema);