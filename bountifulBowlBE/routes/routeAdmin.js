// admin 

import express from 'express';
import { verifyRoles } from '../middleware/auth.js';
import { ROLES } from '../roles.js';
import { getAllUsers, getUsersById, createUser, updateUser, deleteUser } from '../helper/helperAdmin.js';

const router = express.Router();

// Admin-only routes
router.get('/', verifyRoles([ROLES.ADMIN]), async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
});

router.get('/:id', verifyRoles([ROLES.ADMIN]), async (req, res) => {
  const {id} = req.params;
  const users = await getUsersById(id);
  res.send(users);
});

router.post('/', verifyRoles([ROLES.ADMIN]), async (req, res) => {
  const { name, email, role } = req.body;
  const result = await createUser(name, email, role);
  res.status(201).send({ message: 'User created', result });
});

router.put('/:id', verifyRoles([ROLES.ADMIN]), async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
   const result = await updateUser(id, updatedUser);
  res.json({ message: 'User updated', result });
});

router.delete('/:id', verifyRoles([ROLES.ADMIN]), async (req, res) => {
  const { id } = req.params;
  const delUser = await deleteUser(id);
  res.send({ message: 'User deleted', delUser });
});

export const adminRouter = router;
