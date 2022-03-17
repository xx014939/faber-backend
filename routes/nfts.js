const express = require('express')
const router = express.Router()
const nftWallet = require('../models/nfts')

// Getting all
router.get('/', async (req, res) => {
    try {
        const wallets = await nftWallet.find()
        res.json(wallets)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Getting One
router.get('/:id', getWallet, (req, res) => {
    res.json(res.wallet)
  })



// Making one
router.post('/', async (req, res) => {
    const wallet = new nftWallet({
        walletAddress: req.body.walletAddress,
        ipfsImageLinks: req.body.ipfsImageLinks,
        ipfsMetadataLinks: req.body.ipfsMetadataLinks
    })

    try {
        const newWallet = await wallet.save()
        res.status(201).json(newWallet)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// Updating one
router.patch('/:id', getWallet, async (req, res) =>  { 
  if (req.body.walletAddress != null) {
    res.wallet.walletAddress = req.body.walletAddress
  }
  if (req.body.ipfsImageLinks != null) {
    res.wallet.ipfsImageLinks = req.body.ipfsImageLinks
  }
  if (req.body.ipfsMetadataLinks != null) {
    res.wallet.ipfsMetadataLinks = req.body.ipfsMetadataLinks
  }
  try {
    const updateWallet = await res.wallet.save()
    res.json(updateWallet)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting one
router.delete('/:id', getWallet, async (req, res) => {
    try {
        await res.wallet.remove()
        res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getWallet(req, res, next) {
    let wallet
    try {
        wallet = await nftWallet.findById(req.params.id)
        if (wallet == null) {
            return res.status(404).json({message: "cannot find wallet"})
        }
    } catch (err) {
        res.status(500).json({ message: err.message})
    }

    res.wallet = wallet
    next()
}

module.exports =  router