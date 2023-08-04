const router = require('express').Router();

router.get('/', (req, res) => {
  const cats = ['Rosey', 'Puma', 'Mr Buttons', 'Aya'];
  res.json(cats);
});
  

module.exports = router;
