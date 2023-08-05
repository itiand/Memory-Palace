import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const cats = ['Rosey', 'Puma', 'Mr Buttons', 'Aya'];
  res.json(cats);
});


export default router
