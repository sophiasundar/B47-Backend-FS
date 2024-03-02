import express from "express";
import { newCosmetics, getCos, getById, deleteById, putCosMen } from '../helper/helperCosmetics.js';
const router = express.Router();

router.post('/',async (req,res)=>{
    const newCos = req.body;
    console.log(newCos);
    const result = await newCosmetics(newCos);
    res.send(result);
})

router.get('/', async(req,res)=>{
     const allCos = await getCos();
     res.send(allCos);
})

router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    const getCosId = await getById(id);
    res.send(getCosId)
})

router.delete('/:id', async(req,res)=>{
    const { id } = req.params;
    const delCos = await deleteById(id);
    res.send(delCos);
})

router.put('/:id', async(req,res)=>{
    const { id } = req.params;
    const updateCosMen = req.body;
    const result = await putCosMen(id, updateCosMen);
    res.send(result);
})

export const cosMenRouter = router;