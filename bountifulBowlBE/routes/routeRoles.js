import express from 'express';
import { ROLES } from '../roles.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(ROLES); // Return the roles as JSON
});

export const roleRouter = router;
