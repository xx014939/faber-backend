const mongoose = require('mongoose')

const nftSchema = new mongoose.Schema({
    walletAddress: {
      type: String,
      required: true
    },
    ipfsImageLinks: {
      type: Array,
      required: true
    },
    ipfsMetadataLinks: {
      type: Array,
      required: true
    }
  })
  
  module.exports = mongoose.model('nft', nftSchema)