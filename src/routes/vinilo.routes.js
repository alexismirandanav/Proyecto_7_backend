const express = require('express');
const { getAllVinilos, createVinilo, updateViniloById, deleteViniloById, getViniloById } = require('../controllers/vinilo.controller');
const viniloRouter = express.Router();

viniloRouter.get('/readall', getAllVinilos); // localhost:3000/api/product/readall
viniloRouter.post('/create', createVinilo); // localhost:3000/api/product/create
viniloRouter.put('/update/:id', updateViniloById); // localhost:3000/api/product/update/:id
viniloRouter.delete('/delete/:id', deleteViniloById); // localhost:3000/api/product/delete/:id
viniloRouter.get('/readone/:id', getViniloById); // localhost:3000/api/product/readone/:id

module.exports = viniloRouter;

