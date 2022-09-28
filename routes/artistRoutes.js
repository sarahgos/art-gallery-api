const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");
const { expressjwt: expressJwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { requiresAuth } = require("express-openid-connect");
/*
const checkJwt = expressJwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://art-gallery-api.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://art-gallery-api',
    issuer: `https://art-gallery-api.auth0.com/`,
    algorithms: ['RS256']
  });*/

// Filters artists
router.get('/artists', artistController.filter);

// Gets all artists
router.get('/artists', artistController.artistList);

// Gets artist by id
router.get('/artists/:artist_id', artistController.artistById);

// Posts new artist
router.post('/artists', requiresAuth(), artistController.createArtist);

// Updates an artist
router.put('/artists/:artist_id', requiresAuth(), artistController.updateArtist);

// Updates an artist
router.delete('/artists/:artist_id', requiresAuth(), artistController.deleteArtist);

module.exports = router;