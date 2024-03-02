import express from "express";
import { newWn, getWon, getWnById, deleteWnById, putWn } from '../helper/helperWomen.js';
const router = express.Router();

router.post('/',async (req,res)=>{
    const newCloth = req.body;
    console.log(newCloth);
    const result = await newWn(newCloth);
    res.send(result);
})

router.get('/', async(req,res)=>{
     const clothWm = await getWon();
     res.send(clothWm);
})

router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    const getClothId = await getWnById(id);
    res.send(getClothId)
})

router.delete('/:id', async(req,res)=>{
    const { id } = req.params;
    const delCloth = await deleteWnById(id);
    res.send(delCloth);
})

router.put('/:id', async(req,res)=>{
    const { id } = req.params;
    const updateCloth = req.body;
    const result = await putWn(id, updateCloth);
    res.send(result);
})

export const womenRouter = router;