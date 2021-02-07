const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc Auth with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc Google Auth Callback
// @route GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/auth',
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/dashboard');
  },
);

// @desc log current user out
// @route GET /auth/logout
router.get('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send('done');
  }
});

module.exports = router;
