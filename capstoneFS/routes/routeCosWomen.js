import express from "express";
import { newCosw, getCosW, getByIdWomen, deleteByIdWo, putCosWomen } from '../helper/helperCosWomen.js';
const router = express.Router();

router.post('/',async (req,res)=>{
    const newCos = req.body;
    console.log(newCos);
    const result = await newCosw(newCos);
    res.send(result);
})

router.get('/', async(req,res)=>{
     const allCos = await getCosW();
     res.send(allCos);
})

router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    const getCosId = await getByIdWomen(id);
    res.send(getCosId)
})

router.delete('/:id', async(req,res)=>{
    const { id } = req.params;
    const delCos = await deleteByIdWo(id);
    res.send(delCos);
})

router.put('/:id', async(req,res)=>{
    const { id } = req.params;
    const updateCosWomen = req.body;
    const result = await putCosWomen(id, updateCosWomen);
    res.send(result);
})

export const cosWomenRouter = router;